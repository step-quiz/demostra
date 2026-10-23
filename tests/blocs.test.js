/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: tests/blocs.test.js
 * ROL: El comprovador de «Ordenar» (js/motor/blocs.js) amb una taula
 *      d'entregues (especificació §9.6): correcta, un altre ordre vàlid, amb una
 *      trampa, amb una línia de menys, amb una dependència trencada; i també
 *      les capçaleres (nivell 2: falta, desordre, línia a una altra part).
 *      I el separador de text i fórmules (js/motor/text.js).
 * ÚS: node tests/blocs.test.js
 * ============================================================================
 */
'use strict';
const { suite, ok, eq, finish } = require('./harness');
const B = require('../js/motor/blocs.js');
const Tx = require('../js/motor/text.js');

// Un teorema petit, fet a mà: a → c, b → c, c → d (a i b es poden canviar d'ordre)
const PETIT = {
    id: 'petit',
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            { id: 'a', tex: 'A', deps: [] },
            { id: 'b', tex: 'B', deps: [] },
            { id: 'c', tex: 'C', deps: ['a', 'b'] },
            { id: 'd', tex: 'D', deps: ['c'] },
        ],
        conclusio: 'd',
        trampes: [
            { id: 't1', tex: 'T1', motiu: 'M1', nivell: 1 },
            { id: 't2', tex: 'T2', motiu: 'M2', nivell: 3 },
        ],
        ordreModel: ['a', 'b', 'c', 'd'],
    },
};
// Amb bastida (com una inducció): h1 [a], h2 [b, c], h3 [d]
const AMB = {
    id: 'amb',
    ordenar: {
        tipus: 'induccio',
        bastida: [
            { id: 'h1', text: 'Cas base', fix: true },
            { id: 'h2', text: 'Pas inductiu', fix: true },
            { id: 'h3', text: 'Conclusió', fix: true },
        ],
        linies: [
            { id: 'a', tex: 'A', deps: [], seccio: 'h1' },
            { id: 'b', tex: 'B', deps: [], seccio: 'h2' },
            { id: 'c', tex: 'C', deps: ['b'], seccio: 'h2' },
            { id: 'd', tex: 'D', deps: ['a', 'c'], seccio: 'h3' },
        ],
        conclusio: 'd',
        trampes: [{ id: 't1', tex: 'T1', motiu: 'M1', nivell: 1, seccio: 'h2' }],
        ordreModel: ['a', 'b', 'c', 'd'],
    },
};
const err = (t, n, e) => {
    const r = B.valida(t, n, e);
    return r.ok
        ? 'ok'
        : `${r.error.tipus}:${r.error.linia}${r.error.dep ? '←' + r.error.dep : ''}${r.error.seccio ? '@' + r.error.seccio : ''}`;
};

suite('1. Taula d’entregues (sense bastida)');
{
    const TAULA = [
        ['correcta (ordre model)', ['a', 'b', 'c', 'd'], 'ok'],
        ['un altre ordre vàlid', ['b', 'a', 'c', 'd'], 'ok'],
        ['amb una trampa', ['a', 'b', 't1', 'c', 'd'], 'trampa:t1'],
        ['amb una línia de menys', ['a', 'c', 'd'], 'falta:b'],
        ['buida', [], 'falta:a'],
        ['dependència trencada', ['a', 'c', 'b', 'd'], 'dependencia:c←b'],
        ['la conclusió al principi', ['d', 'a', 'b', 'c'], 'dependencia:d←c'],
        ['trampa i línia de menys: primer la trampa', ['t2', 'a'], 'trampa:t2'],
        ['línia de menys i dependència: primer la que falta', ['c', 'a', 'd'], 'falta:b'],
    ];
    for (const [nom, e, esperat] of TAULA) eq(nom, err(PETIT, 1, e), esperat);
}

suite('2. Capçaleres (bastida)');
{
    eq('nivell 1: amb les capçaleres al seu lloc', err(AMB, 1, ['h1', 'a', 'h2', 'b', 'c', 'h3', 'd']), 'ok');
    eq('nivell 2: falta una capçalera', err(AMB, 2, ['h1', 'a', 'b', 'c', 'h3', 'd']), 'falta:h2');
    eq('nivell 2: capçaleres desordenades', err(AMB, 2, ['h2', 'b', 'c', 'h1', 'a', 'h3', 'd']), 'capcalera:h2');
    eq('nivell 2: una línia a una altra part', err(AMB, 2, ['h1', 'a', 'b', 'h2', 'c', 'h3', 'd']), 'seccio:b@h2');
    eq('una línia abans de la primera capçalera', err(AMB, 2, ['a', 'h1', 'h2', 'b', 'c', 'h3', 'd']), 'seccio:a@h1');
    eq(
        'la trampa també es detecta amb bastida',
        err(AMB, 1, ['h1', 'a', 'h2', 't1', 'b', 'c', 'h3', 'd']),
        'trampa:t1'
    );
    eq('model(): capçaleres davant de la seva primera línia', B.model(AMB).join(' '), 'h1 a h2 b c h3 d');
    eq('inicial(): al nivell 1, les capçaleres fixes', B.inicial(AMB, 1).join(' '), 'h1 h2 h3');
    eq('inicial(): al nivell 2, res', B.inicial(AMB, 2).length, 0);
}

suite('3. Peces i barreja');
{
    eq('nivell 1: línies i trampes de nivell 1', B.barreja(PETIT, 1, 's').sort().join(' '), 'a b c d t1');
    eq('nivell 3: totes les trampes', B.barreja(PETIT, 3, 's').sort().join(' '), 'a b c d t1 t2');
    eq('nivell 2 amb bastida: també les capçaleres', B.barreja(AMB, 2, 's').sort().join(' '), 'a b c d h1 h2 h3 t1');
    eq('mateixa llavor, mateixa barreja', B.barreja(PETIT, 1, 'q').join(''), B.barreja(PETIT, 1, 'q').join(''));
    let valides = 0;
    for (let i = 0; i < 200; i++) {
        const bones = B.barreja(PETIT, 1, 'l' + i).filter(id => !id.startsWith('t'));
        if (B.respectaDeps(PETIT, bones)) valides++;
    }
    eq('200 llavors: cap barreja ja és vàlida', valides, 0);
}

suite('4. Text i fórmules');
{
    eq(
        'text i fórmula',
        JSON.stringify(Tx.trossos('a $x^2$ b')),
        '[{"tipus":"text","v":"a "},{"tipus":"tex","v":"x^2"},{"tipus":"text","v":" b"}]'
    );
    eq(
        '\\$ és un dòlar',
        Tx.trossos('5 \\$')
            .map(t => t.v)
            .join(''),
        '5 $'
    );
    let llança = false;
    try {
        Tx.trossos('a $x');
    } catch (e) {
        llança = true;
    }
    ok('un $ sense tancar és un error', llança);
    eq('text pla per als títols', Tx.pla('$\\sqrt{2}$ és irracional'), '√2 és irracional');
}

finish('COMPROVADOR');

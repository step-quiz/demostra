/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/mitjanes.js
 * ROL: Teorema «Mitjana aritmètica i geomètrica»: enunciat, Veure (figura i panells), Ordenar (línies,
 *      dependències, trampes), Escriure (guió) i pistes.
 * ARQUITECTURA: Dades. Al navegador s'afegeix a window.DEMOSTRA; amb Node,
 *      s'exporta. Text amb fórmules entre $…$ (KaTeX). Revisió matemàtica:
 *      docs/REVISIO.md.
 * DEPENDÈNCIES: cap
 * ============================================================================
 */
(function (arrel, t) {
    'use strict';
    if (typeof module === 'object' && module.exports) module.exports = t;
    else (arrel.DEMOSTRA = arrel.DEMOSTRA || []).push(t);
})(typeof self !== 'undefined' ? self : this, {
    id: 'mitjanes',
    titol: 'Mitjana aritmètica i geomètrica',
    curs: '1BAT',
    bloc: 'desigualtats',
    enunciat: 'Per a tots els nombres $a, b > 0$: $\\sqrt{ab} \\le \\dfrac{a+b}{2}$, i només són iguals si $a = b$.',
    veure: {
        figura: 'amgm',
        n: {
            min: 1,
            max: 7,
            inicial: 2,
            etiqueta: 'a',
        },
        panells: [
            {
                pas: 1,
                text: 'Un semicercle de diàmetre $a + b$: el radi és $\\dfrac{a+b}{2}$. Aquí $a + b = 8$.',
            },
            {
                pas: 2,
                text: 'Al punt que separa $a$ i $b$, aixequem un segment fins al cercle.',
                provaPrimer: 'Quant fa aquest segment?',
            },
            {
                pas: 3,
                text: 'Pels triangles semblants, fa $\\sqrt{ab}$: la mitjana geomètrica.',
            },
            {
                pas: 4,
                text: 'Mai no pot ser més llarg que el radi: $\\sqrt{ab} \\le \\dfrac{a+b}{2}$. Són iguals al centre, quan $a = b$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Per a qualsevol nombre real $x$: $x^2 \\ge 0$, i $x^2 = 0$ només si $x = 0$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'Com que $a, b > 0$, existeixen $\\sqrt{a}$ i $\\sqrt{b}$, i $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$.',
                deps: [],
            },
            {
                id: 'c',
                tex: 'Agafem $x = \\sqrt{a} - \\sqrt{b}$: $(\\sqrt{a} - \\sqrt{b})^2 \\ge 0$.',
                deps: ['a', 'b'],
            },
            {
                id: 'd',
                tex: 'Desenvolupem: $a - 2\\sqrt{ab} + b \\ge 0$.',
                deps: ['c'],
            },
            {
                id: 'e',
                tex: 'Per tant, $a + b \\ge 2\\sqrt{ab}$, és a dir, $\\dfrac{a+b}{2} \\ge \\sqrt{ab}$.',
                deps: ['d'],
            },
            {
                id: 'f',
                tex: 'Hi ha igualtat només si $\\sqrt{a} = \\sqrt{b}$, és a dir, si $a = b$.',
                deps: ['a', 'c'],
            },
            {
                id: 'g',
                tex: 'Per tant, $\\sqrt{ab} \\le \\dfrac{a+b}{2}$, amb igualtat només si $a = b$.',
                deps: ['e', 'f'],
            },
        ],
        conclusio: 'g',
        trampes: [
            {
                id: 't1',
                tex: 'Amb $a = 4$ i $b = 9$: $6 \\le 6{,}5$.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Desenvolupem: $a - b \\ge 0$.',
                motiu: '$(\\sqrt{a} - \\sqrt{b})^2 = a - 2\\sqrt{ab} + b$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Com que $\\sqrt{ab} \\le \\dfrac{a+b}{2}$, $(\\sqrt{a} - \\sqrt{b})^2 \\ge 0$.',
                motiu: 'Fa servir el que vols demostrar.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    escriure: {
        guio: [
            'He dit de quina desigualtat segura parteixo ($x^2 \\ge 0$).',
            'He triat bé la $x$.',
            'He desenvolupat el quadrat i he aïllat.',
            'He estudiat quan hi ha igualtat.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure una desigualtat i, a més, quan és una igualtat.',
        concreta: 'Amb $a = 1$ i $b = 9$: $\\sqrt{9} = 3$ i $\\dfrac{10}{2} = 5$.',
        figura: {
            pas: 3,
            peu: 'Segment i radi',
        },
        tanca: 'Un quadrat mai és negatiu. Quin quadrat et serveix?',
        comprovacio: 'Amb $a = b = 5$, les dues mitjanes valen $5$.',
        iDespres: 'De tots els rectangles de perímetre $20$, quin té més àrea?',
    },
    credit: 'Desigualtat clàssica; la figura del semicercle ja és a Euclides (Elements, llibre VI, proposició 13).',
});

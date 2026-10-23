/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: tests/teoremes.test.js
 * ROL: Les dades dels teoremes (data/teoremes/*.js), segons l'especificació §9.6:
 *   1. Forma: camps, cursos, ids únics, el nom del fitxer és l'id.
 *   2. Ordenar: ids únics; deps vàlides (mai una trampa); graf acíclic;
 *      ordreModel és un ordre topològic; cada línia és avantpassada de la
 *      conclusió (cap línia decorativa); bastida i parts; 1–2 trampes als nivells
 *      1–2 i més al 3; la demostració model passa el comprovador a tots els
 *      nivells; la barreja inicial (amb llavor) no és mai vàlida.
 *   3. Text: cada fórmula entre $…$ es dibuixa amb KaTeX (throwOnError: true).
 *   4. Figures: SVG ben format per a cada n del control i cada pas.
 *   5. Escriure i pistes: guió, les sis pistes, la figura de la pista existeix.
 * ÚS: node tests/teoremes.test.js
 * ============================================================================
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { suite, ok, eq, finish } = require('./harness');
const B = require('../js/motor/blocs.js');
const F = require('../js/motor/figures.js');
const Tx = require('../js/motor/text.js');
const katex = require('../vendor/katex-0.16.11/katex.min.js');

const DIR = path.join(__dirname, '..', 'data', 'teoremes');
const fitxers = fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.js'))
    .sort();
const TEOREMES = fitxers.map(f => ({ fitxer: f, t: require(path.join(DIR, f)) }));
const CURSOS = ['2ESO', '3ESO', '4ESO', '1BAT', '2BAT'];
const TIPUS = ['directa', 'induccio', 'absurd'];

/** SVG ben format: etiquetes equilibrades, atributs entre cometes, cap & ni < solt. */
function benFormat(s) {
    const re = /<\/?([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"<&]*(?:&(?:amp|lt|gt|quot);[^"<&]*)*")*)\s*(\/?)>|([^<]+)/g;
    const pila = [];
    let m,
        fi = 0;
    while ((m = re.exec(s))) {
        if (m.index !== fi) return `caràcter inesperat a la posició ${fi}`;
        fi = re.lastIndex;
        if (m[4] !== undefined) {
            if (/&(?!(amp|lt|gt|quot);)/.test(m[4])) return 'un & solt al text';
            continue;
        }
        const tanca = m[0].startsWith('</'),
            buida = m[3] === '/';
        if (tanca) {
            if (pila.pop() !== m[1]) return `</${m[1]}> no tanca res`;
        } else if (!buida) pila.push(m[1]);
    }
    if (fi !== s.length) return `queda text a la posició ${fi}`;
    if (pila.length) return `queden obertes: ${pila.join(', ')}`;
    if (!s.startsWith('<svg')) return 'no comença per <svg';
    return null;
}

/** Tots els textos d'un teorema amb el seu camí. */
function textos(t) {
    const out = [
        ['titol', t.titol],
        ['enunciat', t.enunciat],
        ['credit', t.credit],
    ];
    t.veure.panells.forEach((p, i) => {
        out.push([`veure.panells[${i}].text`, p.text]);
        if (p.provaPrimer) out.push([`veure.panells[${i}].provaPrimer`, p.provaPrimer]);
    });
    (t.ordenar.bastida || []).forEach(h => out.push([`bastida.${h.id}`, h.text]));
    t.ordenar.linies.forEach(l => out.push([`linia.${l.id}`, l.tex]));
    (t.ordenar.trampes || []).forEach(l => out.push([`trampa.${l.id}`, l.tex], [`trampa.${l.id}.motiu`, l.motiu]));
    t.escriure.guio.forEach((g, i) => out.push([`guio[${i}]`, g]));
    for (const k of ['encarrec', 'concreta', 'tanca', 'comprovacio', 'iDespres'])
        out.push([`pistes.${k}`, t.pistes[k]]);
    out.push(['pistes.figura.peu', t.pistes.figura.peu]);
    return out;
}

suite('1. Forma');
{
    eq('16 teoremes', TEOREMES.length, 16);
    const ids = TEOREMES.map(x => x.t.id);
    eq('ids únics', new Set(ids).size, ids.length);
    for (const { fitxer, t } of TEOREMES) {
        eq(`${t.id}: el fitxer es diu com l’id`, fitxer, `${t.id}.js`);
        ok(
            `${t.id}: tots els camps`,
            ['id', 'titol', 'curs', 'bloc', 'enunciat', 'veure', 'ordenar', 'escriure', 'pistes', 'credit'].every(
                k => t[k]
            )
        );
        ok(`${t.id}: curs vàlid (${t.curs})`, CURSOS.includes(t.curs));
        ok(`${t.id}: tipus de demostració vàlid`, TIPUS.includes(t.ordenar.tipus));
    }
    const perCurs = c => TEOREMES.filter(x => x.t.curs === c).length;
    ok(
        'hi ha teoremes d’ESO i de batxillerat',
        perCurs('3ESO') + perCurs('2ESO') + perCurs('4ESO') >= 8 && perCurs('1BAT') + perCurs('2BAT') >= 5
    );
}

suite('2. Ordenar: el graf, les trampes i el comprovador');
for (const { t } of TEOREMES) {
    const o = t.ordenar;
    const linies = o.linies.map(l => l.id),
        trampes = (o.trampes || []).map(l => l.id),
        caps = (o.bastida || []).map(h => h.id);
    const tots = [...linies, ...trampes, ...caps];
    eq(`${t.id}: ids únics (línies, trampes i capçaleres)`, new Set(tots).size, tots.length);
    const malDeps = o.linies.flatMap(l => l.deps.filter(d => !linies.includes(d)).map(d => `${l.id}→${d}`));
    ok(`${t.id}: cada dep és una línia (mai una trampa)`, !malDeps.length, malDeps.join(', '));
    // Acíclic (DFS)
    const deps = Object.fromEntries(o.linies.map(l => [l.id, l.deps]));
    const estat = {};
    let cicle = false;
    const visita = id => {
        if (estat[id] === 1) cicle = true;
        if (estat[id]) return;
        estat[id] = 1;
        (deps[id] || []).forEach(visita);
        estat[id] = 2;
    };
    linies.forEach(visita);
    ok(`${t.id}: el graf és acíclic`, !cicle);
    eq(
        `${t.id}: ordreModel té cada línia una vegada`,
        [...o.ordreModel].sort().join(','),
        [...linies].sort().join(',')
    );
    ok(`${t.id}: ordreModel és un ordre topològic`, B.respectaDeps(t, o.ordreModel));
    ok(
        `${t.id}: la conclusió és una línia i és l’última de l’ordre model`,
        linies.includes(o.conclusio) && o.ordreModel[o.ordreModel.length - 1] === o.conclusio
    );
    const avant = new Set();
    const puja = id => (deps[id] || []).forEach(d => !avant.has(d) && (avant.add(d), puja(d)));
    puja(o.conclusio);
    const decoratives = linies.filter(id => id !== o.conclusio && !avant.has(id));
    ok(`${t.id}: cap línia decorativa (totes porten a la conclusió)`, !decoratives.length, decoratives.join(', '));
    // Bastida i parts
    if (caps.length) {
        const sense = o.linies.filter(l => !caps.includes(l.seccio)).map(l => l.id);
        ok(`${t.id}: cada línia és d’una part de la bastida`, !sense.length, sense.join(', '));
        ok(
            `${t.id}: la conclusió és a l’última part`,
            o.linies.find(l => l.id === o.conclusio).seccio === caps[caps.length - 1]
        );
    } else
        ok(
            `${t.id}: sense bastida, cap línia té part`,
            o.linies.every(l => !l.seccio)
        );
    const t12 = B.trampesDelNivell(t, 1).length,
        t3 = B.trampesDelNivell(t, 3).length;
    ok(`${t.id}: 1 o 2 trampes als nivells 1 i 2 (${t12})`, t12 >= 1 && t12 <= 2);
    ok(`${t.id}: més trampes al nivell 3 (${t3})`, t3 > t12);
    ok(
        `${t.id}: cada trampa té un motiu`,
        (o.trampes || []).every(l => l.motiu)
    );
    // El comprovador
    for (const n of B.NIVELLS) {
        const r = B.valida(t, n, B.model(t));
        ok(`${t.id}, nivell ${n}: la demostració model és correcta`, r.ok, JSON.stringify(r.error));
        for (const llavor of ['A', 'B', 'C', 'x1', 'x2']) {
            const peces = B.barreja(t, n, llavor);
            const bones = peces.filter(id => linies.includes(id));
            const entrega = caps.length
                ? B.model(t)
                      .filter(id => caps.includes(id))
                      .concat(bones)
                : bones;
            if (B.respectaDeps(t, bones) || B.valida(t, n, entrega).ok) {
                ok(`${t.id}, nivell ${n}, llavor ${llavor}: la barreja inicial no és vàlida`, false, peces.join(' '));
            }
        }
        eq(
            `${t.id}, nivell ${n}: les peces són les línies, les trampes del nivell${n >= 2 && caps.length ? ' i les capçaleres' : ''}`,
            B.barreja(t, n, 'A').length,
            linies.length + B.trampesDelNivell(t, n).length + (n >= 2 ? caps.length : 0)
        );
    }
}

suite('3. Fórmules (KaTeX, throwOnError)');
for (const { t } of TEOREMES) {
    const mal = [];
    let n = 0;
    for (const [cami, s] of textos(t)) {
        if (typeof s !== 'string' || !s) {
            mal.push(`${cami}: buit`);
            continue;
        }
        let trossos;
        try {
            trossos = Tx.trossos(s);
        } catch (e) {
            mal.push(`${cami}: ${e.message}`);
            continue;
        }
        for (const tr of trossos.filter(x => x.tipus === 'tex')) {
            n++;
            try {
                katex.renderToString(tr.v, { throwOnError: true });
            } catch (e) {
                mal.push(`${cami}: ${e.message.slice(0, 80)}`);
            }
        }
    }
    ok(`${t.id}: les ${n} fórmules es dibuixen`, !mal.length, mal.join(' | '));
}

suite('4. Figures (SVG ben format per a tot n i tot pas)');
for (const { t } of TEOREMES) {
    const v = t.veure;
    ok(`${t.id}: la figura «${v.figura}» existeix`, !!F.FIGURES[v.figura]);
    ok(`${t.id}: n inicial dins del rang`, v.n.min <= v.n.inicial && v.n.inicial <= v.n.max && v.n.etiqueta);
    eq(
        `${t.id}: panells numerats 1, 2, 3…`,
        v.panells.map(p => p.pas).join(','),
        v.panells.map((p, i) => i + 1).join(',')
    );
    const mal = [];
    for (let n = v.n.min; n <= v.n.max; n++)
        for (let pas = 1; pas <= v.panells.length; pas++) {
            const s = F.figura(v.figura, n, pas);
            const e = benFormat(s) || (/NaN|undefined|Infinity/.test(s) ? 'NaN o undefined' : null);
            if (e) mal.push(`n=${n} pas=${pas}: ${e}`);
        }
    ok(`${t.id}: totes les figures ben formades`, !mal.length, mal.slice(0, 3).join(' | '));
}
eq('el comprovador de SVG troba una etiqueta sense tancar', benFormat('<svg><g></svg>') !== null, true);
eq(
    'el comprovador de SVG accepta un SVG bo',
    benFormat('<svg viewBox="0 0 1 1"><rect x="0"/><text>a &amp; b</text></svg>'),
    null
);
eq('figura: factors de 30031', F.factors(30031).join('·'), '59·509');

suite('5. Escriure i pistes');
for (const { t } of TEOREMES) {
    ok(`${t.id}: guió de 3 a 6 punts`, t.escriure.guio.length >= 3 && t.escriure.guio.length <= 6);
    const p = t.pistes;
    ok(
        `${t.id}: les sis pistes`,
        ['encarrec', 'concreta', 'figura', 'tanca', 'comprovacio', 'iDespres'].every(k => p[k])
    );
    ok(
        `${t.id}: la pista de la figura és un pas de Veure`,
        p.figura.pas >= 1 && p.figura.pas <= t.veure.panells.length
    );
    ok(`${t.id}: el peu de la figura té com a molt 3 paraules`, Tx.pla(p.figura.peu).split(/\s+/).length <= 3);
}

finish('TEOREMES');

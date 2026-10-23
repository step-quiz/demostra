/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/gauss.js
 * ROL: Teorema «La suma de Gauss»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'gauss',
    titol: 'La suma de Gauss',
    curs: '3ESO',
    bloc: 'nombres',
    enunciat: 'Per a tot enter $n \\ge 1$: $1 + 2 + 3 + \\dots + n = \\dfrac{n(n+1)}{2}$.',
    veure: {
        figura: 'gauss',
        n: {
            min: 1,
            max: 10,
            inicial: 5,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Una escala de $1$, $2$, …, $n$ quadrets. Volem comptar-los.',
            },
            {
                pas: 2,
                text: 'En fem una còpia i la girem.',
                provaPrimer: 'Com encaixen les dues escales?',
            },
            {
                pas: 3,
                text: 'Les dues escales fan un rectangle de $n$ columnes i $n + 1$ files.',
            },
            {
                pas: 4,
                text: 'Una escala és la meitat del rectangle: $\\dfrac{n(n+1)}{2}$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Diem $S = 1 + 2 + \\dots + n$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'També $S = n + (n-1) + \\dots + 1$: els mateixos nombres, al revés.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'Sumem les dues igualtats terme a terme: $2S = (1 + n) + (2 + n - 1) + \\dots + (n + 1)$.',
                deps: ['a', 'b'],
            },
            {
                id: 'd',
                tex: 'Cada parèntesi val $n + 1$.',
                deps: ['c'],
            },
            {
                id: 'e',
                tex: 'Hi ha $n$ parèntesis; per tant, $2S = n(n+1)$.',
                deps: ['d'],
            },
            {
                id: 'f',
                tex: 'Per tant, $S = \\dfrac{n(n+1)}{2}$.',
                deps: ['e'],
            },
        ],
        conclusio: 'f',
        trampes: [
            {
                id: 't1',
                tex: 'Com que $1 + 2 + \\dots + 10 = 55 = \\dfrac{10 \\cdot 11}{2}$, la fórmula és certa.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Cada parèntesi val $n$.',
                motiu: 'Mira el primer parèntesi: $1 + n$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Hi ha $n + 1$ parèntesis.',
                motiu: 'Hi ha tants parèntesis com sumands: $n$.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'],
    },
    escriure: {
        guio: [
            'He donat un nom a la suma (per exemple, $S$).',
            'He escrit la suma també al revés.',
            'He sumat les dues sumes terme a terme i he dit quant val cada parella.',
            'He comptat quantes parelles hi ha.',
            'He acabat amb la fórmula.',
        ],
    },
    pistes: {
        encarrec: 'Has de trobar una manera de sumar $1 + 2 + \\dots + n$ sense fer totes les sumes.',
        concreta: 'Prova $1 + 2 + 3 + 4 + 5$. Suma el primer amb l’últim, el segon amb el penúltim…',
        figura: {
            pas: 3,
            peu: 'Dues escales',
        },
        tanca: 'Escriu la suma dues vegades, una al revés, i suma-les.',
        comprovacio: 'Amb $n = 100$ t’ha de sortir $5050$.',
        iDespres: 'Quant fa $2 + 4 + \\dots + 2n$? I $1 + 3 + \\dots + (2n-1)$?',
    },
    credit: 'Atribuïda a Gauss de petit (anècdota tradicional); la idea és més antiga.',
});

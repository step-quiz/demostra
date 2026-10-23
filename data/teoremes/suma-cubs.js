/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/suma-cubs.js
 * ROL: Teorema «La suma dels cubs»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'suma-cubs',
    titol: 'La suma dels cubs',
    curs: '1BAT',
    bloc: 'induccio',
    enunciat: 'Per a tot enter $n \\ge 1$: $1^3 + 2^3 + \\dots + n^3 = (1 + 2 + \\dots + n)^2$.',
    veure: {
        figura: 'cubs',
        n: {
            min: 1,
            max: 6,
            inicial: 4,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat de costat $1 + 2 + \\dots + n$.',
            },
            {
                pas: 2,
                text: 'El dividim en L: la L número $k$ té gruix $k$.',
                provaPrimer: 'Quina àrea té la L número $k$?',
            },
            {
                pas: 3,
                text: 'Hi caben $k$ quadrats de $k \\times k$ (si $k$ és parell, un en dues meitats): la seva àrea és $k \\cdot k^2 = k^3$.',
            },
            {
                pas: 4,
                text: 'Per tant, $1^3 + 2^3 + \\dots + n^3 = (1 + \\dots + n)^2$.',
            },
        ],
    },
    ordenar: {
        tipus: 'induccio',
        bastida: [
            {
                id: 'h1',
                text: 'Cas base',
                fix: true,
            },
            {
                id: 'h2',
                text: 'Pas inductiu',
                fix: true,
            },
            {
                id: 'h3',
                text: 'Conclusió',
                fix: true,
            },
        ],
        linies: [
            {
                id: 'a',
                tex: 'Per a $n = 1$: $1^3 = 1 = 1^2$.',
                deps: [],
                seccio: 'h1',
            },
            {
                id: 'b',
                tex: 'Suposem que $1^3 + \\dots + n^3 = (1 + \\dots + n)^2$ per a un cert $n \\ge 1$.',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'c',
                tex: 'Sabem que $1 + \\dots + n = \\dfrac{n(n+1)}{2}$ (la suma de Gauss).',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'd',
                tex: 'Llavors $1^3 + \\dots + n^3 + (n+1)^3 = \\dfrac{n^2(n+1)^2}{4} + (n+1)^3$.',
                deps: ['b', 'c'],
                seccio: 'h2',
            },
            {
                id: 'e',
                tex: '$\\dfrac{n^2(n+1)^2}{4} + (n+1)^3 = \\dfrac{(n+1)^2(n^2 + 4n + 4)}{4} = \\left(\\dfrac{(n+1)(n+2)}{2}\\right)^2$.',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'f',
                tex: 'I $\\dfrac{(n+1)(n+2)}{2} = 1 + \\dots + (n+1)$: la fórmula és certa per a $n + 1$.',
                deps: ['c', 'd', 'e'],
                seccio: 'h2',
            },
            {
                id: 'g',
                tex: 'Pel principi d’inducció, és certa per a tot $n \\ge 1$.',
                deps: ['a', 'f'],
                seccio: 'h3',
            },
        ],
        conclusio: 'g',
        trampes: [
            {
                id: 't1',
                tex: 'Suposem que la fórmula és certa per a tot $n$.',
                motiu: 'La hipòtesi d’inducció és per a un $n$, no per a tots: això és el que vols demostrar.',
                nivell: 1,
                seccio: 'h2',
            },
            {
                id: 't2',
                tex: 'Llavors $1^3 + \\dots + (n+1)^3 = (1 + \\dots + n)^2 + (n+1)^2$.',
                motiu: 'El terme nou és $(n+1)^3$, no $(n+1)^2$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: '$(1 + \\dots + n)^2 = 1^2 + 2^2 + \\dots + n^2$.',
                motiu: 'El quadrat d’una suma no és la suma dels quadrats.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    escriure: {
        guio: [
            'He comprovat el cas base.',
            'He escrit la hipòtesi d’inducció i la suma de Gauss.',
            'He afegit $(n+1)^3$ i he tret factor comú $(n+1)^2$.',
            'He reconegut el quadrat de la suma fins a $n + 1$.',
            'He acabat citant el principi d’inducció.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure el cas base i el pas de $n$ a $n + 1$.',
        concreta: '$1 + 8 + 27 = 36$, i $1 + 2 + 3 = 6$. Coincideix?',
        figura: {
            pas: 3,
            peu: 'L de cubs',
        },
        tanca: 'Fes servir $1 + \\dots + n = \\dfrac{n(n+1)}{2}$ i treu factor comú $(n+1)^2$.',
        comprovacio: 'Amb $n = 5$: $225 = 15^2$.',
        iDespres: 'Quant fa $1^3 + 2^3 + \\dots + 10^3$?',
    },
    credit: 'Identitat de Nicòmac de Gerasa (segles I–II); figura original d’aquest web.',
});

/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/dos-n.js
 * ROL: Teorema «2ⁿ > n»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'dos-n',
    titol: '$2^n > n$',
    curs: '1BAT',
    bloc: 'induccio',
    enunciat: 'Per a tot enter $n \\ge 1$: $2^n > n$.',
    veure: {
        figura: 'potencies',
        n: {
            min: 1,
            max: 8,
            inicial: 6,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Les barres: $2^n$ (groga) i $n$ (vermella), a la mateixa escala.',
            },
            {
                pas: 2,
                text: 'Per a $n = 1$: $2 > 1$. És el primer pas.',
            },
            {
                pas: 3,
                text: 'A cada pas, $2^n$ es duplica i $n$ només creix $1$.',
                provaPrimer: 'Si $2^n > n$, per què $2^{n+1} > n + 1$?',
            },
            {
                pas: 4,
                text: 'Duplicar un nombre $\\ge 1$ hi suma almenys $1$: la barra groga sempre guanya.',
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
                tex: 'Per a $n = 1$: $2^1 = 2 > 1$.',
                deps: [],
                seccio: 'h1',
            },
            {
                id: 'b',
                tex: 'Suposem que $2^n > n$ per a un cert $n \\ge 1$ (hipòtesi d’inducció).',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'c',
                tex: 'Llavors $2^{n+1} = 2 \\cdot 2^n > 2n$.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'd',
                tex: 'Com que $n \\ge 1$, $2n = n + n \\ge n + 1$.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'e',
                tex: 'Per tant, $2^{n+1} > n + 1$.',
                deps: ['c', 'd'],
                seccio: 'h2',
            },
            {
                id: 'f',
                tex: 'Pel principi d’inducció, $2^n > n$ per a tot $n \\ge 1$.',
                deps: ['a', 'e'],
                seccio: 'h3',
            },
        ],
        conclusio: 'f',
        trampes: [
            {
                id: 't1',
                tex: 'Suposem que $2^n > n$ per a tot $n \\ge 1$.',
                motiu: 'La hipòtesi d’inducció és per a un $n$, no per a tots: això és el que vols demostrar.',
                nivell: 1,
                seccio: 'h2',
            },
            {
                id: 't2',
                tex: 'Per a $n = 1, 2, 3, 4$ es compleix; per tant, es compleix sempre.',
                motiu: 'Uns quants casos no fan el pas inductiu.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Llavors $2^{n+1} = 2^n + 1 > n + 1$.',
                motiu: '$2^{n+1} = 2 \\cdot 2^n$, no $2^n + 1$.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'],
    },
    escriure: {
        guio: [
            'He comprovat el cas base.',
            'He escrit la hipòtesi d’inducció per a un $n$.',
            'He demostrat el cas $n + 1$ fent servir la hipòtesi.',
            'He dit on faig servir que $n \\ge 1$.',
            'He acabat citant el principi d’inducció.',
        ],
    },
    pistes: {
        encarrec: 'Has de fer dues coses: el cas $n = 1$ i el pas de $n$ a $n + 1$.',
        concreta: 'Si saps que $2^5 = 32 > 5$, com saps que $2^6 > 6$ sense calcular $2^6$?',
        figura: {
            pas: 3,
            peu: 'Es duplica',
        },
        tanca: 'Escriu $2^{n+1}$ com $2 \\cdot 2^n$ i fes servir la hipòtesi.',
        comprovacio: 'Amb $n = 10$: $1024 > 10$.',
        iDespres: 'És cert que $2^n > n^2$? Per a quins $n$?',
    },
    credit: 'Exercici clàssic d’inducció.',
});

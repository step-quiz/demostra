/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/angles-triangle.js
 * ROL: Teorema «Els angles d’un triangle»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'angles-triangle',
    titol: 'Els angles d’un triangle',
    curs: '2ESO',
    bloc: 'geometria',
    enunciat: 'Els tres angles de qualsevol triangle sumen $180^\\circ$.',
    veure: {
        figura: 'triangle',
        n: {
            min: 1,
            max: 7,
            inicial: 4,
            etiqueta: 'C',
        },
        panells: [
            {
                pas: 1,
                text: 'Un triangle $ABC$ amb els angles $\\alpha$, $\\beta$ i $\\gamma$. Mou $C$ amb el control.',
            },
            {
                pas: 2,
                text: 'Per $C$, dibuixem la recta $r$ paral·lela a $AB$.',
                provaPrimer: 'Quins angles iguals veus a la recta nova?',
            },
            {
                pas: 3,
                text: 'Els angles alterns interns són iguals: a $C$ hi tornen a sortir $\\alpha$ i $\\beta$.',
            },
            {
                pas: 4,
                text: 'A $C$, $\\alpha$, $\\gamma$ i $\\beta$ fan un angle pla: $180^\\circ$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Sigui $r$ la recta paral·lela a $AB$ que passa per $C$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'L’angle entre $r$ i $CA$ és igual a $\\alpha$: són angles alterns interns entre paral·leles.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'L’angle entre $r$ i $CB$ és igual a $\\beta$, pel mateix motiu.',
                deps: ['a'],
            },
            {
                id: 'd',
                tex: 'A $C$, aquests dos angles i $\\gamma$ ocupen tot un costat de la recta $r$.',
                deps: ['b', 'c'],
            },
            {
                id: 'e',
                tex: 'Un angle pla fa $180^\\circ$; per tant, $\\alpha + \\beta + \\gamma = 180^\\circ$.',
                deps: ['d'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: 'He mesurat els angles d’un triangle amb el transportador i sumen $180^\\circ$.',
                motiu: 'Mesurar un triangle no demostra res per a tots els triangles.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'L’angle entre $r$ i $CA$ és igual a $\\gamma$.',
                motiu: 'Mira la figura: l’angle altern intern al de $A$ és $\\alpha$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Com que els angles sumen $180^\\circ$, $r$ és paral·lela a $AB$.',
                motiu: 'Fa servir el que vols demostrar.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He dibuixat la figura i hi he posat noms.',
            'He dit quina recta nova faig servir.',
            'He dit quins angles són iguals i per què (alterns interns).',
            'He explicat per què la suma és un angle pla.',
        ],
    },
    pistes: {
        encarrec:
            'Has de veure que $\\alpha + \\beta + \\gamma = 180^\\circ$ en qualsevol triangle, no en un de concret.',
        concreta: 'En un triangle equilàter, quant fa cada angle?',
        figura: {
            pas: 2,
            peu: 'Una paral·lela',
        },
        tanca: 'Busca angles alterns interns entre la recta nova i $AB$.',
        comprovacio: 'Si $\\alpha = 50^\\circ$ i $\\beta = 60^\\circ$, llavors $\\gamma = 70^\\circ$.',
        iDespres: 'Quant sumen els angles d’un quadrilàter? I d’un pentàgon?',
    },
    credit: 'Euclides, Elements, llibre I, proposició 32.',
});

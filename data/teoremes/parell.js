/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/parell.js
 * ROL: Teorema «Parell per qualsevol és parell»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'parell',
    titol: 'Parell per qualsevol és parell',
    curs: '3ESO',
    bloc: 'nombres',
    enunciat: 'Si $a$ és un enter parell i $b$ és un enter qualsevol, $a \\cdot b$ és parell.',
    veure: {
        figura: 'parell',
        n: {
            min: 1,
            max: 6,
            inicial: 3,
            etiqueta: 'b',
        },
        panells: [
            {
                pas: 1,
                text: 'Un nombre parell es pot posar en dues files iguals. Aquí $a = 4$.',
            },
            {
                pas: 2,
                text: 'Multiplicar per $b$ és repetir-lo $b$ vegades.',
                provaPrimer: 'Les files continuen sent iguals?',
            },
            {
                pas: 3,
                text: 'Continuen sent dues files iguals: $a \\cdot b$ és parell.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Com que $a$ és parell, hi ha un enter $k$ amb $a = 2k$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'Llavors $a \\cdot b = (2k) \\cdot b$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'Per la propietat associativa, $(2k) \\cdot b = 2 \\cdot (kb)$.',
                deps: ['b'],
            },
            {
                id: 'd',
                tex: '$kb$ és un enter, perquè és un producte d’enters.',
                deps: ['a'],
            },
            {
                id: 'e',
                tex: 'Per tant, $a \\cdot b = 2 \\cdot (kb)$ és parell.',
                deps: ['c', 'd'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: '$6 \\cdot 7 = 42$, que és parell; per tant, és cert.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Com que $a$ és parell, $a = 2$.',
                motiu: '$a$ pot ser qualsevol parell: $a = 2k$ per a algun enter $k$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Com que $b$ és senar, $b = 2k + 1$.',
                motiu: '$b$ és un enter qualsevol: no sabem si és senar.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He escrit què vol dir que $a$ sigui parell ($a = 2k$).',
            'He substituït $a$ al producte.',
            'He escrit el producte com $2$ per un enter.',
            'He dit per què aquest enter és enter.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que el producte sempre és $2$ per algun enter.',
        concreta: 'Prova $a = 6$, $b = 7$: $42 = 2 \\cdot 21$. D’on surt el $21$?',
        figura: {
            pas: 2,
            peu: 'Dues files',
        },
        tanca: 'Escriu el parell com $2k$.',
        comprovacio: 'Amb $a = 10$, $b = 13$: $130 = 2 \\cdot 65$, i $65 = 5 \\cdot 13$.',
        iDespres: 'I senar per senar? Escriu $(2k+1)(2m+1)$.',
    },
    credit: 'Propietat elemental dels enters.',
});

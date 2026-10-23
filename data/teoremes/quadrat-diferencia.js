/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/quadrat-diferencia.js
 * ROL: Teorema «El quadrat d’una diferència»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'quadrat-diferencia',
    titol: 'El quadrat d’una diferència',
    curs: '3ESO',
    bloc: 'algebra',
    enunciat: 'Per a tots els nombres $a$ i $b$: $(a-b)^2 = a^2 - 2ab + b^2$.',
    veure: {
        figura: 'quadratDiferencia',
        n: {
            min: 3,
            max: 8,
            inicial: 6,
            etiqueta: 'a',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat de costat $a$ i, a dins, el quadrat de costat $a - b$. Aquí $b = 2$.',
            },
            {
                pas: 2,
                text: 'Traiem del quadrat gran dues tires de $a \\times b$.',
                provaPrimer: 'Si traiem les dues tires, quina part hem tret dues vegades?',
            },
            {
                pas: 3,
                text: 'El quadradet $b^2$ del racó s’ha tret dues vegades: l’hem de tornar a posar.',
            },
            {
                pas: 4,
                text: 'Per tant, $(a-b)^2 = a^2 - 2ab + b^2$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: '$(a-b)^2 = (a-b)(a-b)$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'Distribuïm: $(a-b)(a-b) = a(a-b) - b(a-b)$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: '$a(a-b) = a^2 - ab$.',
                deps: [],
            },
            {
                id: 'd',
                tex: '$b(a-b) = ab - b^2$.',
                deps: [],
            },
            {
                id: 'e',
                tex: 'Per tant, $(a-b)^2 = a^2 - ab - (ab - b^2) = a^2 - 2ab + b^2$.',
                deps: ['b', 'c', 'd'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: '$(a-b)^2 = a^2 - b^2$.',
                motiu: 'Prova $a = 3$, $b = 1$: $(3-1)^2 = 4$, però $9 - 1 = 8$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: '$b(a-b) = ab + b^2$.',
                motiu: 'Revisa el signe: $b \\cdot (-b) = -b^2$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: '$-(ab - b^2) = -ab - b^2$.',
                motiu: 'El signe menys canvia el signe dels dos termes.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He escrit el quadrat com un producte.',
            'He distribuït amb cura dels signes.',
            'He tret el parèntesi amb el signe menys correctament.',
            'He acabat amb la igualtat que volia.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que $(a-b)^2$ i $a^2 - 2ab + b^2$ són sempre iguals.',
        concreta: 'Prova $a = 5$, $b = 2$: $(5-2)^2$ i $25 - 20 + 4$.',
        figura: {
            pas: 3,
            peu: 'Dues tires',
        },
        tanca: 'Vigila el signe de $(-b) \\cdot (-b)$.',
        comprovacio: 'Amb $a = 10$, $b = 1$: $81 = 100 - 20 + 1$.',
        iDespres: 'Ho pots deduir de $(a+b)^2$ canviant $b$ per $-b$?',
    },
    credit: 'Identitat clàssica; la figura és la de les dues tires.',
});

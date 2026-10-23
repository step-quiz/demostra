/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/diferencia-quadrats.js
 * ROL: Teorema «Suma per diferència»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'diferencia-quadrats',
    titol: 'Suma per diferència',
    curs: '3ESO',
    bloc: 'algebra',
    enunciat: 'Per a tots els nombres $a$ i $b$: $a^2 - b^2 = (a+b)(a-b)$.',
    veure: {
        figura: 'diferenciaQuadrats',
        n: {
            min: 3,
            max: 8,
            inicial: 6,
            etiqueta: 'a',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat $a^2$ amb un quadradet $b^2$ tret del racó: queda una L. Aquí $b = 2$.',
            },
            {
                pas: 2,
                text: 'Tallem la L en dos rectangles.',
            },
            {
                pas: 3,
                text: 'Girem el rectangle petit i el posem al costat de l’altre.',
                provaPrimer: 'Quines mides té el rectangle que surt?',
            },
            {
                pas: 4,
                text: 'Surt un rectangle de $(a+b) \\times (a-b)$: $a^2 - b^2 = (a+b)(a-b)$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Comencem pel costat dret: $(a+b)(a-b) = a(a-b) + b(a-b)$.',
                deps: [],
            },
            {
                id: 'b',
                tex: '$a(a-b) + b(a-b) = a^2 - ab + ba - b^2$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'El producte és commutatiu: $ba = ab$.',
                deps: [],
            },
            {
                id: 'd',
                tex: 'Per tant, $-ab + ba = 0$.',
                deps: ['c'],
            },
            {
                id: 'e',
                tex: 'Per tant, $(a+b)(a-b) = a^2 - b^2$.',
                deps: ['b', 'd'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: '$a(a-b) + b(a-b) = a^2 - ab + ba + b^2$.',
                motiu: 'Revisa el signe de $b \\cdot (-b)$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Com que $a^2 - b^2 = (a+b)(a-b)$, el costat dret val $a^2 - b^2$.',
                motiu: 'Fa servir el que vols demostrar.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: '$a^2 - b^2 = (a-b)^2$.',
                motiu: 'Prova $a = 3$, $b = 1$: $8$ i $4$ no són iguals.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He dit de quin costat de la igualtat començo.',
            'He multiplicat amb la propietat distributiva.',
            'He explicat quins termes es cancel·len i per què.',
            'He arribat a l’altre costat de la igualtat.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que $a^2 - b^2$ i $(a+b)(a-b)$ són sempre iguals.',
        concreta: 'Prova $a = 7$, $b = 3$: $49 - 9$ i $10 \\cdot 4$.',
        figura: {
            pas: 3,
            peu: 'La L girada',
        },
        tanca: 'Multiplica $(a+b)(a-b)$ i mira quins termes del mig desapareixen.',
        comprovacio: '$101 \\cdot 99 = 100^2 - 1^2 = 9999$.',
        iDespres: 'Calcula $49 \\cdot 51$ de cap amb aquesta igualtat.',
    },
    credit: 'Identitat clàssica; la figura de la L és tradicional.',
});

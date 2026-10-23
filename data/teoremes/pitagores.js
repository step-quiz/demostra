/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/pitagores.js
 * ROL: Teorema «El teorema de Pitàgores»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'pitagores',
    titol: 'El teorema de Pitàgores',
    curs: '2ESO',
    bloc: 'geometria',
    enunciat: 'En un triangle rectangle de catets $a$ i $b$ i hipotenusa $c$: $a^2 + b^2 = c^2$.',
    veure: {
        figura: 'pitagores',
        n: {
            min: 1,
            max: 6,
            inicial: 4,
            etiqueta: 'a',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat de costat $a + b$ amb quatre còpies del triangle: al mig queda un quadrat de costat $c$. Aquí $b = 3$.',
            },
            {
                pas: 2,
                text: 'Posem els mateixos quatre triangles d’una altra manera, en un quadrat igual.',
                provaPrimer: 'Què queda lliure ara?',
            },
            {
                pas: 3,
                text: 'Ara queden lliures un quadrat $a^2$ i un quadrat $b^2$.',
            },
            {
                pas: 4,
                text: 'Els dos quadrats grans i els triangles són iguals: el que queda lliure també. $c^2 = a^2 + b^2$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Dins d’un quadrat de costat $a + b$ hi posem quatre còpies del triangle, una a cada racó.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'La figura del mig és un quadrat de costat $c$: els seus angles fan $90^\\circ$, perquè els dos angles aguts del triangle sumen $90^\\circ$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'Llavors $(a+b)^2 = 4 \\cdot \\dfrac{ab}{2} + c^2$.',
                deps: ['b'],
            },
            {
                id: 'd',
                tex: 'Els mateixos quatre triangles, posats d’una altra manera, deixen lliures un quadrat $a^2$ i un quadrat $b^2$.',
                deps: [],
            },
            {
                id: 'e',
                tex: 'Llavors $(a+b)^2 = 4 \\cdot \\dfrac{ab}{2} + a^2 + b^2$.',
                deps: ['d'],
            },
            {
                id: 'f',
                tex: 'Igualem: $4 \\cdot \\dfrac{ab}{2} + c^2 = 4 \\cdot \\dfrac{ab}{2} + a^2 + b^2$.',
                deps: ['c', 'e'],
            },
            {
                id: 'g',
                tex: 'Traiem els triangles dels dos costats: $c^2 = a^2 + b^2$.',
                deps: ['f'],
            },
        ],
        conclusio: 'g',
        trampes: [
            {
                id: 't1',
                tex: 'Amb $a = 3$, $b = 4$ i $c = 5$: $9 + 16 = 25$.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Llavors $(a+b)^2 = a^2 + b^2$.',
                motiu: 'L’àrea d’un quadrat de costat $a + b$ no és $a^2 + b^2$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'L’àrea de cada triangle és $ab$.',
                motiu: 'L’àrea d’un triangle rectangle és la meitat: $\\dfrac{ab}{2}$.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    escriure: {
        guio: [
            'He dibuixat les dues maneres de posar els quatre triangles.',
            'He explicat per què la figura del mig és un quadrat.',
            'He escrit l’àrea del quadrat gran de les dues maneres.',
            'He igualat i he tret els triangles.',
        ],
    },
    pistes: {
        encarrec:
            'Has de veure que l’àrea del quadrat de la hipotenusa és la suma de les àrees dels quadrats dels catets.',
        concreta: 'Amb $a = 3$, $b = 4$: quina àrea té el quadrat de costat $7$? I els quatre triangles?',
        figura: {
            pas: 3,
            peu: 'Dues maneres',
        },
        tanca: 'Compara el que queda lliure en els dos quadrats.',
        comprovacio: 'Amb $a = 5$ i $b = 12$, $c = 13$.',
        iDespres: 'I si el triangle no és rectangle? Què passa amb $a^2 + b^2$?',
    },
    credit: 'Demostració per reordenació, de tradició xinesa i índia; dibuix original d’aquest web.',
});

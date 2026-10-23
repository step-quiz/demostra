/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/quadrat-suma.js
 * ROL: Teorema «El quadrat d’una suma»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'quadrat-suma',
    titol: 'El quadrat d’una suma',
    curs: '3ESO',
    bloc: 'algebra',
    enunciat: 'Per a tots els nombres $a$ i $b$: $(a+b)^2 = a^2 + 2ab + b^2$.',
    veure: {
        figura: 'quadratSuma',
        n: {
            min: 1,
            max: 6,
            inicial: 4,
            etiqueta: 'a',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat de costat $a + b$: la seva àrea és $(a+b)^2$. Aquí $b = 2$.',
            },
            {
                pas: 2,
                text: 'El tallem en quatre trossos.',
                provaPrimer: 'Quines àrees tenen els quatre trossos?',
            },
            {
                pas: 3,
                text: 'Un quadrat $a^2$, un quadrat $b^2$ i dos rectangles $ab$.',
            },
            {
                pas: 4,
                text: 'Per tant, $(a+b)^2 = a^2 + 2ab + b^2$. (La figura ho mostra per a $a, b > 0$; la demostració, per a tots.)',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: '$(a+b)^2 = (a+b)(a+b)$, per la definició de quadrat.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'Per la propietat distributiva: $(a+b)(a+b) = a(a+b) + b(a+b)$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: 'Tornem a distribuir: $a(a+b) + b(a+b) = a^2 + ab + ba + b^2$.',
                deps: ['b'],
            },
            {
                id: 'd',
                tex: 'El producte és commutatiu: $ba = ab$.',
                deps: [],
            },
            {
                id: 'e',
                tex: 'Per tant, $(a+b)^2 = a^2 + 2ab + b^2$.',
                deps: ['c', 'd'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: '$(a+b)^2 = a^2 + b^2$, perquè el quadrat es reparteix.',
                motiu: 'El quadrat no es reparteix sobre una suma: prova $a = b = 1$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Tornem a distribuir: $a(a+b) + b(a+b) = a^2 + ab + b^2$.',
                motiu: 'Falta un terme: $b \\cdot a$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Amb $a = 3$ i $b = 2$: $25 = 9 + 12 + 4$; per tant, és cert.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He escrit el quadrat com un producte.',
            'He aplicat la propietat distributiva pas a pas.',
            'He dit per què $ab + ba = 2ab$.',
            'He acabat amb la igualtat que volia.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que $(a+b)^2$ i $a^2 + 2ab + b^2$ són sempre iguals.',
        concreta: 'Prova $a = 3$, $b = 2$: $(3+2)^2$ i $9 + 12 + 4$.',
        figura: {
            pas: 3,
            peu: 'Quatre trossos',
        },
        tanca: 'Escriu $(a+b)^2$ com $(a+b)(a+b)$ i multiplica.',
        comprovacio: 'Amb $a = 10$, $b = 1$: $121 = 100 + 20 + 1$.',
        iDespres: 'Quant fa $(a+b+c)^2$? Dibuixa-ho.',
    },
    credit: 'Identitat clàssica; ja als Elements d’Euclides (llibre II), en forma geomètrica.',
});

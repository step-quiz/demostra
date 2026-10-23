/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/derivada-x2.js
 * ROL: Teorema «La derivada de x²»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'derivada-x2',
    titol: 'La derivada de $x^2$',
    curs: '1BAT',
    bloc: 'analisi',
    enunciat: "Si $f(x) = x^2$, llavors $f'(x) = 2x$ per a tot $x$ (a partir de la definició de derivada).",
    veure: {
        figura: 'derivada',
        n: {
            min: 1,
            max: 6,
            inicial: 2,
            etiqueta: 'zoom',
        },
        panells: [
            {
                pas: 1,
                text: 'La paràbola $y = x^2$ i el punt $(x, x^2)$; aquí $x = 1$.',
            },
            {
                pas: 2,
                text: 'La recta que passa també per $(x + h, (x+h)^2)$ té pendent $\\dfrac{(x+h)^2 - x^2}{h}$. Mou el control: $h$ es fa petit.',
                provaPrimer: 'Quant val aquest pendent? Simplifica.',
            },
            {
                pas: 3,
                text: 'El pendent és $2x + h$.',
            },
            {
                pas: 4,
                text: 'Quan $h$ s’acosta a $0$, el pendent s’acosta a $2x$: la recta es torna la tangent.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: "Per definició, $f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$.",
                deps: [],
            },
            {
                id: 'b',
                tex: '$f(x+h) - f(x) = (x+h)^2 - x^2 = 2xh + h^2$.',
                deps: [],
            },
            {
                id: 'c',
                tex: 'Per a $h \\ne 0$: $\\dfrac{2xh + h^2}{h} = 2x + h$.',
                deps: ['b'],
            },
            {
                id: 'd',
                tex: '$\\lim_{h \\to 0} (2x + h) = 2x$.',
                deps: [],
            },
            {
                id: 'e',
                tex: "Per tant, $f'(x) = 2x$.",
                deps: ['a', 'c', 'd'],
            },
        ],
        conclusio: 'e',
        trampes: [
            {
                id: 't1',
                tex: '$f(x+h) - f(x) = x^2 + h^2 - x^2 = h^2$.',
                motiu: '$(x+h)^2 \\ne x^2 + h^2$: falta $2xh$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Per a $h = 0$: $\\dfrac{2xh + h^2}{h} = \\dfrac{0}{0}$; per tant, el límit no existeix.',
                motiu: 'Al límit, $h$ s’acosta a $0$ però no val $0$: primer simplifiques.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: "Per la regla de la potència, $(x^2)' = 2x$.",
                motiu: 'La regla de la potència és el que vols demostrar a partir de la definició.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e'],
    },
    escriure: {
        guio: [
            'He escrit la definició de derivada.',
            'He calculat $f(x+h) - f(x)$ desenvolupant el quadrat.',
            'He simplificat per $h$ dient que $h \\ne 0$.',
            'He calculat el límit.',
        ],
    },
    pistes: {
        encarrec: 'Has de calcular un límit, no fer servir les regles de derivació.',
        concreta: 'Amb $x = 3$ i $h = 0{,}1$: $\\dfrac{3{,}1^2 - 9}{0{,}1}$. Quant fa?',
        figura: {
            pas: 2,
            peu: 'La secant',
        },
        tanca: 'Desenvolupa $(x+h)^2$ i divideix per $h$ abans de fer el límit.',
        comprovacio: 'A $x = 3$, el pendent de la tangent ha de ser $6$.',
        iDespres: 'Fes el mateix amb $f(x) = x^3$.',
    },
    credit: 'Càlcul clàssic a partir de la definició (Newton, Leibniz; definició amb límits de Cauchy).',
});

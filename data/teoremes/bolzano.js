/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/bolzano.js
 * ROL: Teorema «Una aplicació de Bolzano»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'bolzano',
    titol: 'Una aplicació de Bolzano',
    curs: '2BAT',
    bloc: 'analisi',
    enunciat: 'L’equació $x^3 + x - 1 = 0$ té alguna solució entre $0$ i $1$.',
    veure: {
        figura: 'bolzano',
        n: {
            min: 1,
            max: 6,
            inicial: 4,
            etiqueta: 'passos',
        },
        panells: [
            {
                pas: 1,
                text: 'Sigui $f(x) = x^3 + x - 1$. $f(0) = -1$: la gràfica comença per sota de l’eix.',
            },
            {
                pas: 2,
                text: '$f(1) = 1$: acaba per sobre de l’eix.',
                provaPrimer: 'Pot anar d’un punt a l’altre sense tallar l’eix, si no aixeques el llapis?',
            },
            {
                pas: 3,
                text: 'Com que $f$ és contínua, ha de tallar l’eix: hi ha una solució.',
            },
            {
                pas: 4,
                text: 'Partint l’interval per la meitat cada vegada, l’encerclem. El teorema no la calcula, però en garanteix l’existència.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'Sigui $f(x) = x^3 + x - 1$.',
                deps: [],
            },
            {
                id: 'b',
                tex: '$f$ és un polinomi; per tant, és contínua a $[0, 1]$.',
                deps: ['a'],
            },
            {
                id: 'c',
                tex: '$f(0) = -1 < 0$.',
                deps: ['a'],
            },
            {
                id: 'd',
                tex: '$f(1) = 1 > 0$.',
                deps: ['a'],
            },
            {
                id: 'e',
                tex: 'Pel teorema de Bolzano, hi ha un $c \\in (0, 1)$ amb $f(c) = 0$.',
                deps: ['b', 'c', 'd'],
            },
            {
                id: 'f',
                tex: 'Per tant, l’equació $x^3 + x - 1 = 0$ té alguna solució entre $0$ i $1$.',
                deps: ['e'],
            },
        ],
        conclusio: 'f',
        trampes: [
            {
                id: 't1',
                tex: 'Pel teorema de Bolzano, $c = \\dfrac{1}{2}$.',
                motiu: 'Bolzano diu que hi ha una solució, no quina és: $f\\left(\\tfrac{1}{2}\\right) = -\\tfrac{3}{8} \\ne 0$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: '$f$ és contínua perquè $f(0) < 0 < f(1)$.',
                motiu: 'La continuïtat ve de ser un polinomi, no dels signes.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: '$f(0) = 1 > 0$.',
                motiu: 'Calcula-ho: $0^3 + 0 - 1 = -1$.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'],
    },
    escriure: {
        guio: [
            'He definit la funció.',
            'He dit per què és contínua a l’interval.',
            'He calculat els signes als extrems.',
            'He citat el teorema de Bolzano amb les seves condicions.',
        ],
    },
    pistes: {
        encarrec: 'Has de demostrar que hi ha una solució, no calcular-la.',
        concreta: 'Calcula $f(0)$ i $f(1)$. Quins signes tenen?',
        figura: {
            pas: 3,
            peu: 'Talla l’eix',
        },
        tanca: 'Quines condicions demana el teorema de Bolzano?',
        comprovacio: '$f(0{,}5) < 0$ i $f(0{,}75) > 0$: la solució és entre $0{,}5$ i $0{,}75$.',
        iDespres: 'Té més d’una solució? (Pista: $f$ és creixent.)',
    },
    credit: 'Teorema de Bolzano (1817); exemple clàssic.',
});

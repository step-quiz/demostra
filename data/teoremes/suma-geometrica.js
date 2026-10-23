/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/suma-geometrica.js
 * ROL: Teorema «La suma geomètrica»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'suma-geometrica',
    titol: 'La suma geomètrica',
    curs: '1BAT',
    bloc: 'induccio',
    enunciat:
        'Per a tot nombre $r \\ne 1$ i tot enter $n \\ge 1$: $1 + r + r^2 + \\dots + r^{n-1} = \\dfrac{r^n - 1}{r - 1}$.',
    veure: {
        figura: 'geometrica',
        n: {
            min: 1,
            max: 6,
            inicial: 5,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Amb $r = 2$: blocs de $1$, $2$, $4$, …, $2^{n-1}$.',
            },
            {
                pas: 2,
                text: 'Els posem en fila i, a sota, una barra de $2^n$.',
                provaPrimer: 'Quant li falta a la fila per arribar a $2^n$?',
            },
            {
                pas: 3,
                text: 'Li falta exactament $1$: $1 + 2 + \\dots + 2^{n-1} = 2^n - 1$.',
            },
            {
                pas: 4,
                text: 'És la fórmula amb $r = 2$: $\\dfrac{2^n - 1}{2 - 1}$.',
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
                tex: 'Per a $n = 1$: a l’esquerra hi ha $1$, i $\\dfrac{r^1 - 1}{r - 1} = 1$.',
                deps: [],
                seccio: 'h1',
            },
            {
                id: 'b',
                tex: 'Suposem que $1 + r + \\dots + r^{n-1} = \\dfrac{r^n - 1}{r - 1}$ per a un cert $n \\ge 1$.',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'c',
                tex: 'Llavors $1 + r + \\dots + r^{n-1} + r^n = \\dfrac{r^n - 1}{r - 1} + r^n$.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'd',
                tex: '$\\dfrac{r^n - 1}{r - 1} + r^n = \\dfrac{r^n - 1 + r^{n+1} - r^n}{r - 1} = \\dfrac{r^{n+1} - 1}{r - 1}$.',
                deps: [],
                seccio: 'h2',
            },
            {
                id: 'e',
                tex: 'Per tant, la fórmula també és certa per a $n + 1$.',
                deps: ['c', 'd'],
                seccio: 'h2',
            },
            {
                id: 'f',
                tex: 'Pel principi d’inducció, és certa per a tot $n \\ge 1$.',
                deps: ['a', 'e'],
                seccio: 'h3',
            },
        ],
        conclusio: 'f',
        trampes: [
            {
                id: 't1',
                tex: 'Amb $r = 2$ i $n = 3$: $1 + 2 + 4 = 7 = \\dfrac{8 - 1}{1}$.',
                motiu: 'Un exemple no és una demostració: ha de ser cert per a tots els casos.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Suposem que la fórmula és certa per a tot $n$.',
                motiu: 'La hipòtesi d’inducció és per a un $n$, no per a tots: això és el que vols demostrar.',
                nivell: 1,
                seccio: 'h2',
            },
            {
                id: 't3',
                tex: '$\\dfrac{r^n - 1}{r - 1} + r^n = \\dfrac{r^n - 1 + r^n}{r - 1}$.',
                motiu: 'Per sumar $r^n$ a una fracció, l’has de multiplicar pel denominador.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'],
    },
    escriure: {
        guio: [
            'He comprovat el cas base.',
            'He escrit la hipòtesi d’inducció.',
            'He afegit el terme $r^n$ als dos costats.',
            'He fet la suma de fraccions amb cura.',
            'He acabat citant el principi d’inducció.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure el cas $n = 1$ i que, si la fórmula val per a $n$, també val per a $n + 1$.',
        concreta: 'Amb $r = 3$: $1 + 3 + 9 = 13$ i $\\dfrac{27 - 1}{2} = 13$.',
        figura: {
            pas: 3,
            peu: 'Falta 1',
        },
        tanca: 'Per passar de $n$ a $n + 1$ només cal sumar $r^n$.',
        comprovacio: 'Amb $r = 10$ i $n = 4$: $1111 = \\dfrac{9999}{9}$.',
        iDespres: 'Què passa amb la suma si $r = \\tfrac{1}{2}$ i $n$ es fa molt gran?',
    },
    credit: 'Fórmula clàssica (ja apareix, per a $r = 2$, als Elements d’Euclides, llibre IX).',
});

/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/senars.js
 * ROL: Teorema «La suma dels senars»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'senars',
    titol: 'La suma dels senars',
    curs: '3ESO',
    bloc: 'nombres',
    enunciat: 'La suma dels $n$ primers nombres senars és $n^2$: $1 + 3 + 5 + \\dots + (2n-1) = n^2$.',
    veure: {
        figura: 'senars',
        n: {
            min: 1,
            max: 8,
            inicial: 4,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Un quadrat d’$1 \\times 1$: és el primer senar, $1$.',
            },
            {
                pas: 2,
                text: 'Hi afegim una L de $3$ quadrets: ara tenim un quadrat de $2 \\times 2$.',
            },
            {
                pas: 3,
                text: 'Cada L nova té $2$ quadrets més que l’anterior: $5$, $7$, …',
                provaPrimer: 'Quants quadrets té la L número $k$?',
            },
            {
                pas: 4,
                text: 'Amb $n$ L tenim un quadrat de $n \\times n$: $1 + 3 + \\dots + (2n-1) = n^2$.',
            },
        ],
    },
    ordenar: {
        tipus: 'directa',
        bastida: [],
        linies: [
            {
                id: 'a',
                tex: 'El senar número $k$ és $2k - 1$.',
                deps: [],
            },
            {
                id: 'b',
                tex: 'Per a cada $k$: $k^2 - (k-1)^2 = k^2 - (k^2 - 2k + 1) = 2k - 1$.',
                deps: [],
            },
            {
                id: 'c',
                tex: 'Per tant, el senar número $k$ és el que creix el quadrat de $(k-1)^2$ a $k^2$: la L.',
                deps: ['a', 'b'],
            },
            {
                id: 'd',
                tex: 'Sumem de $k = 1$ a $k = n$: $1 + 3 + \\dots + (2n-1) = (1^2 - 0^2) + (2^2 - 1^2) + \\dots + (n^2 - (n-1)^2)$.',
                deps: ['c'],
            },
            {
                id: 'e',
                tex: 'A la dreta, cada quadrat surt una vegada sumant i una vegada restant, menys $n^2$ i $0^2$.',
                deps: ['d'],
            },
            {
                id: 'f',
                tex: 'Per tant, $1 + 3 + \\dots + (2n-1) = n^2 - 0^2 = n^2$.',
                deps: ['e'],
            },
        ],
        conclusio: 'f',
        trampes: [
            {
                id: 't1',
                tex: 'Ho comprovem per a $n = 1, 2, 3$ i, com que surt, és cert per a tots.',
                motiu: 'Uns quants exemples no demostren que sigui cert per a tots els $n$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Com que $1 + 3 + \\dots + (2n-1) = n^2$, la diferència de dos quadrats seguits és $2k - 1$.',
                motiu: 'Fa servir el que vols demostrar.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'El senar número $k$ és $2k + 1$.',
                motiu: 'Prova-ho amb $k = 1$: el primer senar és $1$, no $3$.',
                nivell: 3,
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'],
    },
    escriure: {
        guio: [
            'He escrit què vull demostrar, amb la fórmula.',
            'He dit quin és el senar número $k$.',
            'He fet servir la diferència de dos quadrats seguits.',
            'He sumat totes les igualtats i he explicat què es cancel·la.',
            'He acabat amb «Per tant, …».',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que la suma dels $n$ primers senars sempre dona un quadrat perfecte.',
        concreta: 'Prova $n = 4$: $1 + 3 + 5 + 7$. Quant fa? I $4^2$?',
        figura: {
            pas: 3,
            peu: 'Les L',
        },
        tanca: 'Mira quant creix un quadrat quan passes de $(k-1)^2$ a $k^2$.',
        comprovacio: 'Amb $n = 10$ t’ha de sortir $100$.',
        iDespres: 'I la suma dels $n$ primers parells, $2 + 4 + \\dots + 2n$?',
    },
    credit: 'Idea clàssica, ja coneguda pels pitagòrics.',
});

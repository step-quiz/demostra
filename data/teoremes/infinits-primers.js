/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/infinits-primers.js
 * ROL: Teorema «Hi ha infinits primers»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'infinits-primers',
    titol: 'Hi ha infinits primers',
    curs: '4ESO',
    bloc: 'nombres',
    enunciat: 'Hi ha infinits nombres primers.',
    veure: {
        figura: 'primers',
        n: {
            min: 1,
            max: 6,
            inicial: 4,
            etiqueta: 'n',
        },
        panells: [
            {
                pas: 1,
                text: 'Agafem els $n$ primers nombres primers.',
            },
            {
                pas: 2,
                text: 'Els multipliquem i hi sumem $1$: és el nombre $N$.',
                provaPrimer: 'Quin residu dona $N$ en dividir-lo per $2$? I per $3$?',
            },
            {
                pas: 3,
                text: 'Cap dels primers de la llista divideix $N$: sempre sobra $1$.',
            },
            {
                pas: 4,
                text: 'Els divisors primers de $N$ no són a la llista: són primers nous. (Amb $n = 6$, $N$ no és primer!)',
            },
        ],
    },
    ordenar: {
        tipus: 'absurd',
        bastida: [
            {
                id: 'h1',
                text: 'Suposem el contrari',
                fix: true,
            },
            {
                id: 'h2',
                text: 'Busquem una contradicció',
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
                tex: 'Suposem que només hi ha un nombre finit de primers: $p_1, p_2, \\dots, p_k$.',
                deps: [],
                seccio: 'h1',
            },
            {
                id: 'b',
                tex: 'Considerem $N = p_1 \\cdot p_2 \\cdots p_k + 1$.',
                deps: ['a'],
                seccio: 'h2',
            },
            {
                id: 'c',
                tex: '$N > 1$; per tant, $N$ té algun divisor primer $q$.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'd',
                tex: '$q$ ha de ser un dels primers de la llista, perquè la llista els té tots.',
                deps: ['a', 'c'],
                seccio: 'h2',
            },
            {
                id: 'e',
                tex: 'Però en dividir $N$ per qualsevol $p_i$ de la llista, el residu és $1$: cap no divideix $N$.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'f',
                tex: 'Llavors $q$ divideix $N$ i no divideix $N$. Contradicció.',
                deps: ['d', 'e'],
                seccio: 'h2',
            },
            {
                id: 'g',
                tex: 'Per tant, hi ha infinits nombres primers.',
                deps: ['f'],
                seccio: 'h3',
            },
        ],
        conclusio: 'g',
        trampes: [
            {
                id: 't1',
                tex: '$N$ és primer.',
                motiu: 'No sempre: $2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1 = 30031 = 59 \\cdot 509$.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Hem trobat molts primers i no s’acaben; per tant, n’hi ha infinits.',
                motiu: 'Trobar-ne molts no demostra que n’hi hagi infinits.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Suposem que hi ha infinits primers.',
                motiu: 'A la reducció a l’absurd suposes el contrari del que vols demostrar.',
                nivell: 3,
                seccio: 'h1',
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    escriure: {
        guio: [
            'He suposat que la llista de primers s’acaba.',
            'He construït el nombre $N$.',
            'He explicat per què $N$ té un divisor primer i per què no pot ser de la llista.',
            'He dit on és la contradicció i què queda demostrat.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que cap llista finita de primers pot tenir-los tots.',
        concreta: 'Llista: $2, 3, 5$. Calcula $2 \\cdot 3 \\cdot 5 + 1$. Algun primer de la llista el divideix?',
        figura: {
            pas: 3,
            peu: 'Sempre sobra 1',
        },
        tanca: 'Tot nombre més gran que $1$ té algun divisor primer. On és el de $N$?',
        comprovacio: '$2 \\cdot 3 \\cdot 5 \\cdot 7 + 1 = 211$, i $211$ és primer.',
        iDespres: 'Hi ha infinits primers que acaben en $3$? (És cert, però més difícil.)',
    },
    credit: 'Euclides, Elements, llibre IX, proposició 20.',
});

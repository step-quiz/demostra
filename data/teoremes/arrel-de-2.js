/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: data/teoremes/arrel-de-2.js
 * ROL: Teorema «√2 és irracional»: enunciat, Veure (figura i panells), Ordenar (línies,
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
    id: 'arrel-de-2',
    titol: '$\\sqrt{2}$ és irracional',
    curs: '4ESO',
    bloc: 'nombres',
    enunciat: '$\\sqrt{2}$ no és un nombre racional: no es pot escriure com una fracció d’enters.',
    veure: {
        figura: 'arrel2',
        n: {
            min: 1,
            max: 4,
            inicial: 3,
            etiqueta: 'parella',
        },
        panells: [
            {
                pas: 1,
                text: 'Si fos $\\sqrt{2} = \\dfrac{a}{b}$, tindríem $a^2 = 2b^2$: un quadrat igual a dos quadrats iguals. Aquestes parelles gairebé ho compleixen.',
            },
            {
                pas: 2,
                text: 'Posem els dos quadrats de costat $b$ dins del de costat $a$, a dos racons.',
                provaPrimer: 'Què passa amb la zona on se solapen i amb els racons buits?',
            },
            {
                pas: 3,
                text: 'Si fos $a^2 = 2b^2$, la zona solapada (un quadrat) seria igual als dos racons buits (dos quadrats iguals).',
            },
            {
                pas: 4,
                text: 'Tornaríem a tenir un quadrat igual a dos quadrats, però més petits. I així sempre: amb enters és impossible.',
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
                tex: 'Suposem que $\\sqrt{2} = \\dfrac{p}{q}$, amb $p$ i $q$ enters positius i la fracció irreductible.',
                deps: [],
                seccio: 'h1',
            },
            {
                id: 'b',
                tex: 'Elevem al quadrat: $p^2 = 2q^2$.',
                deps: ['a'],
                seccio: 'h2',
            },
            {
                id: 'c',
                tex: 'Per tant, $p^2$ és parell; llavors $p$ és parell, perquè el quadrat d’un senar és senar.',
                deps: ['b'],
                seccio: 'h2',
            },
            {
                id: 'd',
                tex: 'Escrivim $p = 2k$: $4k^2 = 2q^2$, és a dir, $q^2 = 2k^2$.',
                deps: ['b', 'c'],
                seccio: 'h2',
            },
            {
                id: 'e',
                tex: 'Pel mateix motiu, $q$ és parell.',
                deps: ['d'],
                seccio: 'h2',
            },
            {
                id: 'f',
                tex: '$p$ i $q$ són parells: la fracció $\\dfrac{p}{q}$ es pot simplificar per $2$. Contradicció.',
                deps: ['a', 'c', 'e'],
                seccio: 'h2',
            },
            {
                id: 'g',
                tex: 'Per tant, la suposició és falsa: $\\sqrt{2}$ no és racional.',
                deps: ['f'],
                seccio: 'h3',
            },
        ],
        conclusio: 'g',
        trampes: [
            {
                id: 't1',
                tex: '$\\sqrt{2} = 1{,}41421356\\ldots$ i els decimals no s’acaben mai; per tant, no és racional.',
                motiu: 'Veure molts decimals no demostra que no s’acabin ni que no es repeteixin.',
                nivell: 1,
            },
            {
                id: 't2',
                tex: 'Per tant, $p^2$ és parell; llavors $p^2 = 2$.',
                motiu: 'Que $p^2$ sigui parell no vol dir que valgui $2$.',
                nivell: 1,
            },
            {
                id: 't3',
                tex: 'Com que $p^2$ és parell, $p$ és senar.',
                motiu: 'Si $p$ fos senar, $p^2$ també seria senar.',
                nivell: 3,
            },
            {
                id: 't4',
                tex: 'Suposem que $\\sqrt{2}$ no és racional.',
                motiu: 'A la reducció a l’absurd suposes el contrari del que vols demostrar.',
                nivell: 3,
                seccio: 'h1',
            },
        ],
        ordreModel: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    escriure: {
        guio: [
            'He escrit què suposo (el contrari del que vull demostrar).',
            'He dit que la fracció és irreductible.',
            'He demostrat que $p$ és parell i després que $q$ és parell.',
            'He dit on és la contradicció.',
            'He acabat dient què queda demostrat.',
        ],
    },
    pistes: {
        encarrec: 'Has de veure que no hi ha cap fracció d’enters que, elevada al quadrat, doni $2$.',
        concreta: 'Prova fraccions: $\\left(\\dfrac{7}{5}\\right)^2 = \\dfrac{49}{25}$. És $2$?',
        figura: {
            pas: 3,
            peu: 'Solapat i racons',
        },
        tanca: 'Si $p^2 = 2q^2$, què pots dir de $p$: parell o senar?',
        comprovacio: 'Prova la mateixa demostració amb $\\sqrt{4}$: on falla?',
        iDespres: 'I $\\sqrt{3}$? Què canvia a la demostració?',
    },
    credit: 'Demostració clàssica (escola pitagòrica, Aristòtil); la figura segueix una idea de Stanley Tennenbaum.',
});

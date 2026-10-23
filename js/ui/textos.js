/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/ui/textos.js
 * ROL: Tots els textos de la interfície (no els dels teoremes, que són a
 *      data/teoremes/). Curts: com a molt unes 40 paraules a la vegada. La
 *      retroacció d'Ordenar diu només la primera falta.
 * ARQUITECTURA: Dades (window.DemostraTextos); també es carrega amb Node (tests).
 * DEPENDÈNCIES: cap
 * ============================================================================
 */
(function (arrel, fabrica) {
    'use strict';
    var api = fabrica();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else arrel.DemostraTextos = api;
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';
    return {
        cursos: {
            '2ESO': '2n d’ESO',
            '3ESO': '3r d’ESO',
            '4ESO': '4t d’ESO',
            '1BAT': '1r de batxillerat',
            '2BAT': '2n de batxillerat',
        },
        ordreCursos: ['2ESO', '3ESO', '4ESO', '1BAT', '2BAT'],
        blocs: {
            nombres: 'Nombres',
            algebra: 'Àlgebra',
            geometria: 'Geometria',
            induccio: 'Inducció',
            desigualtats: 'Desigualtats',
            analisi: 'Anàlisi',
        },
        tipus: { directa: 'demostració directa', induccio: 'per inducció', absurd: 'per reducció a l’absurd' },
        tots: 'Tots',
        esglaons: { veure: 'Veure', ordenar: 'Ordenar', escriure: 'Escriure' },
        noTrobat: 'Aquest teorema no existeix.',
        tornaLlista: 'Tots els teoremes',

        // Veure
        anterior: '← Anterior',
        seguent: 'Pas següent →',
        projector: 'Projector',
        surtProjector: 'Surt del projector',
        provaPrimer: 'Prova-ho primer al paper:',
        jaHoHePensat: 'Ja ho he pensat',
        pasDe: (i, n) => `Pas ${i} de ${n}`,
        veureFet: 'Ara prova d’ordenar la demostració.',
        anarAOrdenar: 'Ordena-la →',

        // Ordenar
        nivells: {
            1: 'Nivell 1: les capçaleres ja hi són.',
            2: 'Nivell 2: també has de posar les capçaleres.',
            3: 'Nivell 3: com el 2, amb més peces falses.',
        },
        nivell: n => `Nivell ${n}`,
        instruccioOrdenar: 'Construeix la demostració amb les peces. Compte: algunes peces són falses i sobren.',
        peces: 'Peces',
        laTevaDemo: 'La teva demostració',
        demoBuida: 'Toca una peça i després «Posa-la aquí».',
        posaAqui: 'Posa-la aquí',
        mouAqui: 'Mou-la aquí',
        teclatOrdenar:
            'Teclat: Retorn posa una peça al final o la treu; Espai la tria; ↑ ↓ mouen la peça triada; Esc la deixa.',
        puja: 'Puja',
        baixa: 'Baixa',
        treu: 'Treu',
        fixa: 'fixa',
        comprova: 'Comprova',
        tornaAComencar: 'Torna a començar',
        trampa: 'Aquesta peça és falsa.',
        falta: 'Falta un pas.',
        faltaQuin: 'Falta aquest pas:',
        faltaCapcalera: 'Falta una capçalera:',
        dependencia: 'Aquest pas fa servir una cosa que encara no has dit.',
        dependenciaQuin: 'Fa servir:',
        capcalera: 'Aquesta capçalera no és al seu lloc.',
        seccio: part => `Aquest pas va a la part «${part}».`,
        correcte: 'Demostració completa! Cada pas fa servir només el que ja has dit.',
        altreOrdre: 'Hi ha més d’un ordre bo: el teu també ho és.',
        seguentNivell: 'Prova el nivell següent',
        anarAEscriure: 'Ara escriu-la tu →',

        // Escriure
        instruccioEscriure:
            'Escriu la demostració al paper, amb les teves paraules. Després, revisa-la amb aquesta llista.',
        revisa: 'Revisa la teva demostració',
        mostraModel: 'Mostra la demostració model',
        model: 'Una demostració model',
        modelNota: 'La teva pot ser diferent i estar bé: compara les idees, no les paraules.',
        pistes: 'Pistes',
        demanaPista: 'Necessito una pista',
        sensePistes: 'Ja has vist totes les pistes.',
        nomsPistes: {
            encarrec: 'Què has de fer',
            concreta: 'Prova un cas',
            figura: 'La figura',
            tanca: 'On has de mirar',
            comprovacio: 'Per comprovar-ho',
        },
        iDespres: 'I després?',
        imprimeix: 'Imprimeix',

        senseCodi: 'Aquesta activitat no dona codi: és per practicar.',
    };
});

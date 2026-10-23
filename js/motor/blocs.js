/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/motor/blocs.js
 * ROL: «Ordenar» (Proof Blocks): quines peces té l'alumne a cada nivell, la
 *      barreja inicial i el comprovador d'una demostració.
 * ARQUITECTURA: Pur, sense DOM. La demostració de referència és un graf dirigit
 *      acíclic sobre els ids de les línies: «deps» diu quines línies fa servir
 *      cada línia. Una entrega (llista ordenada d'ids) és correcta si:
 *        1. no hi ha cap trampa;
 *        2. hi és cada línia bona exactament una vegada;
 *        3. les «deps» de cada línia surten abans;
 *        4. (si hi ha bastida) les capçaleres hi són, en ordre, i cada línia és
 *           a la seva part («seccio»).
 *      Qualsevol ordre topològic és bo, no només «ordreModel». Només es retorna
 *      la primera falta, en aquest ordre de prioritat.
 *      Nivells: 1, capçaleres fixes al seu lloc; 2, les capçaleres també són
 *      peces; 3, com el 2 i amb totes les trampes (als nivells 1 i 2, només les
 *      de «nivell: 1»).
 *      La barreja i el moviment amb teclat vénen de pycat/curs/activitats.js
 *      (initParsons), adaptats a dues columnes i a un graf en lloc d'un ordre únic.
 * DEPENDÈNCIES: js/motor/atzar.js (Node: require; navegador: window.Atzar)
 * ============================================================================
 */
(function (arrel, fabrica) {
    'use strict';
    var A = typeof module === 'object' && module.exports ? require('./atzar.js') : arrel.Atzar;
    var api = fabrica(A);
    if (typeof module === 'object' && module.exports) module.exports = api;
    else arrel.Blocs = api;
})(typeof self !== 'undefined' ? self : this, function (Atzar) {
    'use strict';

    var NIVELLS = [1, 2, 3];

    /** Totes les peces del teorema per id: { id, tex, deps, seccio, tipus: 'linia'|'trampa'|'capcalera', motiu, nivell } */
    function mapa(t) {
        var o = t.ordenar,
            m = {};
        (o.bastida || []).forEach(function (h) {
            m[h.id] = { id: h.id, tex: h.text, deps: [], tipus: 'capcalera' };
        });
        o.linies.forEach(function (l) {
            m[l.id] = { id: l.id, tex: l.tex, deps: l.deps || [], seccio: l.seccio || null, tipus: 'linia' };
        });
        (o.trampes || []).forEach(function (l) {
            m[l.id] = {
                id: l.id,
                tex: l.tex,
                deps: [],
                tipus: 'trampa',
                motiu: l.motiu,
                nivell: l.nivell || 1,
                seccio: l.seccio || null,
            };
        });
        return m;
    }

    var capcaleres = function (t) {
        return (t.ordenar.bastida || []).map(function (h) {
            return h.id;
        });
    };
    var trampesDelNivell = function (t, nivell) {
        return (t.ordenar.trampes || [])
            .filter(function (l) {
                return nivell >= 3 || (l.nivell || 1) === 1;
            })
            .map(function (l) {
                return l.id;
            });
    };
    var linies = function (t) {
        return t.ordenar.linies.map(function (l) {
            return l.id;
        });
    };

    /** Les capçaleres fixes a l'inici (nivell 1) o res. */
    function inicial(t, nivell) {
        return nivell === 1 ? capcaleres(t) : [];
    }

    /** Ordre de les deps: cada línia després de les que fa servir. */
    function respectaDeps(t, ids) {
        var m = mapa(t),
            vist = {};
        for (var i = 0; i < ids.length; i++) {
            var l = m[ids[i]];
            if (
                l &&
                l.tipus === 'linia' &&
                !l.deps.every(function (d) {
                    return vist[d];
                })
            )
                return false;
            vist[ids[i]] = true;
        }
        return true;
    }

    /**
     * Les peces (columna «Peces») en un ordre a l'atzar amb llavor: les línies bones,
     * les trampes del nivell i, als nivells 2 i 3, les capçaleres. Les línies bones
     * no surten mai en un ordre que ja sigui vàlid.
     */
    function barreja(t, nivell, llavor) {
        var at = Atzar.crea(llavor + '|' + t.id + '|' + nivell);
        var peces = linies(t).concat(trampesDelNivell(t, nivell));
        if (nivell >= 2) peces = peces.concat(capcaleres(t));
        var m = mapa(t);
        var out = peces;
        for (var intent = 0; intent < 50; intent++) {
            out = at.barreja(peces);
            var bones = out.filter(function (id) {
                return m[id].tipus === 'linia';
            });
            if (!respectaDeps(t, bones)) break;
        }
        return out;
    }

    /**
     * Comprova una entrega.
     * @returns {{ ok: boolean, error: null | { tipus: 'trampa'|'falta'|'dependencia'|'capcalera'|'seccio',
     *            linia: string, dep?: string, seccio?: string } }}
     */
    function valida(t, nivell, entrega) {
        var m = mapa(t);
        var err = function (e) {
            return { ok: false, error: e };
        };
        // 1. Trampes
        for (var i = 0; i < entrega.length; i++)
            if (m[entrega[i]] && m[entrega[i]].tipus === 'trampa') return err({ tipus: 'trampa', linia: entrega[i] });
        // 2. Falta alguna línia (o capçalera)
        var hi = {};
        entrega.forEach(function (id) {
            hi[id] = (hi[id] || 0) + 1;
        });
        var model = t.ordenar.ordreModel;
        var caps = capcaleres(t);
        for (var j = 0; j < caps.length; j++) if (!hi[caps[j]]) return err({ tipus: 'falta', linia: caps[j] });
        for (var k = 0; k < model.length; k++) if (!hi[model[k]]) return err({ tipus: 'falta', linia: model[k] });
        // 3. Dependències
        var vist = {};
        for (var p = 0; p < entrega.length; p++) {
            var l = m[entrega[p]];
            if (l && l.tipus === 'linia') {
                for (var q = 0; q < l.deps.length; q++)
                    if (!vist[l.deps[q]]) return err({ tipus: 'dependencia', linia: l.id, dep: l.deps[q] });
            }
            vist[entrega[p]] = true;
        }
        // 4. Capçaleres en ordre i cada línia a la seva part
        if (caps.length) {
            var pos = caps.map(function (h) {
                return entrega.indexOf(h);
            });
            for (var c = 1; c < pos.length; c++)
                if (pos[c] < pos[c - 1]) return err({ tipus: 'capcalera', linia: caps[c] });
            var seccioActual = null;
            for (var r = 0; r < entrega.length; r++) {
                var x = m[entrega[r]];
                if (!x) continue;
                if (x.tipus === 'capcalera') seccioActual = x.id;
                else if (x.tipus === 'linia' && x.seccio && x.seccio !== seccioActual)
                    return err({ tipus: 'seccio', linia: x.id, seccio: x.seccio });
            }
        }
        return { ok: true, error: null };
    }

    /** La demostració model: ordreModel amb les capçaleres davant de la seva primera línia. */
    function model(t) {
        var m = mapa(t),
            out = [],
            posades = {};
        t.ordenar.ordreModel.forEach(function (id) {
            var s = m[id].seccio;
            if (s && !posades[s]) {
                // les capçaleres anteriors que encara no hi són (en ordre)
                capcaleres(t).some(function (h) {
                    if (!posades[h]) {
                        out.push(h);
                        posades[h] = true;
                    }
                    return h === s;
                });
            }
            out.push(id);
        });
        capcaleres(t).forEach(function (h) {
            if (!posades[h]) out.push(h);
        });
        return out;
    }

    return {
        NIVELLS: NIVELLS,
        mapa: mapa,
        capcaleres: capcaleres,
        trampesDelNivell: trampesDelNivell,
        inicial: inicial,
        respectaDeps: respectaDeps,
        barreja: barreja,
        valida: valida,
        model: model,
    };
});

/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/ui/comu.js
 * ROL: El que fan servir les dues pàgines: escriure un text amb fórmules dins
 *      d'un element (KaTeX) i el progrés desat al navegador.
 * ARQUITECTURA: Script clàssic (window.Comu).
 *      - Les fórmules es dibuixen amb katex.render (crea el DOM i posa els
 *        estils amb CSSOM), no amb renderToString + innerHTML: així la CSP pot
 *        prohibir els atributs style en línia.
 *      - Progrés: localStorage «demostra:v1:fet» = { id: { veure, ordenar
 *        (nivell més alt fet), escriure } }, sempre dins de try/catch.
 * DEPENDÈNCIES: vendor/katex-0.16.11/katex.min.js (window.katex), js/motor/text.js
 * ============================================================================
 */
(function () {
    'use strict';
    var Tx = window.TextDemo;
    var CLAU = 'demostra:v1:fet';

    /** Posa el text s (amb fórmules entre $…$) dins de l'element el. */
    function posa(el, s) {
        el.textContent = '';
        var trossos;
        try {
            trossos = Tx.trossos(String(s));
        } catch (e) {
            el.textContent = s;
            return el;
        }
        trossos.forEach(function (t) {
            if (t.tipus === 'text') el.appendChild(document.createTextNode(t.v));
            else {
                var sp = document.createElement('span');
                sp.className = 'formula';
                try {
                    window.katex.render(t.v, sp, { throwOnError: false });
                } catch (e) {
                    sp.textContent = t.v;
                }
                el.appendChild(sp);
            }
        });
        return el;
    }
    /** Un element nou amb el text (i fórmules). */
    function element(etiqueta, s, classe) {
        var el = document.createElement(etiqueta);
        if (classe) el.className = classe;
        return posa(el, s);
    }

    function progres() {
        try {
            var p = JSON.parse(localStorage.getItem(CLAU) || '{}');
            return p && typeof p === 'object' ? p : {};
        } catch (e) {
            return {};
        }
    }
    /** Marca un esglaó fet: marca('senars', 'ordenar', 2). */
    function marca(id, esglao, valor) {
        var p = progres();
        p[id] = p[id] || {};
        if (esglao === 'ordenar') p[id].ordenar = Math.max(p[id].ordenar || 0, valor || 1);
        else p[id][esglao] = true;
        try {
            localStorage.setItem(CLAU, JSON.stringify(p));
        } catch (e) {
            /* sense emmagatzematge: es treballa igual */
        }
    }

    window.Comu = { posa: posa, element: element, progres: progres, marca: marca, pla: Tx.pla };
})();

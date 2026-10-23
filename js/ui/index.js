/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/ui/index.js
 * ROL: La llista de teoremes (index.html), agrupats per curs, amb un filtre per
 *      curs i els esglaons fets (Veure, Ordenar, Escriure) de cada teorema.
 * ARQUITECTURA: Script clàssic. El filtre va a l'adreça (index.html#3ESO).
 * DEPENDÈNCIES: window.DEMOSTRA (data/teoremes/*.js), DemostraTextos, Comu
 * ============================================================================
 */
(function () {
    'use strict';
    var T = window.DemostraTextos,
        C = window.Comu,
        TEOREMES = window.DEMOSTRA || [];
    var $ = function (id) {
        return document.getElementById(id);
    };

    function filtre() {
        var h = location.hash.replace('#', '');
        return T.ordreCursos.indexOf(h) >= 0 ? h : '';
    }
    function pintaFiltres() {
        var f = filtre();
        var cont = $('filtres');
        cont.innerHTML = '';
        [''].concat(T.ordreCursos).forEach(function (c) {
            if (
                c &&
                !TEOREMES.some(function (t) {
                    return t.curs === c;
                })
            )
                return;
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn btn-petit';
            b.textContent = c ? T.cursos[c] : T.tots;
            b.setAttribute('aria-pressed', String(c === f));
            b.addEventListener('click', function () {
                try {
                    history.replaceState(null, '', c ? '#' + c : location.pathname + location.search);
                } catch (e) {
                    /* res */
                }
                pinta();
            });
            cont.appendChild(b);
        });
    }
    function targeta(t, prog) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'targeta';
        a.href = 'teorema.html?id=' + encodeURIComponent(t.id);
        a.appendChild(C.element('span', T.blocs[t.bloc] + ' · ' + T.tipus[t.ordenar.tipus], 'etiqueta'));
        a.appendChild(C.element('h3', t.titol));
        a.appendChild(C.element('p', t.enunciat, 'enunciat-petit'));
        var es = document.createElement('span');
        es.className = 'esglaons';
        ['veure', 'ordenar', 'escriure'].forEach(function (k) {
            var fet = prog && prog[k];
            var s = document.createElement('span');
            s.className = 'esglao' + (fet ? ' fet' : '');
            s.textContent = T.esglaons[k] + (fet ? ' ✓' : '') + (k === 'ordenar' && fet ? ' N' + prog.ordenar : '');
            es.appendChild(s);
        });
        a.appendChild(es);
        li.appendChild(a);
        return li;
    }
    function pinta() {
        pintaFiltres();
        var f = filtre(),
            prog = C.progres();
        var cont = $('llista');
        cont.innerHTML = '';
        T.ordreCursos.forEach(function (c) {
            if (f && c !== f) return;
            var aquests = TEOREMES.filter(function (t) {
                return t.curs === c;
            });
            if (!aquests.length) return;
            var sec = document.createElement('section');
            sec.className = 'curs';
            var h2 = document.createElement('h2');
            h2.textContent = T.cursos[c];
            sec.appendChild(h2);
            var ul = document.createElement('ul');
            ul.className = 'targetes';
            aquests.forEach(function (t) {
                ul.appendChild(targeta(t, prog[t.id]));
            });
            sec.appendChild(ul);
            cont.appendChild(sec);
        });
    }
    $('sense-codi').textContent = T.senseCodi;
    window.addEventListener('hashchange', pinta);
    pinta();
})();

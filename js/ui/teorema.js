/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/ui/teorema.js
 * ROL: La pàgina d'un teorema (teorema.html?id=…#veure|ordenar|escriure): les
 *      pestanyes dels tres esglaons, «Veure» (figura amb control i panells que
 *      es revelen un a un, «Prova-ho primer al paper», mode projector) i
 *      «Escriure» (guió per revisar, demostració model i pistes una a una).
 *      «Ordenar» és a js/ui/ordenar.js.
 * ARQUITECTURA: Script clàssic. Adreça: ?id=… (obligatori), #veure / #ordenar /
 *      #escriure (pestanya), ?projector=1 (Veure en gran), ?nivell=1|2|3.
 *      Pistes: l'escala de geom (js/ui/detall.js: es revela un nivell cada
 *      vegada), copiada i simplificada; el nombre de pistes obertes es desa per
 *      teorema a localStorage («demostra:v1:pistes»), dins de try/catch.
 * DEPENDÈNCIES: DEMOSTRA, Blocs, Figures, DemostraTextos, Comu, Ordenar
 * ============================================================================
 */
(function () {
    'use strict';
    var B = window.Blocs,
        F = window.Figures,
        T = window.DemostraTextos,
        C = window.Comu,
        TEOREMES = window.DEMOSTRA || [];
    var $ = function (id) {
        return document.getElementById(id);
    };
    var ESGLAONS = ['veure', 'ordenar', 'escriure'];
    var CLAU_PISTES = 'demostra:v1:pistes';

    var q;
    try {
        q = new URLSearchParams(location.search);
    } catch (e) {
        q = new URLSearchParams('');
    }
    var t = TEOREMES.filter(function (x) {
        return x.id === q.get('id');
    })[0];
    if (!t) {
        $('principal').innerHTML = '';
        var p = document.createElement('p');
        p.className = 'panell';
        p.textContent = T.noTrobat + ' ';
        var a = document.createElement('a');
        a.href = 'index.html';
        a.textContent = T.tornaLlista;
        p.appendChild(a);
        $('principal').appendChild(p);
        return;
    }

    // ── Capçalera ──────────────────────────────────────────────────────────
    document.title = C.pla(t.titol) + ' · Demostra-ho';
    $('etiqueta').textContent = T.cursos[t.curs] + ' · ' + T.blocs[t.bloc] + ' · ' + T.tipus[t.ordenar.tipus];
    C.posa($('titol'), t.titol);
    C.posa($('enunciat'), t.enunciat);
    $('sense-codi').textContent = T.senseCodi;

    // ── Pestanyes ──────────────────────────────────────────────────────────
    function esglaoActual() {
        var h = location.hash.replace('#', '');
        return ESGLAONS.indexOf(h) >= 0 ? h : 'veure';
    }
    function pintaPestanyes() {
        var e = esglaoActual(),
            prog = C.progres()[t.id] || {};
        ESGLAONS.forEach(function (k, i) {
            var b = $('tab-' + k);
            b.setAttribute('aria-selected', String(k === e));
            b.tabIndex = k === e ? 0 : -1;
            b.textContent = i + 1 + '. ' + T.esglaons[k] + (prog[k] ? ' ✓' : '');
            $(k).hidden = k !== e;
        });
    }
    document.querySelectorAll('.pestanya').forEach(function (b) {
        b.addEventListener('click', function () {
            location.hash = b.getAttribute('data-esglao');
        });
        b.addEventListener('keydown', function (ev) {
            var d = { ArrowRight: 1, ArrowLeft: -1 }[ev.key];
            if (!d) return;
            var i = ESGLAONS.indexOf(b.getAttribute('data-esglao'));
            var j = (i + d + ESGLAONS.length) % ESGLAONS.length;
            location.hash = ESGLAONS[j];
            $('tab-' + ESGLAONS[j]).focus();
        });
    });
    window.addEventListener('hashchange', pintaPestanyes);

    // ── Veure ──────────────────────────────────────────────────────────────
    var v = t.veure,
        nPanells = v.panells.length;
    var vs = { n: v.n.inicial, pas: 1, pensat: {} };
    $('n').min = v.n.min;
    $('n').max = v.n.max;
    $('n').value = v.n.inicial;
    $('etiqueta-n').textContent = v.n.etiqueta;
    C.posa($('credit'), t.credit);
    $('btn-anterior').textContent = T.anterior;
    $('btn-seguent').textContent = T.seguent;
    $('btn-pensat').textContent = T.jaHoHePensat;
    $('prova-primer-titol').textContent = T.provaPrimer;

    function pintaVeure() {
        $('figura').innerHTML = F.figura(v.figura, vs.n, vs.pas);
        $('n-valor').textContent = vs.n;
        $('pas-de').textContent = T.pasDe(vs.pas, nPanells);
        var ol = $('panells');
        ol.innerHTML = '';
        for (var i = 0; i < vs.pas; i++) {
            var li = C.element('li', v.panells[i].text, i === vs.pas - 1 ? 'actual' : '');
            ol.appendChild(li);
        }
        // «Prova-ho primer al paper» abans del pas següent
        var seg = v.panells[vs.pas];
        var pregunta = seg && seg.provaPrimer && !vs.pensat[vs.pas];
        $('prova-primer').hidden = !pregunta;
        if (pregunta) C.posa($('prova-primer-text'), seg.provaPrimer);
        $('btn-anterior').disabled = vs.pas <= 1;
        $('btn-seguent').disabled = vs.pas >= nPanells || pregunta;
        var acc = $('accions-veure');
        acc.innerHTML = '';
        if (vs.pas >= nPanells) {
            C.marca(t.id, 'veure');
            pintaPestanyes();
            var p = document.createElement('p');
            p.className = 'nota';
            p.textContent = T.veureFet;
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn';
            b.textContent = T.anarAOrdenar;
            b.addEventListener('click', function () {
                if (document.body.classList.contains('projector')) projector(false);
                location.hash = 'ordenar';
            });
            acc.appendChild(p);
            acc.appendChild(b);
        }
    }
    $('n').addEventListener('input', function () {
        vs.n = Number($('n').value);
        pintaVeure();
    });
    $('btn-seguent').addEventListener('click', function () {
        if (vs.pas < nPanells) vs.pas++;
        pintaVeure();
    });
    $('btn-anterior').addEventListener('click', function () {
        if (vs.pas > 1) vs.pas--;
        pintaVeure();
    });
    $('btn-pensat').addEventListener('click', function () {
        vs.pensat[vs.pas] = true;
        vs.pas++;
        pintaVeure();
        $('btn-seguent').focus();
    });
    function projector(on) {
        document.body.classList.toggle('projector', on);
        $('btn-projector').setAttribute('aria-pressed', String(on));
        $('btn-projector').textContent = on ? T.surtProjector : T.projector;
    }
    $('btn-projector').addEventListener('click', function () {
        projector(!document.body.classList.contains('projector'));
    });
    document.addEventListener('keydown', function (ev) {
        // Al projector, les fletxes passen els panells (si el focus no és en un control)
        if (!document.body.classList.contains('projector') || /INPUT|SELECT|TEXTAREA/.test(ev.target.tagName)) return;
        if (ev.key === 'ArrowRight' && !$('btn-seguent').disabled) $('btn-seguent').click();
        else if (ev.key === 'ArrowLeft' && !$('btn-anterior').disabled) $('btn-anterior').click();
        else if (ev.key === 'Escape') projector(false);
    });
    projector(q.get('projector') === '1');

    // ── Ordenar ────────────────────────────────────────────────────────────
    var nivell = Number(q.get('nivell'));
    window.Ordenar.munta(t, {
        nivell: B.NIVELLS.indexOf(nivell) >= 0 ? nivell : 1,
        quanFet: function (n) {
            C.marca(t.id, 'ordenar', n);
            pintaPestanyes();
        },
    });

    // ── Escriure ───────────────────────────────────────────────────────────
    $('instr-escriure').textContent = T.instruccioEscriure;
    $('t-revisa').textContent = T.revisa;
    $('btn-model').textContent = T.mostraModel;
    $('btn-imprimeix').textContent = T.imprimeix;
    $('t-model').textContent = T.model;
    $('model-nota').textContent = T.modelNota;
    $('t-pistes').textContent = T.pistes;
    $('btn-pista').textContent = T.demanaPista;
    t.escriure.guio.forEach(function (g, i) {
        var li = document.createElement('li');
        var l = document.createElement('label');
        var c = document.createElement('input');
        c.type = 'checkbox';
        c.id = 'guio-' + i;
        l.appendChild(c);
        l.appendChild(C.element('span', g));
        li.appendChild(l);
        $('guio').appendChild(li);
    });
    var mapa = B.mapa(t);
    $('btn-model').addEventListener('click', function () {
        // Una llista numerada per a cada part (les capçaleres no es numeren)
        var cont = $('model'),
            ol = null,
            num = 0;
        cont.innerHTML = '';
        B.model(t).forEach(function (id) {
            var l = mapa[id];
            if (l.tipus === 'capcalera') {
                cont.appendChild(C.element('p', l.tex, 'cap-model'));
                ol = null;
                return;
            }
            if (!ol) {
                ol = cont.appendChild(document.createElement('ol'));
                ol.start = num + 1; // la numeració continua d'una part a l'altra
            }
            ol.appendChild(C.element('li', l.tex));
            num++;
        });
        C.posa($('i-despres'), T.iDespres + ' ' + t.pistes.iDespres);
        $('zona-model').hidden = false;
        $('btn-model').hidden = true;
        C.marca(t.id, 'escriure');
        pintaPestanyes();
        $('t-model').tabIndex = -1;
        $('t-model').focus();
    });
    $('btn-imprimeix').addEventListener('click', function () {
        window.print();
    });

    // Pistes: una cada vegada (encàrrec, cas concret, figura, on mirar, comprovació)
    var ORDRE_PISTES = ['encarrec', 'concreta', 'figura', 'tanca', 'comprovacio'];
    function pistesObertes() {
        try {
            var p = JSON.parse(localStorage.getItem(CLAU_PISTES) || '{}') || {};
            return Math.min(ORDRE_PISTES.length, Number(p[t.id]) || 0);
        } catch (e) {
            return 0;
        }
    }
    function desaPistes(n) {
        try {
            var p = JSON.parse(localStorage.getItem(CLAU_PISTES) || '{}') || {};
            p[t.id] = n;
            localStorage.setItem(CLAU_PISTES, JSON.stringify(p));
        } catch (e) {
            /* res */
        }
    }
    var obertes = pistesObertes();
    function pintaPistes() {
        var ul = $('pistes');
        ul.innerHTML = '';
        ORDRE_PISTES.slice(0, obertes).forEach(function (k) {
            var li = document.createElement('li');
            var nom = document.createElement('span');
            nom.className = 'nom-pista';
            nom.textContent = T.nomsPistes[k] + ':';
            li.appendChild(nom);
            if (k === 'figura') {
                li.appendChild(C.element('span', t.pistes.figura.peu));
                var d = document.createElement('div');
                d.innerHTML = F.figura(v.figura, v.n.inicial, t.pistes.figura.pas);
                li.appendChild(d);
            } else li.appendChild(C.element('span', t.pistes[k]));
            ul.appendChild(li);
        });
        var b = $('btn-pista');
        b.disabled = obertes >= ORDRE_PISTES.length;
        b.textContent = b.disabled ? T.sensePistes : T.demanaPista;
    }
    $('btn-pista').addEventListener('click', function () {
        if (obertes < ORDRE_PISTES.length) obertes++;
        desaPistes(obertes);
        pintaPistes();
    });

    // ── Inici ──────────────────────────────────────────────────────────────
    pintaPestanyes();
    pintaVeure();
    pintaPistes();
})();

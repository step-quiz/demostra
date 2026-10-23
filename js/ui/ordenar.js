/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/ui/ordenar.js
 * ROL: L'esglaó «Ordenar» (Proof Blocks) de teorema.html: dues columnes,
 *      «Peces» i «La teva demostració», i el botó «Comprova».
 * ARQUITECTURA: Script clàssic (window.Ordenar.munta(t, { quanFet })). La
 *      lògica (peces, barreja, comprovador) és a js/motor/blocs.js.
 *      Origen: el patró de pycat/curs/activitats.js (initParsons: barreja amb
 *      llavor que no surt ja resolta, botons ↑ ↓, arrossegar), refet per a dues
 *      columnes i per a un graf de dependències.
 *      Tres maneres de moure les peces:
 *        - tocar i tocar: toca una peça i després «Posa-la aquí»;
 *        - arrossegar: amb el ratolí, des de qualsevol punt de la peça; amb el
 *          dit, des de la nansa ⠿ (així la resta de la peça deixa desplaçar la pàgina);
 *        - teclat: Retorn posa una peça al final o la treu; Espai la tria; ↑ ↓
 *          mouen la peça triada; Esc la deixa.
 *      Retroacció: només la primera falta; el detall (quin pas falta, quin pas
 *      es fa servir abans d'hora) la segona vegada que surt aquell tipus de falta.
 * DEPENDÈNCIES: Blocs, DemostraTextos, Comu
 * ============================================================================
 */
(function () {
    'use strict';
    var B = window.Blocs,
        T = window.DemostraTextos,
        C = window.Comu;
    var $ = function (id) {
        return document.getElementById(id);
    };

    var st = null,
        quanFet = function () {};

    function munta(t, opcions) {
        quanFet = (opcions && opcions.quanFet) || quanFet;
        st = { t: t, mapa: B.mapa(t), nivell: (opcions && opcions.nivell) || 1, tanda: 0 };
        $('t-peces').textContent = T.peces;
        $('t-demo').textContent = T.laTevaDemo;
        $('instr-ordenar').textContent = T.instruccioOrdenar;
        $('teclat-ordenar').textContent = T.teclatOrdenar;
        comenca();
    }
    function comenca() {
        st.peces = B.barreja(st.t, st.nivell, 'demostra|' + st.tanda);
        st.demo = B.inicial(st.t, st.nivell);
        st.fixes = {};
        st.demo.forEach(function (id) {
            st.fixes[id] = true;
        });
        st.triat = null;
        st.errors = {}; // per tipus d'error: el detall, a partir del segon cop
        st.marcada = null;
        st.acabat = false;
        $('feedback').innerHTML = '';
        pintaNivells();
        pinta();
    }

    // ── Nivells ────────────────────────────────────────────────────────────
    function pintaNivells() {
        var cont = $('nivells');
        cont.innerHTML = '';
        B.NIVELLS.forEach(function (n) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn btn-petit';
            b.textContent = T.nivell(n);
            b.setAttribute('aria-pressed', String(n === st.nivell));
            b.addEventListener('click', function () {
                st.nivell = n;
                comenca();
            });
            cont.appendChild(b);
        });
        var senseBastida = !(st.t.ordenar.bastida || []).length;
        $('nivell-desc').textContent = senseBastida && st.nivell < 3 ? '' : T.nivells[st.nivell];
    }

    // ── Pintar ─────────────────────────────────────────────────────────────
    var focusDespres = null; // { llista, id }
    function bloc(id, llista, idx) {
        var l = st.mapa[id];
        var li = document.createElement('li');
        var fix = llista === 'demo' && st.fixes[id];
        li.className = 'bloc' + (l.tipus === 'capcalera' ? ' bloc-cap' : '') + (fix ? ' fix' : '');
        if (st.triat && st.triat.id === id) li.className += ' triat';
        if (st.marcada === id) li.className += ' malament';
        li.setAttribute('data-id', id);
        li.setAttribute('data-llista', llista);
        if (!fix && !st.acabat) {
            li.tabIndex = 0;
            var nansa = document.createElement('span');
            nansa.className = 'nansa-bloc';
            nansa.setAttribute('aria-hidden', 'true');
            nansa.textContent = '⠿';
            li.appendChild(nansa);
        }
        li.appendChild(C.element('span', l.tex, 'text-bloc'));
        var etiqueta =
            C.pla(l.tex) + (fix ? ' (' + T.fixa + ')' : '') + (st.triat && st.triat.id === id ? ', triada' : '');
        li.setAttribute('aria-label', etiqueta);
        if (llista === 'demo' && !fix && !st.acabat) {
            var bs = document.createElement('span');
            bs.className = 'botons';
            [
                [
                    '↑',
                    T.puja,
                    function () {
                        mou(id, -1);
                    },
                ],
                [
                    '↓',
                    T.baixa,
                    function () {
                        mou(id, 1);
                    },
                ],
                [
                    '✕',
                    T.treu,
                    function () {
                        treu(id);
                    },
                ],
            ].forEach(function (d) {
                var b = document.createElement('button');
                b.type = 'button';
                b.textContent = d[0];
                b.title = d[1];
                b.setAttribute('aria-label', d[1] + ': ' + C.pla(l.tex));
                b.tabIndex = -1; // amb teclat: ↑ ↓ i Retorn sobre la peça
                b.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    d[2]();
                });
                bs.appendChild(b);
            });
            li.appendChild(bs);
        }
        return li;
    }
    function forat(idx) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'forat';
        b.setAttribute('data-idx', idx);
        b.textContent = st.triat.de === 'demo' ? T.mouAqui : T.posaAqui;
        b.addEventListener('click', function () {
            posa(st.triat.id, idx);
        });
        li.appendChild(b);
        return li;
    }
    function pinta() {
        var peces = $('peces'),
            demo = $('demo');
        peces.innerHTML = '';
        demo.innerHTML = '';
        st.peces.forEach(function (id, i) {
            peces.appendChild(bloc(id, 'peces', i));
        });
        var posaForat = function (i) {
            if (!st.triat || st.acabat) return false;
            if (st.triat.de === 'demo') {
                var j = st.demo.indexOf(st.triat.id);
                if (i === j || i === j + 1) return false;
            }
            return true;
        };
        st.demo.forEach(function (id, i) {
            if (posaForat(i)) demo.appendChild(forat(i));
            demo.appendChild(bloc(id, 'demo', i));
        });
        if (posaForat(st.demo.length)) demo.appendChild(forat(st.demo.length));
        if (!st.demo.length && !st.triat) {
            var li = document.createElement('li');
            li.className = 'nota';
            li.textContent = T.demoBuida;
            demo.appendChild(li);
        }
        $('col-demo').classList.toggle('demo-acabada', st.acabat);
        $('qed').hidden = !st.acabat;
        pintaAccions();
        if (focusDespres) {
            var el = document.querySelector('#' + focusDespres.llista + ' [data-id="' + focusDespres.id + '"]');
            if (!el && focusDespres.alternativa) el = document.querySelector('#' + focusDespres.alternativa);
            if (el) el.focus();
            focusDespres = null;
        }
    }
    function pintaAccions() {
        var cont = $('accions-ordenar');
        cont.innerHTML = '';
        var boto = function (text, f, principal) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn' + (principal ? ' btn-principal' : '');
            b.textContent = text;
            b.addEventListener('click', f);
            cont.appendChild(b);
            return b;
        };
        if (!st.acabat) {
            boto(T.comprova, comprova, true);
            boto(T.tornaAComencar, function () {
                st.tanda++;
                comenca();
            });
        } else {
            if (st.nivell < 3)
                boto(
                    T.seguentNivell,
                    function () {
                        st.nivell++;
                        comenca();
                    },
                    true
                );
            boto(
                T.anarAEscriure,
                function () {
                    location.hash = 'escriure';
                },
                st.nivell >= 3
            );
            boto(T.tornaAComencar, function () {
                st.tanda++;
                comenca();
            });
        }
    }

    // ── Accions ────────────────────────────────────────────────────────────
    function canviat() {
        st.marcada = null;
        if ($('feedback').querySelector('.fb-error, .fb-info')) $('feedback').innerHTML = '';
    }
    function posa(id, idx) {
        if (st.acabat) return;
        var de = st.peces.indexOf(id) >= 0 ? 'peces' : 'demo';
        if (de === 'peces') st.peces.splice(st.peces.indexOf(id), 1);
        else {
            var vell = st.demo.indexOf(id);
            if (st.fixes[id]) return;
            st.demo.splice(vell, 1);
            if (vell < idx) idx--;
        }
        st.demo.splice(Math.max(0, Math.min(idx, st.demo.length)), 0, id);
        st.triat = null;
        canviat();
        focusDespres = { llista: 'demo', id: id };
        pinta();
    }
    function treu(id) {
        if (st.acabat || st.fixes[id]) return;
        var i = st.demo.indexOf(id);
        if (i < 0) return;
        st.demo.splice(i, 1);
        st.peces.push(id);
        st.triat = null;
        canviat();
        var seguent = st.demo[i] || st.demo[i - 1];
        focusDespres = seguent && !st.fixes[seguent] ? { llista: 'demo', id: seguent } : { llista: 'peces', id: id };
        pinta();
    }
    function mou(id, d) {
        if (st.acabat || st.fixes[id]) return;
        var i = st.demo.indexOf(id),
            j = i + d;
        if (i < 0 || j < 0 || j >= st.demo.length) return;
        st.demo[i] = st.demo[j];
        st.demo[j] = id;
        canviat();
        focusDespres = { llista: 'demo', id: id };
        pinta();
    }
    function tria(id, de) {
        if (st.acabat) return;
        st.triat = st.triat && st.triat.id === id ? null : { id: id, de: de };
        focusDespres = { llista: de, id: id };
        pinta();
    }

    // ── Comprova ───────────────────────────────────────────────────────────
    function missatge(parts, tipus) {
        var p = document.createElement('p');
        p.className = 'fb fb-' + tipus;
        parts.forEach(function (s, i) {
            if (i) p.appendChild(document.createTextNode(' '));
            p.appendChild(C.element('span', s));
        });
        $('feedback').appendChild(p);
    }
    function comprova() {
        st.triat = null;
        $('feedback').innerHTML = '';
        var r = B.valida(st.t, st.nivell, st.demo);
        if (r.ok) {
            st.acabat = true;
            st.marcada = null;
            missatge([T.correcte], 'be');
            if (st.demo.join() !== B.model(st.t).join()) missatge([T.altreOrdre], 'info');
            quanFet(st.nivell);
            pinta();
            return;
        }
        var e = r.error,
            segon = (st.errors[e.tipus] || 0) > 0,
            m = st.mapa;
        st.marcada = e.linia;
        if (e.tipus === 'trampa') missatge([T.trampa, m[e.linia].motiu], 'error');
        else if (e.tipus === 'falta') {
            st.marcada = null;
            if (m[e.linia].tipus === 'capcalera') missatge([T.faltaCapcalera, '«' + m[e.linia].tex + '»'], 'error');
            else missatge(segon ? [T.faltaQuin, '«' + m[e.linia].tex + '»'] : [T.falta], 'error');
        } else if (e.tipus === 'dependencia')
            missatge(segon ? [T.dependencia, T.dependenciaQuin, '«' + m[e.dep].tex + '»'] : [T.dependencia], 'error');
        else if (e.tipus === 'capcalera') missatge([T.capcalera], 'error');
        else if (e.tipus === 'seccio') missatge([T.seccio(m[e.seccio].tex)], 'error');
        st.errors[e.tipus] = (st.errors[e.tipus] || 0) + 1;
        pinta();
    }

    // ── Teclat ─────────────────────────────────────────────────────────────
    document.addEventListener('keydown', function (ev) {
        if (!st) return;
        var li = ev.target.closest && ev.target.closest('.bloc');
        if (ev.key === 'Escape' && st.triat) {
            var t = st.triat;
            st.triat = null;
            focusDespres = { llista: t.de, id: t.id };
            pinta();
            return;
        }
        if (!li || ev.target !== li) return;
        var id = li.getAttribute('data-id'),
            de = li.getAttribute('data-llista');
        if (ev.key === 'Enter') {
            ev.preventDefault();
            if (de === 'peces') {
                var i = st.peces.indexOf(id);
                var seguent = st.peces[i + 1] || st.peces[i - 1];
                posa(id, st.demo.length);
                if (seguent) {
                    focusDespres = { llista: 'peces', id: seguent };
                    pinta();
                }
            } else treu(id);
        } else if (ev.key === ' ') {
            ev.preventDefault();
            tria(id, de);
        } else if (
            (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') &&
            de === 'demo' &&
            st.triat &&
            st.triat.id === id
        ) {
            ev.preventDefault();
            mou(id, ev.key === 'ArrowUp' ? -1 : 1);
            st.triat = { id: id, de: 'demo' };
            focusDespres = { llista: 'demo', id: id };
            pinta();
        }
    });

    // ── Tocar i arrossegar ─────────────────────────────────────────────────
    var arr = null,
        acabaDArrossegar = false;
    document.addEventListener('pointerdown', function (ev) {
        if (!st || st.acabat || ev.button > 0) return;
        if (ev.target.closest('.botons')) return;
        var li = ev.target.closest('.bloc[data-id]');
        if (!li || li.classList.contains('fix')) return;
        var desDeNansa = !!ev.target.closest('.nansa-bloc');
        if (ev.pointerType !== 'mouse' && !desDeNansa) return; // amb el dit, només des de la nansa
        arr = {
            id: li.getAttribute('data-id'),
            de: li.getAttribute('data-llista'),
            x: ev.clientX,
            y: ev.clientY,
            li: li,
            actiu: false,
            pointerId: ev.pointerId,
        };
        if (desDeNansa) ev.preventDefault();
    });
    document.addEventListener('pointermove', function (ev) {
        if (!arr || ev.pointerId !== arr.pointerId) return;
        if (!arr.actiu) {
            if (Math.hypot(ev.clientX - arr.x, ev.clientY - arr.y) < 6) return;
            arr.actiu = true;
            var f = $('fantasma');
            f.innerHTML = '';
            f.appendChild(C.element('span', st.mapa[arr.id].tex, 'text-bloc'));
            f.style.width = arr.li.getBoundingClientRect().width + 'px';
            f.hidden = false;
            arr.li.classList.add('arrossegant');
        }
        ev.preventDefault();
        var f2 = $('fantasma');
        f2.style.left = ev.clientX + 8 + 'px';
        f2.style.top = ev.clientY + 8 + 'px';
        var sota = document.elementFromPoint(ev.clientX, ev.clientY);
        $('col-demo').classList.toggle('sobre', !!(sota && sota.closest('#col-demo')));
        $('col-peces').classList.toggle('sobre', !!(sota && sota.closest('#col-peces')) && arr.de === 'demo');
    });
    function deixa(ev) {
        if (!arr || ev.pointerId !== arr.pointerId) return;
        var a = arr;
        arr = null;
        $('fantasma').hidden = true;
        $('col-demo').classList.remove('sobre');
        $('col-peces').classList.remove('sobre');
        if (!a.actiu) return;
        acabaDArrossegar = true;
        a.li.classList.remove('arrossegant');
        var sota = ev.type === 'pointerup' ? document.elementFromPoint(ev.clientX, ev.clientY) : null;
        if (sota && sota.closest('#col-demo')) {
            var idx = st.demo.length;
            var blocs = document.querySelectorAll('#demo .bloc[data-id]');
            for (var i = 0; i < blocs.length; i++) {
                var r = blocs[i].getBoundingClientRect();
                if (ev.clientY < r.top + r.height / 2) {
                    idx = st.demo.indexOf(blocs[i].getAttribute('data-id'));
                    break;
                }
            }
            posa(a.id, idx);
        } else if (sota && sota.closest('#col-peces') && a.de === 'demo') treu(a.id);
        else pinta();
    }
    document.addEventListener('pointerup', deixa);
    document.addEventListener('pointercancel', deixa);
    document.addEventListener('click', function (ev) {
        if (!st) return;
        if (acabaDArrossegar) {
            acabaDArrossegar = false;
            return;
        }
        if (ev.target.closest('.botons') || ev.target.closest('.forat')) return;
        var li = ev.target.closest('.bloc[data-id]');
        if (!li || li.classList.contains('fix') || !li.closest('#ordenar')) return;
        tria(li.getAttribute('data-id'), li.getAttribute('data-llista'));
    });

    window.Ordenar = { munta: munta };
})();

/**
 * ============================================================================
 * PROJECTE: demostra (Step Quiz, vanilla JS)
 * FITXER: js/motor/figures.js
 * ROL: Les figures de «Veure»: una funció pura per teorema, figura(n, pas) →
 *      cadena SVG. «n» és el valor del control lliscant; «pas», el panell
 *      (1, 2, 3…): cada panell hi afegeix alguna cosa.
 * ARQUITECTURA: Pur, sense DOM (es prova amb Node: SVG ben format per a tot n).
 *      Tots els dibuixos són fets per codi en aquest repositori: les idees
 *      matemàtiques són clàssiques, però no es copia cap dibuix de cap llibre.
 *      Colors amb classes (css/demostra.css: .f-a, .f-b…), així segueixen el
 *      mode fosc. Text amb caràcters Unicode (², ·, √, −), sense KaTeX.
 *      Nombres decimals amb coma.
 * DEPENDÈNCIES: cap
 * ============================================================================
 */
(function (arrel, fabrica) {
    'use strict';
    var api = fabrica();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else arrel.Figures = api;
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ── Peces de SVG ───────────────────────────────────────────────────────
    var r2 = function (v) {
        return Math.round(v * 100) / 100;
    };
    var esc = function (s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
    var coma = function (v, d) {
        var s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
        return s.replace('-', '−').replace('.', ',');
    };
    function svg(w, h, cos, titol) {
        return (
            '<svg viewBox="0 0 ' +
            w +
            ' ' +
            h +
            '" class="figura" role="img" aria-label="' +
            esc(titol) +
            '">' +
            cos.join('') +
            '</svg>'
        );
    }
    function rect(x, y, w, h, cls) {
        return (
            '<rect x="' +
            r2(x) +
            '" y="' +
            r2(y) +
            '" width="' +
            r2(w) +
            '" height="' +
            r2(h) +
            '" class="' +
            cls +
            '"/>'
        );
    }
    function linia(x1, y1, x2, y2, cls) {
        return (
            '<line x1="' +
            r2(x1) +
            '" y1="' +
            r2(y1) +
            '" x2="' +
            r2(x2) +
            '" y2="' +
            r2(y2) +
            '" class="' +
            cls +
            '"/>'
        );
    }
    function cami(punts, cls, tanca) {
        return (
            '<path d="' +
            punts
                .map(function (p, i) {
                    return (i ? 'L' : 'M') + r2(p[0]) + ' ' + r2(p[1]);
                })
                .join(' ') +
            (tanca ? ' Z' : '') +
            '" class="' +
            cls +
            '"/>'
        );
    }
    function cercle(x, y, r, cls) {
        return '<circle cx="' + r2(x) + '" cy="' + r2(y) + '" r="' + r2(r) + '" class="' + cls + '"/>';
    }
    function text(x, y, t, cls, ancora) {
        return (
            '<text x="' +
            r2(x) +
            '" y="' +
            r2(y) +
            '" class="' +
            (cls || 'f-text') +
            '" text-anchor="' +
            (ancora || 'middle') +
            '">' +
            esc(t) +
            '</text>'
        );
    }
    /** Arc d'angle al punt (cx, cy) entre dos angles (radians, matemàtics: y cap amunt). */
    function arc(cx, cy, r, a1, a2, cls) {
        var x1 = cx + r * Math.cos(a1),
            y1 = cy - r * Math.sin(a1),
            x2 = cx + r * Math.cos(a2),
            y2 = cy - r * Math.sin(a2);
        var gran = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
        var sentit = a2 > a1 ? 0 : 1;
        return (
            '<path d="M' +
            r2(cx) +
            ' ' +
            r2(cy) +
            ' L' +
            r2(x1) +
            ' ' +
            r2(y1) +
            ' A' +
            r2(r) +
            ' ' +
            r2(r) +
            ' 0 ' +
            gran +
            ' ' +
            sentit +
            ' ' +
            r2(x2) +
            ' ' +
            r2(y2) +
            ' Z" class="' +
            cls +
            '"/>'
        );
    }
    var COLORS = ['f-a', 'f-b', 'f-c', 'f-d'];
    var sup = function (k) {
        return String(k)
            .split('')
            .map(function (c) {
                return '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c];
            })
            .join('');
    };

    // ── 1. La suma dels senars ─────────────────────────────────────────────
    function senars(n, pas) {
        var u = 220 / n,
            x0 = 20,
            y0 = 240;
        var m = pas <= 1 ? 1 : pas === 2 ? Math.min(2, n) : pas === 3 ? Math.min(3, n) : n;
        var c = [rect(x0, y0 - n * u, n * u, n * u, 'f-marc')];
        for (var i = 0; i < n; i++)
            for (var j = 0; j < n; j++) {
                var k = Math.max(i, j); // la L número k + 1
                if (k < m) c.push(rect(x0 + i * u, y0 - (j + 1) * u, u, u, COLORS[k % 4] + ' f-cel'));
            }
        var termes = [];
        for (var t = 1; t <= m; t++) termes.push(2 * t - 1);
        var suma = m <= 4 ? termes.join(' + ') : '1 + 3 + … + ' + (2 * m - 1);
        c.push(text(130, 278, suma + ' = ' + m * m + ' = ' + m + '²'));
        return svg(260, 290, c, 'Quadrat fet de L');
    }

    // ── 2. La suma de Gauss ────────────────────────────────────────────────
    function gauss(n, pas) {
        var u = Math.min(280 / (2 * n + 2), 200 / (n + 1)),
            x0 = 20,
            y0 = 230;
        var c = [];
        for (var j = 1; j <= n; j++)
            for (var r = 0; r < j; r++) c.push(rect(x0 + (j - 1) * u, y0 - (r + 1) * u, u, u, 'f-a f-cel'));
        if (pas >= 2) {
            // La còpia girada: columna j amb n + 1 − j quadrets, a dalt
            var dx = pas === 2 ? (n + 1) * u : 0;
            for (var jj = 1; jj <= n; jj++)
                for (var rr = jj; rr <= n; rr++)
                    c.push(rect(x0 + dx + (jj - 1) * u, y0 - (rr + 1) * u, u, u, 'f-b f-cel'));
        }
        if (pas >= 3) {
            c.push(rect(x0, y0 - (n + 1) * u, n * u, (n + 1) * u, 'f-contorn'));
            c.push(text(x0 + (n * u) / 2, y0 + 18, n + ' columnes'));
            c.push(text(x0 + n * u + 8, y0 - ((n + 1) * u) / 2, n + 1 + ' files', 'f-text', 'start'));
        }
        if (pas >= 4)
            c.push(text(150, 272, '1 + … + ' + n + ' = ' + n + ' · ' + (n + 1) + ' : 2 = ' + (n * (n + 1)) / 2));
        return svg(300, 282, c, 'Dues escales que fan un rectangle');
    }

    // ── 3. (a + b)² ────────────────────────────────────────────────────────
    function quadratSuma(a, pas) {
        var b = 2,
            s = a + b,
            u = 200 / s,
            x0 = 40,
            y0 = 20;
        var c = [];
        if (pas >= 3) {
            c.push(rect(x0, y0 + b * u, a * u, a * u, 'f-a'));
            c.push(rect(x0 + a * u, y0, b * u, b * u, 'f-b'));
            c.push(rect(x0, y0, a * u, b * u, 'f-c'));
            c.push(rect(x0 + a * u, y0 + b * u, b * u, a * u, 'f-c'));
            c.push(text(x0 + (a * u) / 2, y0 + b * u + (a * u) / 2 + 6, 'a²'));
            c.push(text(x0 + a * u + (b * u) / 2, y0 + (b * u) / 2 + 6, 'b²'));
            c.push(text(x0 + (a * u) / 2, y0 + (b * u) / 2 + 6, 'ab'));
            c.push(text(x0 + a * u + (b * u) / 2, y0 + b * u + (a * u) / 2 + 6, 'ab'));
        }
        c.push(rect(x0, y0, s * u, s * u, 'f-contorn'));
        if (pas >= 2) {
            c.push(linia(x0 + a * u, y0, x0 + a * u, y0 + s * u, 'f-tall'));
            c.push(linia(x0, y0 + b * u, x0 + s * u, y0 + b * u, 'f-tall'));
        }
        c.push(text(x0 + (a * u) / 2, y0 + s * u + 20, 'a = ' + a));
        c.push(text(x0 + a * u + (b * u) / 2, y0 + s * u + 20, 'b = ' + b));
        if (pas >= 4)
            c.push(
                text(
                    140,
                    268,
                    '(' + a + ' + ' + b + ')² = ' + a * a + ' + 2 · ' + a * b + ' + ' + b * b + ' = ' + s * s
                )
            );
        return svg(280, 280, c, 'Quadrat de costat a + b');
    }

    // ── 4. (a − b)² ────────────────────────────────────────────────────────
    function quadratDiferencia(a, pas) {
        var b = 2,
            u = 200 / a,
            x0 = 40,
            y0 = 20,
            d = a - b;
        var c = [rect(x0, y0, a * u, a * u, 'f-contorn')];
        c.push(rect(x0, y0 + b * u, d * u, d * u, 'f-a'));
        c.push(text(x0 + (d * u) / 2, y0 + b * u + (d * u) / 2 + 6, '(a − b)²'));
        if (pas >= 2) {
            c.push(rect(x0, y0, a * u, b * u, 'f-c f-trans'));
            c.push(rect(x0 + d * u, y0, b * u, a * u, 'f-c f-trans'));
            c.push(text(x0 + (d * u) / 2, y0 + (b * u) / 2 + 6, 'ab'));
            c.push(text(x0 + d * u + (b * u) / 2, y0 + b * u + (d * u) / 2 + 6, 'ab'));
        }
        if (pas >= 3) {
            c.push(rect(x0 + d * u, y0, b * u, b * u, 'f-b'));
            c.push(text(x0 + d * u + (b * u) / 2, y0 + (b * u) / 2 + 6, 'b²'));
        }
        c.push(text(x0 + (a * u) / 2, y0 + a * u + 20, 'a = ' + a + ', b = ' + b));
        if (pas >= 4)
            c.push(
                text(
                    140,
                    268,
                    '(' + a + ' − ' + b + ')² = ' + a * a + ' − 2 · ' + a * b + ' + ' + b * b + ' = ' + d * d
                )
            );
        return svg(280, 280, c, 'Quadrat de costat a amb dues tires');
    }

    // ── 5. a² − b² = (a + b)(a − b) ────────────────────────────────────────
    function diferenciaQuadrats(a, pas) {
        var b = 2,
            d = a - b,
            u = Math.min(200 / a, 250 / (a + b)),
            x0 = 30,
            y0 = 20;
        var c = [];
        if (pas <= 2) {
            // La L: a² sense el quadradet b² de dalt a la dreta
            c.push(rect(x0, y0 + b * u, a * u, d * u, 'f-a'));
            c.push(rect(x0, y0, d * u, b * u, pas >= 2 ? 'f-c' : 'f-a'));
            c.push(rect(x0 + d * u, y0, b * u, b * u, 'f-buit'));
            c.push(text(x0 + d * u + (b * u) / 2, y0 + (b * u) / 2 + 6, 'b²'));
            if (pas >= 2) c.push(linia(x0, y0 + b * u, x0 + d * u, y0 + b * u, 'f-tall'));
            c.push(
                text(
                    x0 + (a * u) / 2,
                    y0 + a * u + 20,
                    'a = ' + a + ', b = ' + b + ': ' + a * a + ' − ' + b * b + ' = ' + (a * a - b * b)
                )
            );
        } else {
            // El rectangle (a + b) × (a − b)
            c.push(rect(x0, y0 + 40, a * u, d * u, 'f-a'));
            c.push(rect(x0 + a * u, y0 + 40, b * u, d * u, 'f-c'));
            c.push(rect(x0, y0 + 40, (a + b) * u, d * u, 'f-contorn'));
            c.push(text(x0 + ((a + b) * u) / 2, y0 + 30, 'base a + b = ' + (a + b) + ', altura a − b = ' + d));
            if (pas >= 4)
                c.push(
                    text(
                        150,
                        y0 + 40 + d * u + 30,
                        a + b + ' · ' + d + ' = ' + (a + b) * d + ' = ' + a * a + ' − ' + b * b
                    )
                );
        }
        return svg(300, 270, c, 'Una L que es torna un rectangle');
    }

    // ── 6. Parell · qualsevol = parell ─────────────────────────────────────
    function parell(b, pas) {
        var k = 2,
            grups = pas <= 1 ? 1 : b,
            r = 7,
            pasX = 22,
            amplaGrup = k * pasX + 14;
        var x0 = Math.max(10, 150 - (grups * amplaGrup) / 2);
        var c = [];
        for (var g = 0; g < grups; g++)
            for (var col = 0; col < k; col++)
                for (var fila = 0; fila < 2; fila++)
                    c.push(
                        cercle(x0 + g * amplaGrup + col * pasX + 12, 70 + fila * 30, r, fila ? 'f-punt-b' : 'f-punt-a')
                    );
        if (pas >= 3) {
            c.push(rect(x0, 55, grups * amplaGrup - 10, 30, 'f-contorn'));
            c.push(rect(x0, 85, grups * amplaGrup - 10, 30, 'f-contorn'));
            c.push(
                text(
                    150,
                    150,
                    'dues files de ' + k * grups + ': 4 · ' + grups + ' = 2 · ' + k * grups + ' = ' + 4 * grups
                )
            );
        } else c.push(text(150, 150, pas <= 1 ? '4 = 2 · 2: dues files iguals' : '4 · ' + b + ' = ' + 4 * b));
        return svg(300, 170, c, 'Punts en dues files');
    }

    // ── 7. Els angles d'un triangle ────────────────────────────────────────
    function triangle(n, pas) {
        var A = [30, 200],
            B = [270, 200],
            C = [40 + 30 * n, 70];
        var ang = function (P, Q) {
            return Math.atan2(-(Q[1] - P[1]), Q[0] - P[0]);
        };
        var c = [];
        if (pas >= 2) c.push(linia(0, C[1], 300, C[1], 'f-paral'));
        c.push(arc(A[0], A[1], 30, 0, ang(A, C), 'f-a'));
        c.push(arc(B[0], B[1], 30, ang(B, C), Math.PI, 'f-b'));
        c.push(arc(C[0], C[1], 26, ang(C, B), ang(C, A), 'f-c'));
        if (pas >= 3) {
            c.push(arc(C[0], C[1], 26, Math.PI, ang(C, A) + 2 * Math.PI, 'f-a'));
            c.push(arc(C[0], C[1], 26, 0, ang(C, B), 'f-b'));
        }
        c.push(cami([A, B, C], 'f-contorn', true));
        c.push(text(A[0] - 10, A[1] + 18, 'A'), text(B[0] + 10, B[1] + 18, 'B'), text(C[0], C[1] - 10, 'C'));
        c.push(text(A[0] + 44, A[1] - 8, 'α'), text(B[0] - 44, B[1] - 8, 'β'));
        if (pas >= 2) c.push(text(285, C[1] - 6, 'r'));
        if (pas >= 4) c.push(text(150, 245, 'α + γ + β = un angle pla = 180°'));
        return svg(300, 260, c, 'Triangle amb una paral·lela');
    }

    // ── 8. Pitàgores per reordenació ───────────────────────────────────────
    function pitagores(a, pas) {
        var b = 3,
            s = a + b,
            u = 200 / s,
            y0 = 20;
        var c = [];
        var q = function (x0, px, py) {
            return [x0 + px * u, y0 + (s - py) * u];
        };
        // Configuració 1: quatre triangles als racons, un quadrat c² al mig
        var X1 = 20;
        var P1 = [a, 0],
            P2 = [s, a],
            P3 = [b, s],
            P4 = [0, b];
        c.push(cami([q(X1, 0, 0), q(X1, s, 0), q(X1, s, s), q(X1, 0, s)], 'f-c', true));
        [
            [[0, 0], P1, P4],
            [[s, 0], P2, P1],
            [[s, s], P3, P2],
            [[0, s], P4, P3],
        ].forEach(function (T) {
            c.push(
                cami(
                    T.map(function (p) {
                        return q(X1, p[0], p[1]);
                    }),
                    'f-tri',
                    true
                )
            );
        });
        c.push(text(X1 + (s * u) / 2, y0 + (s * u) / 2 + 6, 'c²'));
        c.push(rect(X1, y0, s * u, s * u, 'f-contorn'));
        if (pas >= 2) {
            // Configuració 2: a² a baix a l'esquerra, b² a dalt a la dreta, dos rectangles partits
            var X2 = 280;
            c.push(cami([q(X2, 0, 0), q(X2, a, 0), q(X2, a, a), q(X2, 0, a)], pas >= 3 ? 'f-a' : 'f-buit', true));
            c.push(cami([q(X2, a, a), q(X2, s, a), q(X2, s, s), q(X2, a, s)], pas >= 3 ? 'f-b' : 'f-buit', true));
            [
                [
                    [a, 0],
                    [s, 0],
                    [s, a],
                ],
                [
                    [a, 0],
                    [a, a],
                    [s, a],
                ],
                [
                    [0, a],
                    [a, a],
                    [a, s],
                ],
                [
                    [0, a],
                    [0, s],
                    [a, s],
                ],
            ].forEach(function (T) {
                c.push(
                    cami(
                        T.map(function (p) {
                            return q(X2, p[0], p[1]);
                        }),
                        'f-tri',
                        true
                    )
                );
            });
            if (pas >= 3) {
                c.push(text(X2 + (a * u) / 2, y0 + (s - a / 2) * u + 6, 'a²'));
                c.push(text(X2 + (a + b / 2) * u, y0 + (b / 2) * u + 6, 'b²'));
            }
            c.push(rect(X2, y0, s * u, s * u, 'f-contorn'));
        }
        c.push(
            text(
                260,
                250,
                'a = ' +
                    a +
                    ', b = ' +
                    b +
                    (pas >= 4 ? ': c² = ' + a * a + ' + ' + b * b + ' = ' + (a * a + b * b) : '')
            )
        );
        return svg(520, 265, c, 'Quatre triangles en un quadrat, de dues maneres');
    }

    // ── 9. √2 és irracional (idea de la figura: S. Tennenbaum) ─────────────
    var GAIREBE = [
        [3, 2],
        [7, 5],
        [17, 12],
        [41, 29],
    ];
    function arrel2(k, pas) {
        var par = GAIREBE[Math.max(0, Math.min(GAIREBE.length - 1, k - 1))],
            a = par[0],
            b = par[1];
        var u = 210 / a,
            x0 = 45,
            y0 = 20;
        var c = [rect(x0, y0, a * u, a * u, 'f-buit')];
        if (pas >= 2) {
            c.push(rect(x0, y0 + (a - b) * u, b * u, b * u, 'f-a f-trans'));
            c.push(rect(x0 + (a - b) * u, y0, b * u, b * u, 'f-b f-trans'));
        }
        if (pas >= 3) {
            c.push(rect(x0 + (a - b) * u, y0 + (a - b) * u, (2 * b - a) * u, (2 * b - a) * u, 'f-solapa'));
            c.push(rect(x0, y0, (a - b) * u, (a - b) * u, 'f-forat'));
            c.push(rect(x0 + b * u, y0 + b * u, (a - b) * u, (a - b) * u, 'f-forat'));
        }
        c.push(rect(x0, y0, a * u, a * u, 'f-contorn'));
        c.push(text(150, 252, 'a = ' + a + ', b = ' + b + ': a² = ' + a * a + ', 2b² = ' + 2 * b * b));
        if (pas >= 4)
            c.push(
                text(150, 272, '(2b − a)² = ' + (2 * b - a) * (2 * b - a) + '   2(a − b)² = ' + 2 * (a - b) * (a - b))
            );
        return svg(300, 285, c, 'Dos quadrats dins d’un quadrat');
    }

    // ── 10. Infinits primers ───────────────────────────────────────────────
    var PRIMERS = [2, 3, 5, 7, 11, 13, 17, 19];
    function factors(N) {
        var out = [];
        for (var p = 2; p * p <= N; p++)
            while (N % p === 0) {
                out.push(p);
                N /= p;
            }
        if (N > 1) out.push(N);
        return out;
    }
    function primers(n, pas) {
        var ps = PRIMERS.slice(0, n);
        var P = ps.reduce(function (x, y) {
            return x * y;
        }, 1);
        var N = P + 1;
        var c = [];
        var w = 300 / Math.max(n, 4);
        ps.forEach(function (p, i) {
            c.push(rect(10 + i * w, 20, w - 8, 36, 'f-a'));
            c.push(text(10 + i * w + (w - 8) / 2, 44, p));
        });
        if (pas >= 2) c.push(text(160, 92, 'N = ' + ps.join(' · ') + ' + 1 = ' + N));
        if (pas >= 3) {
            c.push(text(160, 126, 'Dividim N per ' + ps.join(', ') + ':'));
            c.push(text(160, 148, 'el residu sempre és 1'));
        }
        if (pas >= 4) {
            var f = factors(N);
            c.push(
                text(
                    160,
                    180,
                    f.length === 1 ? N + ' és primer: un primer nou' : N + ' = ' + f.join(' · ') + ': primers nous'
                )
            );
        }
        return svg(320, 200, c, 'Els primers primers i N');
    }

    // ── 11. 2ⁿ > n ─────────────────────────────────────────────────────────
    function potencies(n, pas) {
        var esc_ = 190 / Math.pow(2, n),
            w = 280 / n,
            y0 = 220;
        var c = [linia(10, y0, 300, y0, 'f-eix')];
        for (var k = 1; k <= n; k++) {
            var x = 15 + (k - 1) * w;
            var h1 = Math.pow(2, k) * esc_,
                h2 = k * esc_;
            var dest = pas === 2 && k === 1;
            c.push(rect(x, y0 - h1, w * 0.42, h1, dest ? 'f-b' : 'f-a'));
            c.push(rect(x + w * 0.45, y0 - h2, w * 0.42, Math.max(h2, 1), 'f-c'));
            c.push(text(x + w * 0.43, y0 + 16, k));
            if (pas >= 3 && k > 1) c.push(text(x + w * 0.21, y0 - h1 - 6, '×2'));
        }
        c.push(text(155, 255, '2' + sup(n) + ' = ' + Math.pow(2, n) + ' > ' + n));
        return svg(310, 265, c, 'Barres de 2 a la n i de n');
    }

    // ── 12. La suma geomètrica (r = 2) ─────────────────────────────────────
    function geometrica(n, pas) {
        var T = Math.pow(2, n),
            u = 270 / T,
            x0 = 15;
        var c = [];
        var x = x0;
        for (var k = 0; k < n; k++) {
            var L = Math.pow(2, k) * u;
            var gap = pas <= 1 ? 4 : 0;
            c.push(rect(x, 40, L, 34, COLORS[k % 4]));
            if (L > 16) c.push(text(x + L / 2, 62, Math.pow(2, k)));
            x += L + gap;
        }
        if (pas >= 2) {
            c.push(rect(x0, 100, T * u, 34, 'f-contorn'));
            c.push(text(x0 + (T * u) / 2, 122, '2' + sup(n) + ' = ' + T));
        }
        if (pas >= 3) {
            c.push(rect(x0 + (T - 1) * u, 40, u, 34, 'f-forat'));
            c.push(text(x0 + (T - 0.5) * u, 32, 'falta 1'));
        }
        if (pas >= 4)
            c.push(text(150, 170, '1 + 2 + … + ' + T / 2 + ' = ' + (T - 1) + ' = (2' + sup(n) + ' − 1) : (2 − 1)'));
        return svg(300, 185, c, 'Blocs que es dupliquen');
    }

    // ── 13. La suma dels cubs (Nicòmac) ────────────────────────────────────
    var tri = function (k) {
        return (k * (k + 1)) / 2;
    };
    function cubs(n, pas) {
        var T = tri(n),
            u = 220 / T,
            x0 = 20,
            y0 = 235;
        var c = [];
        var P = function (x, y) {
            return [x0 + x * u, y0 - y * u];
        };
        if (pas >= 2)
            for (var k = 1; k <= n; k++) {
                var t0 = tri(k - 1),
                    t1 = tri(k);
                c.push(cami([P(0, t0), P(t1, t0), P(t1, t1), P(0, t1)], COLORS[(k - 1) % 4], true));
                c.push(cami([P(t0, 0), P(t1, 0), P(t1, t0), P(t0, t0)], COLORS[(k - 1) % 4], true));
                if (pas >= 3) {
                    for (var xx = k; xx < t1 - 1e-9; xx += k)
                        c.push(linia(P(xx, t0)[0], P(xx, t0)[1], P(xx, t1)[0], P(xx, t1)[1], 'f-tall'));
                    for (var yy = k; yy < t0 - 1e-9; yy += k)
                        c.push(linia(P(t0, yy)[0], P(t0, yy)[1], P(t1, yy)[0], P(t1, yy)[1], 'f-tall'));
                    c.push(linia(P(t0, t0)[0], P(t0, t0)[1], P(t1, t0)[0], P(t1, t0)[1], 'f-tall'));
                }
            }
        c.push(rect(x0, y0 - T * u, T * u, T * u, 'f-contorn'));
        var termes = [];
        for (var i = 1; i <= Math.min(n, 4); i++) termes.push(i + '³');
        if (n > 4) termes.push('…', n + '³');
        c.push(
            text(
                130,
                262,
                pas >= 4 ? termes.join(' + ') + ' = ' + T + '² = ' + T * T : 'costat: 1 + … + ' + n + ' = ' + T
            )
        );
        return svg(260, 275, c, 'Quadrat fet de L de gruix creixent');
    }

    // ── 14. Mitjana aritmètica i geomètrica ────────────────────────────────
    function amgm(a, pas) {
        var D = 8,
            b = D - a,
            u = 30,
            O = [150, 200],
            R = (D / 2) * u;
        var Px = O[0] - R + a * u,
            h = Math.sqrt(a * b) * u;
        var c = [];
        c.push(
            '<path d="M' +
                (O[0] - R) +
                ' ' +
                O[1] +
                ' A' +
                R +
                ' ' +
                R +
                ' 0 0 1 ' +
                (O[0] + R) +
                ' ' +
                O[1] +
                '" class="f-corba"/>'
        );
        c.push(linia(O[0] - R, O[1], O[0] + R, O[1], 'f-contorn'));
        c.push(linia(O[0], O[1], O[0], O[1] - R, 'f-radi'));
        c.push(text(O[0] - R + (a * u) / 2, O[1] + 20, 'a = ' + a));
        c.push(text(Px + (b * u) / 2, O[1] + 20, 'b = ' + b));
        c.push(text(O[0] + 6, O[1] - R - 8, 'radi = (a + b) : 2 = 4', 'f-text', 'start'));
        if (pas >= 2) c.push(linia(Px, O[1], Px, O[1] - h, 'f-segment'));
        if (pas >= 3) {
            c.push(linia(O[0] - R, O[1], Px, O[1] - h, 'f-tall'));
            c.push(linia(O[0] + R, O[1], Px, O[1] - h, 'f-tall'));
            c.push(text(Px + (Px < O[0] ? -6 : 6), O[1] - h / 2, '√(ab)', 'f-text', Px < O[0] ? 'end' : 'start'));
        }
        if (pas >= 4) c.push(text(150, 250, '√(' + a + ' · ' + b + ') = ' + coma(Math.sqrt(a * b), 2) + ' ≤ 4'));
        return svg(300, 262, c, 'Semicercle amb un segment perpendicular');
    }

    // ── 15. La derivada de x² ──────────────────────────────────────────────
    function derivada(n, pas) {
        var h = 2 / Math.pow(2, n - 1),
            x = 1;
        var X = function (v) {
                return 30 + (v + 0.5) * 70;
            },
            Y = function (v) {
                return 235 - v * 21;
            };
        var c = [linia(X(-0.5), Y(0), X(3.4), Y(0), 'f-eix'), linia(X(0), Y(-0.3), X(0), Y(10.5), 'f-eix')];
        var pts = [];
        for (var t = -0.5; t <= 3.2; t += 0.05) pts.push([X(t), Y(t * t)]);
        c.push(cami(pts, 'f-corba'));
        if (pas >= 4) c.push(linia(X(0.2), Y(2 * 0.2 - 1), X(3), Y(2 * 3 - 1), 'f-tangent'));
        if (pas >= 2) {
            var m = 2 * x + h;
            var f = function (v) {
                return x * x + m * (v - x);
            };
            var xa = Math.max(-0.5, x - 1),
                xb = Math.min(3.3, x + h + 0.4);
            c.push(linia(X(xa), Y(f(xa)), X(xb), Y(f(xb)), 'f-secant'));
            c.push(cercle(X(x + h), Y((x + h) * (x + h)), 5, 'f-punt-b'));
            c.push(text(X(x + h) + 8, Y((x + h) * (x + h)) + 4, 'x + h', 'f-text', 'start'));
        }
        c.push(cercle(X(x), Y(1), 5, 'f-punt-a'));
        c.push(text(X(x) + 8, Y(1) + 16, '(1, 1)', 'f-text', 'start'));
        c.push(
            text(
                296,
                18,
                'h = ' +
                    coma(h, 4).replace(/,?0+$/, '') +
                    (pas >= 3 ? '   pendent = 2 + h = ' + coma(2 + h, 4).replace(/,?0+$/, '') : '') +
                    (pas >= 4 ? '  → 2' : ''),
                'f-text',
                'end'
            )
        );
        return svg(300, 268, c, 'Paràbola amb una recta secant');
    }

    // ── 16. Bolzano: x³ + x − 1 = 0 entre 0 i 1 ────────────────────────────
    function bolzano(n, pas) {
        var f = function (v) {
            return v * v * v + v - 1;
        };
        var X = function (v) {
                return 30 + (v + 0.1) * 210;
            },
            Y = function (v) {
                return 120 - v * 70;
            };
        var c = [linia(X(-0.1), Y(0), X(1.15), Y(0), 'f-eix'), linia(X(0), Y(-1.4), X(0), Y(1.4), 'f-eix')];
        c.push(text(X(1), Y(0) - 8, '1'));
        if (pas >= 3) {
            var pts = [];
            for (var t = 0; t <= 1.0001; t += 0.02) pts.push([X(t), Y(f(t))]);
            c.push(cami(pts, 'f-corba'));
        }
        c.push(cercle(X(0), Y(-1), 5, 'f-punt-a'));
        c.push(text(X(0) + 8, Y(-1) + 5, 'f(0) = −1', 'f-text', 'start'));
        if (pas >= 2) {
            c.push(cercle(X(1), Y(1), 5, 'f-punt-b'));
            c.push(text(X(1) - 8, Y(1) + 5, 'f(1) = 1', 'f-text', 'end'));
        }
        if (pas >= 4) {
            var lo = 0,
                hi = 1;
            for (var i = 0; i < n; i++) {
                var mig = (lo + hi) / 2;
                if (f(mig) < 0) lo = mig;
                else hi = mig;
                c.push(linia(X(lo), Y(0) + 14 + i * 7, X(hi), Y(0) + 14 + i * 7, 'f-interval'));
            }
            var curt = function (v) {
                return coma(v, 4).replace(/0+$/, '').replace(/,$/, '');
            };
            c.push(text(150, 236, n + (n === 1 ? ' pas: ' : ' passos: ') + curt(lo) + ' < solució < ' + curt(hi)));
        }
        return svg(300, 245, c, 'Gràfica de x³ + x − 1');
    }

    var FIGURES = {
        senars: senars,
        gauss: gauss,
        quadratSuma: quadratSuma,
        quadratDiferencia: quadratDiferencia,
        diferenciaQuadrats: diferenciaQuadrats,
        parell: parell,
        triangle: triangle,
        pitagores: pitagores,
        arrel2: arrel2,
        primers: primers,
        potencies: potencies,
        geometrica: geometrica,
        cubs: cubs,
        amgm: amgm,
        derivada: derivada,
        bolzano: bolzano,
    };

    /** La figura «nom» per a n i pas (n s'arrodoneix; pas ≥ 1). */
    function figura(nom, n, pas) {
        if (!FIGURES[nom]) throw new Error('figura desconeguda: ' + nom);
        return FIGURES[nom](Math.round(n), Math.max(1, Math.round(pas)));
    }

    return { FIGURES: FIGURES, figura: figura, factors: factors, GAIREBE: GAIREBE };
});

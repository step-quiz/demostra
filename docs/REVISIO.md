# Revisió matemàtica dels teoremes

La IA redacta cada teorema (enunciat, figura, línies, peces falses, guió i pistes); **el professor en revisa la
matemàtica**. Una fila per teorema. Estats: *esborrany* (redactat, pendent de revisió) → *revisat* (el professor hi
està d'acord, amb data) → *publicat*.

Per revisar un teorema: obre `teorema.html?id=<id>`, mira els tres esglaons i, a «Ordenar», els tres nivells (el
nivell 3 té totes les peces falses). Les dades són a `data/teoremes/<id>.js`.

| Id | Teorema | Curs | Redactat | Revisat pel professor | Publicat | Notes |
|---|---|---|---|---|---|---|
| `angles-triangle` | Els angles d’un triangle | 2n ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | Fa servir el postulat de les paral·leles (existència de la paral·lela per $C$). |
| `pitagores` | El teorema de Pitàgores | 2n ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `senars` | La suma dels senars | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | Demostració telescòpica, no per inducció. |
| `gauss` | La suma de Gauss | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `quadrat-suma` | El quadrat d’una suma | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | La figura és per a $a, b > 0$; la demostració, per a tots. |
| `quadrat-diferencia` | El quadrat d’una diferència | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `diferencia-quadrats` | Suma per diferència | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `parell` | Parell per qualsevol és parell | 3r ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `arrel-de-2` | √2 és irracional | 4t ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | Figura: idea de S. Tennenbaum, amb parelles que gairebé compleixen $a^2 = 2b^2$. |
| `infinits-primers` | Hi ha infinits primers | 4t ESO | 2026-10-22 | pendent | 2026-10-22 (v1) | Escrita per reducció a l’absurd (Euclides la fa directa). |
| `dos-n` | 2ⁿ > n | 1r BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `suma-geometrica` | La suma geomètrica | 1r BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `suma-cubs` | La suma dels cubs | 1r BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | Fa servir la suma de Gauss. |
| `mitjanes` | Mitjana aritmètica i geomètrica | 1r BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | Demostració algebraica; el semicercle és a Veure. |
| `derivada-x2` | La derivada de x² | 1r BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | |
| `bolzano` | Una aplicació de Bolzano | 2n BAT | 2026-10-22 | pendent | 2026-10-22 (v1) | $f(x) = x^3 + x - 1$ a $[0, 1]$. |

L’usuari va decidir publicar-ho tot ja i revisar-ho en paral·lel (2026-10-22). Quan revisis un teorema, escriu-hi la
data a «Revisat pel professor» i, si cal canviar res, digues-ho: el canvi i la nova fila van al mateix commit.

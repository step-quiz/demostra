# Demostra-ho

Demostracions matemàtiques per a 2n d'ESO – 2n de batxillerat en **tres esglaons**: el pas que falta entre llegir una demostració i escriure-la.

Web: https://demostra.step-quiz.net

1. **Veure.** Una demostració sense paraules que es revela pas a pas i es pot moure: un control canvia `n` (o `a`…) i la figura creix. Abans d'alguns passos, «Prova-ho primer al paper». Hi ha un **mode projector**.
2. **Ordenar.** Les línies de la demostració, barrejades i amb **peces falses** (trampes). L'alumne construeix una demostració vàlida (les *Proof Blocks* de Poulsen i altres, Universitat d'Illinois, 2022).
3. **Escriure.** Al paper. A la pantalla, una llista per revisar-la, la demostració model i **pistes** una a una.

## Els 16 teoremes

| Id | Teorema | Curs | Tipus |
|---|---|---|---|
| `angles-triangle` | Els angles d’un triangle | 2n d’ESO | demostració directa |
| `pitagores` | El teorema de Pitàgores | 2n d’ESO | demostració directa |
| `senars` | La suma dels senars | 3r d’ESO | demostració directa |
| `gauss` | La suma de Gauss | 3r d’ESO | demostració directa |
| `quadrat-suma` | El quadrat d’una suma | 3r d’ESO | demostració directa |
| `quadrat-diferencia` | El quadrat d’una diferència | 3r d’ESO | demostració directa |
| `diferencia-quadrats` | Suma per diferència | 3r d’ESO | demostració directa |
| `parell` | Parell per qualsevol és parell | 3r d’ESO | demostració directa |
| `arrel-de-2` | √2 és irracional | 4t d’ESO | per reducció a l’absurd |
| `infinits-primers` | Hi ha infinits primers | 4t d’ESO | per reducció a l’absurd |
| `dos-n` | 2ⁿ > n | 1r de batxillerat | per inducció |
| `suma-geometrica` | La suma geomètrica | 1r de batxillerat | per inducció |
| `suma-cubs` | La suma dels cubs | 1r de batxillerat | per inducció |
| `mitjanes` | Mitjana aritmètica i geomètrica | 1r de batxillerat | demostració directa |
| `derivada-x2` | La derivada de x² | 1r de batxillerat | demostració directa |
| `bolzano` | Una aplicació de Bolzano | 2n de batxillerat | demostració directa |

Les demostracions les ha redactat la IA i **les revisa el professor** (`docs/REVISIO.md`). Totes les figures són dibuixades per codi en aquest web; les idees són clàssiques i es diu de qui són quan se sap.

## Ordenar

Una demostració és correcta si **no té cap peça falsa**, **hi és cada pas** i **cada pas surt després dels passos que fa servir**. Qualsevol ordre que compleixi això és bo, no només el del model.

Després de «Comprova» només es diu **la primera falta**:

- una peça falsa: per què és falsa;
- falta un pas: «Falta un pas» (la segona vegada, quin);
- un pas massa d'hora: «Aquest pas fa servir una cosa que encara no has dit» (la segona vegada, quina);
- a les demostracions amb parts (inducció, reducció a l'absurd): una capçalera fora de lloc o un pas a una part equivocada.

| Nivell | Què canvia |
|---|---|
| 1 | Les capçaleres (Cas base, Pas inductiu…) ja hi són, fixes |
| 2 | També s'han de posar les capçaleres |
| 3 | Com el 2, amb més peces falses |

Les peces es mouen **tocant** (toca una peça i després «Posa-la aquí»), **arrossegant** (amb el dit, des de la nansa ⠿) o amb el **teclat** (Retorn posa una peça al final o la treu; Espai la tria; ↑ ↓ la mouen; Esc la deixa).

## Adreces

- `index.html#3ESO`: la llista filtrada per curs (`2ESO`, `3ESO`, `4ESO`, `1BAT`, `2BAT`).
- `teorema.html?id=senars#ordenar`: un teorema i un esglaó (`#veure`, `#ordenar`, `#escriure`). També `?projector=1` (Veure en gran) i `?nivell=2`.

No dona cap codi de verificació. Només es desa en aquest navegador el que s'ha fet i les pistes obertes (`demostra:v1:fet`, `demostra:v1:pistes`); si no es pot, funciona igual.

## Com provar-ho a l'ordinador

No cal instal·lar res: obre `index.html` amb doble clic. No fa cap petició a internet: KaTeX (les fórmules) és dins del repositori.

## Com està fet

HTML, CSS i JavaScript sense compilació, amb scripts clàssics perquè funcioni amb doble clic.

```
index.html               la llista de teoremes
teorema.html             un teorema: Veure, Ordenar, Escriure
css/tokens.css           colors (clar i fosc), també els de les figures
css/demostra.css         estils, mode projector i impressió
data/teoremes/*.js       un fitxer per teorema
vendor/katex-0.16.11/    KaTeX (llicència MIT), només les fonts woff2
js/motor/atzar.js        atzar amb llavor (el de prova1eso)
js/motor/text.js         separa el text i les fórmules entre $…$
js/motor/blocs.js        Ordenar: peces, barreja i comprovador (un graf de dependències)
js/motor/figures.js      les 16 figures de Veure: figura(n, pas) → SVG
js/ui/textos.js          els textos de la interfície
js/ui/comu.js            fórmules amb KaTeX i progrés desat
js/ui/index.js           la llista
js/ui/ordenar.js         l'esglaó Ordenar (dues columnes)
js/ui/teorema.js         la pàgina del teorema: pestanyes, Veure, Escriure, pistes
tools/versio.py          posa al dia els ?v= dels CSS i JS
```

## Tests

```
node tests/run-all.js
```

| Fitxer | Què comprova |
|---|---|
| `tests/blocs.test.js` | El comprovador amb una taula d'entregues: correcta, un altre ordre vàlid, amb una peça falsa, amb un pas de menys, amb un pas massa d'hora, i les capçaleres; la barreja no surt mai resolta |
| `tests/teoremes.test.js` | Cada teorema: ids únics, graf acíclic, l'ordre model és vàlid, cap línia decorativa, cap peça falsa com a dependència, la barreja inicial no és vàlida, cada fórmula es dibuixa amb KaTeX, cada figura és un SVG ben format per a tots els valors del control |
| `tests/repo.test.js` | Que tot fitxer citat existeix, l'ordre dels scripts, cap adreça externa, cap mòdul ES ni `fetch` (doble clic), cap `Math.random`, textos curts |
| `tools/versio.py --comprova` | Que cap `?v=` és vell |
| `tests/docs_vs_codi.py` | Que aquest README diu el mateix que el codi (teoremes, cursos, nivells, claus) |

GitHub els passa a cada pujada a `main` (`.github/workflows/tests.yml`).

<!-- atribucio-centre:inici -->

---

Material desenvolupat per **David Arso Civil** per al Departament de Matemàtiques de l'INS Miquel Tarradell.
Contingut sota CC BY-NC-SA 4.0, codi sota llicència MIT. Vegeu [`LLICENCIA.md`](LLICENCIA.md).

<!-- atribucio-centre:final -->

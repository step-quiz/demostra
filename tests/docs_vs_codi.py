#!/usr/bin/env python3
"""
PROJECTE: demostra (Step Quiz, vanilla JS)
FITXER: tests/docs_vs_codi.py
ROL: Que la documentació diu el mateix que el codi:
  - les rutes entre `cometes` del README existeixen;
  - la taula de teoremes del README té cada fitxer de data/teoremes/ (id, curs i tipus),
    i el títol diu quants n'hi ha;
  - docs/REVISIO.md té una fila per teorema;
  - els nivells, els cursos de l'adreça i les claus de localStorage són els del codi.
ÚS: python3 tests/docs_vs_codi.py   (només biblioteca estàndard)
"""
import pathlib
import re
import sys

ARREL = pathlib.Path(__file__).resolve().parent.parent
llegeix = lambda rel: (ARREL / rel).read_text(encoding='utf-8')
errors = []


def comprova(cond, msg):
    if not cond:
        errors.append(msg)


readme = llegeix('README.md')
revisio = llegeix('docs/REVISIO.md')
textos = llegeix('js/ui/textos.js')

# 1. Rutes citades
for ruta in re.findall(r'`([^`\s#?*]+\.(?:js|css|html|py|yml|md))(?:[?#][^`]*)?`', readme):
    if ruta.startswith('.github/'):
        continue  # els workflows es creen des del web de GitHub
    comprova((ARREL / ruta).exists(), f'README.md cita `{ruta}`, que no existeix')

# 2. Teoremes
cursos = dict(re.findall(r"'(\dESO|\dBAT)': '([^']+)'", textos))
tipus = dict(re.findall(r"(directa|induccio|absurd): '([^']+)'", textos))
fitxers = sorted((ARREL / 'data' / 'teoremes').glob('*.js'))
comprova(f'## Els {len(fitxers)} teoremes' in readme, f'README.md: el títol ha de dir que hi ha {len(fitxers)} teoremes')
for f in fitxers:
    s = f.read_text(encoding='utf-8')
    tid = re.search(r"^    id: '([^']+)'", s, re.M).group(1)
    curs = re.search(r"^    curs: '([^']+)'", s, re.M).group(1)
    tip = re.search(r"^        tipus: '([^']+)'", s, re.M).group(1)
    comprova(tid == f.stem, f'{f.name}: l’id ({tid}) no és el nom del fitxer')
    fila = re.search(rf'^\| `{re.escape(tid)}` \| [^|]+ \| ([^|]+) \| ([^|]+) \|$', readme, re.M)
    comprova(fila is not None, f'README.md: falta el teorema `{tid}` a la taula')
    if fila:
        comprova(fila.group(1).strip() == cursos[curs], f'README.md: `{tid}` és de {cursos[curs]}')
        comprova(fila.group(2).strip() == tipus[tip], f'README.md: `{tid}` és {tipus[tip]}')
    comprova(re.search(rf'^\| `{re.escape(tid)}` \|', revisio, re.M) is not None, f'docs/REVISIO.md: falta la fila de `{tid}`')
files_readme = re.findall(r'^\| `([a-z0-9-]+)` \|', readme, re.M)
comprova(len(files_readme) == len(fitxers), f'README.md: la taula té {len(files_readme)} teoremes i n’hi ha {len(fitxers)}')

# 3. Nivells, cursos, claus
blocs = llegeix('js/motor/blocs.js')
nivells = re.findall(r'\d', re.search(r'var NIVELLS = \[([^\]]*)\]', blocs).group(1))
for n in nivells:
    comprova(f'| {n} |' in readme, f'README.md: falta el nivell {n} a la taula')
for c in re.findall(r"'(\dESO|\dBAT)'", re.search(r'ordreCursos: \[([^\]]*)\]', textos).group(1)):
    comprova(f'`{c}`' in readme, f'README.md: falta el curs `{c}` a les adreces')
for f in ('js/ui/comu.js', 'js/ui/teorema.js'):
    for clau in re.findall(r"'(demostra:v1:\w+)'", llegeix(f)):
        comprova(f'`{clau}`' in readme, f'README.md: falta la clau `{clau}`')

if errors:
    print(f'✗ demostra: {len(errors)} discrepàncies entre la documentació i el codi:')
    for e in errors:
        print('  - ' + e)
    sys.exit(1)
print('✓ demostra: la documentació quadra amb el codi.')

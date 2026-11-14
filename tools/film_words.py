#!/usr/bin/env python3
"""Extrait les mots les plus difficiles d'un fichier de dialogues (sous-titres .srt/.vtt ou texte).

Usage :
    python3 tools/film_words.py chemin/vers/dialogues.srt [--top 60] [--min 2]

Le fichier de dialogues reste sur ta machine : il n'est ni copié dans le dépôt ni dans l'application.
La sortie ne contient que des mots isolés (aucune réplique), classés du plus rare au plus courant
d'après leur fréquence dans l'anglais parlé (liste FrequencyWords de Hermit Dave, CC BY-SA 4.0,
la même que tools/build_words.py). Les mots déjà présents dans la banque de l'application sont signalés.
"""
import argparse, collections, json, re, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FREQ_URL = "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt"
FREQ_CACHE = ROOT / "tools" / ".cache" / "en_50k.txt"
SUFFIXES = [("ies", "y"), ("ves", "f"), ("ing", ""), ("ing", "e"), ("ed", ""), ("ed", "e"), ("d", ""),
            ("es", ""), ("s", ""), ("ly", ""), ("er", ""), ("est", "")]


def ranks():
    if not FREQ_CACHE.exists():
        FREQ_CACHE.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FREQ_URL, FREQ_CACHE)
    return {line.split()[0]: i for i, line in enumerate(FREQ_CACHE.read_text(encoding="utf-8").splitlines(), 1) if line.strip()}


def bank():
    known = set()
    for folder in ("words", "words-legal"):
        for f in (ROOT / "app" / folder).glob("*.json"):
            data = json.loads(f.read_text(encoding="utf-8"))
            if isinstance(data, list):
                for w in data:
                    known.update(re.findall(r"[a-z']+", w.get("en", "").lower()))
    return known


def clean(text):
    text = re.sub(r"<[^>]+>|\{[^}]+\}", " ", text)                       # balises de sous-titres
    text = re.sub(r"^\d+\s*$|^.*-->.*$|^WEBVTT.*$", " ", text, flags=re.M)  # numéros et minutages
    return re.sub(r"^[A-Z][A-Z .'-]{2,}:", " ", text, flags=re.M)        # « JOHN: » en tête de réplique


def lemma(word, rank):
    """Ramène une forme fléchie à la forme la plus courante connue (walked -> walk)."""
    best = word
    for suf, rep in SUFFIXES:
        if word.endswith(suf) and len(word) - len(suf) >= 3:
            base = word[: -len(suf)] + rep
            for cand in (base, base[:-1] if len(base) > 3 and base[-1] == base[-2] else base):
                if cand in rank and rank[cand] < rank.get(best, 10**9):
                    best = cand
    return best


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("fichier")
    ap.add_argument("--top", type=int, default=60, help="nombre de mots à sortir")
    ap.add_argument("--min", type=int, default=2, help="occurrences minimales dans le film")
    ap.add_argument("--seuil", type=int, default=3000, help="ignorer les mots plus courants que ce rang")
    a = ap.parse_args()
    raw = clean(Path(a.fichier).read_text(encoding="utf-8", errors="replace"))
    rank, known = ranks(), bank()
    # Un mot qui n'apparaît qu'avec une majuscule en milieu de phrase est traité comme un nom propre.
    lower = set(re.findall(r"\b[a-z][a-z']+\b", raw))
    counts = collections.Counter()
    for w in re.findall(r"\b[A-Za-z][A-Za-z']+\b", raw):
        lw = w.lower().strip("'")
        if lw.endswith("'s"):
            lw = lw[:-2]
        if len(lw) < 3 or "'" in lw or (w[0].isupper() and lw not in lower):
            continue
        counts[lemma(lw, rank)] += 1
    rows = [(rank.get(w, 60000), w, n) for w, n in counts.items() if n >= a.min and w in rank and rank[w] > a.seuil]
    rows.sort(reverse=True)
    print(f"{'mot':<22}{'dans le film':>13}{'rang de fréquence':>20}  déjà dans la banque")
    for r, w, n in rows[: a.top]:
        print(f"{w:<22}{n:>13}{r:>20}  {'oui' if w in known else ''}")
    print(f"\n{len(counts)} mots distincts analysés ; mots absents de la liste de fréquences ignorés (noms propres, inventions).", file=sys.stderr)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Construit la banque de mots de l'application.

Sources : tools/words/<catégorie>.txt, une ligne par mot :
    anglais | français | exemple | niveau (optionnel)
Le niveau CECRL, s'il n'est pas donné, est déduit du rang de fréquence du mot
dans l'anglais parlé (sous-titres OpenSubtitles 2018, liste FrequencyWords
de Hermit Dave, CC BY-SA 4.0).

Sortie : app/words/index.json et app/words/<catégorie>.json.
Usage : python3 tools/build_words.py
"""
import json
import re
import sys
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "tools" / "words"
OUT = ROOT / "app" / "words"
FREQ_URL = "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt"
FREQ_CACHE = ROOT / "tools" / ".cache" / "en_50k.txt"
LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]
# Rang maximal pour chaque niveau.
THRESHOLDS = [("A1", 800), ("A2", 2000), ("B1", 4000), ("B2", 8000), ("C1", 15000)]
STOP = {"to", "a", "an", "the", "of", "in", "on", "at", "for", "with", "up", "off", "out",
        "someone", "something", "you", "i", "it", "is", "do", "be", "my", "your", "that"}


def load_ranks():
    if not FREQ_CACHE.exists():
        FREQ_CACHE.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FREQ_URL, FREQ_CACHE)
    ranks = {}
    for i, line in enumerate(FREQ_CACHE.read_text(encoding="utf-8").splitlines(), 1):
        w = line.split(" ")[0]
        ranks.setdefault(w, i)
    return ranks


def word_rank(w, ranks):
    """Rang du mot, en tenant compte des formes fléchies simples."""
    # Les sous-titres sont surtout américains : on cherche aussi l'orthographe US.
    us = re.sub(r"our$", "or", re.sub(r"ise$", "ize", re.sub(r"tre$", "ter", w)))
    if us != w:
        return min(filter(None, [word_rank(us, ranks), word_rank_exact(w, ranks)]), default=None)
    return word_rank_exact(w, ranks)


def word_rank_exact(w, ranks):
    forms = [w, w + "s", w + "es", w + "ed", w + "d", w + "ing", w[:-1] + "ies" if w.endswith("y") else w]
    found = [ranks[f] for f in forms if f in ranks]
    return min(found) if found else None


# La fréquence à l'oral est une estimation : le niveau donné dans la source prime.
def level_for(en, ranks):
    words = [w for w in re.findall(r"[a-z']+", en.lower()) if w not in STOP] or re.findall(r"[a-z']+", en.lower())
    rs = [word_rank(w, ranks) for w in words]
    if any(r is None for r in rs):
        return "C2"
    rank = max(rs)
    return next((lv for lv, limit in THRESHOLDS if rank <= limit), "C2")


def slug(s):
    s = unicodedata.normalize("NFD", s.lower()).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def main():
    ranks = load_ranks()
    errors = []
    cats = []
    for line in (SRC / "_categories.txt").read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"):
            cid, name, icon, desc = [p.strip() for p in line.split("|")]
            cats.append({"id": cid, "name": name, "icon": icon, "desc": desc})

    seen = {}  # id -> (catégorie, français)
    OUT.mkdir(parents=True, exist_ok=True)
    index = []
    total = 0
    for cat in cats:
        path = SRC / f"{cat['id']}.txt"
        if not path.exists():
            errors.append(f"{cat['id']} : fichier manquant")
            continue
        entries = []
        for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip() or line.startswith("#"):
                continue
            parts = [p.strip() for p in line.split(" | ")]
            where = f"{path.name}:{n}"
            if len(parts) not in (3, 4) or not all(parts[:3]):
                errors.append(f"{where} : format attendu « anglais | français | exemple | niveau? »")
                continue
            en, fr, ex = parts[:3]
            lv = parts[3] if len(parts) == 4 else level_for(en, ranks)
            if lv not in LEVELS:
                errors.append(f"{where} : niveau inconnu « {lv} »")
                continue
            wid = slug(en)
            if wid in seen:
                prev_cat, prev_fr = seen[wid]
                if prev_fr == fr:
                    errors.append(f"{where} : doublon de « {en} » (déjà dans {prev_cat})")
                    continue
                wid = f"{wid}-{slug(fr)}"  # même mot, autre sens (ex. cold : rhume / froid)
                print(f"info : « {en} » a deux sens : {prev_fr} ({prev_cat}) / {fr} ({cat['id']})")
            entry = {"id": wid, "en": en, "fr": fr, "ex": ex, "lv": lv}
            if wid != slug(en):
                entry["alt"] = True  # l'application distingue alors la carte par son sens français
            seen[wid] = (cat["id"], fr)
            entries.append(entry)
        entries.sort(key=lambda e: (LEVELS.index(e["lv"]), e["en"]))
        (OUT / f"{cat['id']}.json").write_text(json.dumps(entries, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        counts = {lv: sum(e["lv"] == lv for e in entries) for lv in LEVELS}
        index.append({**cat, "count": len(entries), "levels": counts})
        total += len(entries)

    (OUT / "index.json").write_text(json.dumps({"total": total, "categories": index}, ensure_ascii=False, indent=1), encoding="utf-8")
    for e in errors:
        print("ERREUR", e, file=sys.stderr)
    by_lv = {lv: sum(c["levels"][lv] for c in index) for lv in LEVELS}
    print(f"{total} mots, {len(index)} catégories · " + " ".join(f"{k}:{v}" for k, v in by_lv.items()))
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()

"""Generate public/og-image.png (1200x630) for Fastty social sharing.

Palette from src/styles/tokens.css + DESIGN.md voltage gradient.
Fonts: Geist Variable + JetBrains Mono Variable via @fontsource-variable.
Run: python3 scripts/og-image.py  (writes public/og-image.png)
"""
from __future__ import annotations

import json
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630

DEEP = (13, 10, 7)
PANEL = (22, 18, 16)
LINE = (42, 36, 30)
CREAM = (236, 228, 216)
MUTED = (154, 141, 126)
SUBTLE = (95, 84, 72)
ORANGE = (255, 157, 0)
YELLOW = (253, 208, 0)
GREEN = (110, 199, 122)
RED = (255, 95, 87)
AMBER_DOT = (254, 188, 46)
GREEN_DOT = (40, 200, 64)

GEIST = ROOT / "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"
MONO = ROOT / "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"
ICON = ROOT / "public/fastySmallIcon.png"


def font(path: Path, size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(path), size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def fetch_version() -> str:
    try:
        req = urllib.request.Request(
            "https://api.github.com/repos/diegoleteliers10/fasty/releases/latest",
            headers={"Accept": "application/vnd.github+json", "User-Agent": "fasty-site"},
        )
        with urllib.request.urlopen(req, timeout=8) as res:
            data = json.load(res)
        tag = data.get("tag_name")
        return tag if isinstance(tag, str) and tag else "v0.13.0"
    except Exception:
        return "v0.13.0"


def tracked_text(draw: ImageDraw.ImageDraw, xy, text, fill, fnt, tracking: int = 0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += int(draw.textlength(ch, font=fnt)) + tracking
    return x


def gradient_text(base: Image.Image, xy, text, fnt, c0, c1):
    x, y = xy
    tmp = ImageDraw.Draw(base)
    asc, desc = fnt.getmetrics()
    tw = int(tmp.textlength(text, font=fnt))
    th = asc + desc
    mask = Image.new("L", (tw + 8, th + 8), 0)
    ImageDraw.Draw(mask).text((4, 4), text, font=fnt, fill=255)
    grad = Image.new("RGB", mask.size)
    gw, gh = mask.size
    px = grad.load()
    for i in range(gw):
        t = i / max(gw - 1, 1)
        px[i, 0] = (
            int(c0[0] + (c1[0] - c0[0]) * t),
            int(c0[1] + (c1[1] - c0[1]) * t),
            int(c0[2] + (c1[2] - c0[2]) * t),
        )
    for j in range(1, gh):
        grad.paste(grad.crop((0, 0, gw, 1)), (0, j))
    base.paste(grad, (x - 4, y - 4), mask)
    return tw


def glow_layer(size, center, radii, color, blur, alpha=110):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    rx, ry = radii
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color + (alpha,))
    return layer.filter(ImageFilter.GaussianBlur(blur))


img = Image.new("RGB", (W, H), DEEP)
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)

for gx in range(0, W + 1, 48):
    od.line([(gx, 0), (gx, H)], fill=(236, 228, 216, 10))
for gy in range(0, H + 1, 48):
    od.line([(0, gy), (W, gy)], fill=(236, 228, 216, 10))

img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
for center, radii, color, blur, alpha in [
    ((950, 110), (300, 200), ORANGE, 110, 110),
    ((1060, 540), (220, 160), YELLOW, 110, 80),
    ((180, 600), (260, 170), (255, 120, 0), 120, 70),
]:
    img = Image.alpha_composite(
        img.convert("RGBA"), glow_layer((W, H), center, radii, color, blur, alpha)
    ).convert("RGB")

# dim grid glow wash back down so glows sit behind content
wash = Image.new("RGB", (W, H), DEEP)
img = Image.blend(wash, img, 0.82)

d = ImageDraw.Draw(img)
version = fetch_version()

geist700_84 = font(GEIST, 84, 700)
geist400_21 = font(GEIST, 21, 400)
mono700_30 = font(MONO, 30, 700)
mono600_15 = font(MONO, 15, 600)
mono600_14 = font(MONO, 14, 600)
mono500_15 = font(MONO, 15, 500)
mono500_13 = font(MONO, 13, 500)
mono400_13 = font(MONO, 13, 400)
mono600_12 = font(MONO, 12, 600)
mono400_12 = font(MONO, 12, 400)
mono600_13 = font(MONO, 13, 600)

# brand row
icon = Image.open(ICON).convert("RGB").resize((52, 52), Image.LANCZOS)
mask = Image.new("L", (52, 52), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, 52, 52], radius=13, fill=255)
img.paste(icon, (72, 56), mask)
d.text((138, 62), "fastty", font=mono700_30, fill=CREAM)
chip_txt = version
cw = int(d.textlength(chip_txt, font=mono600_13)) + 20
cx0 = 138 + int(d.textlength("fastty", font=mono700_30)) + 16
pill = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(pill).rounded_rectangle([cx0, 70, cx0 + cw, 100], radius=6, fill=(255, 157, 0, 22))
img = Image.alpha_composite(img.convert("RGBA"), pill).convert("RGB")
d = ImageDraw.Draw(img)
d.rounded_rectangle([cx0, 70, cx0 + cw, 100], radius=6, outline=(120, 70, 20), width=1)
d.text((cx0 + 10, 74), chip_txt, font=mono600_13, fill=ORANGE)

tracked_text(d, (72, 140), "GPU-ACCELERATED TERMINAL", ORANGE, mono600_15, tracking=3)

d.text((68, 178), "A terminal", font=geist700_84, fill=CREAM)
d.text((68, 268), "that runs", font=geist700_84, fill=CREAM)
gradient_text(img, (68, 358), "at idle.", geist700_84, ORANGE, YELLOW)
d = ImageDraw.Draw(img)

d.text((72, 472), "Rust + GPUI. Sub-1% idle CPU.", font=geist400_21, fill=MUTED)
d.text((72, 500), "Palette, splits, search.", font=geist400_21, fill=MUTED)

chips = [("0.7% IDLE CPU", True), ("GPU RENDER", False), ("RUST", False)]
chx = 72
for label, hot in chips:
    tw = int(d.textlength(label, font=mono600_14))
    pw = tw + (34 if hot else 24)
    chip_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(chip_layer).rounded_rectangle([chx, 540, chx + pw, 576], radius=8, fill=(22, 18, 16, 235))
    img = Image.alpha_composite(img.convert("RGBA"), chip_layer).convert("RGB")
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([chx, 540, chx + pw, 576], radius=8, outline=LINE, width=1)
    tx = chx + 12
    if hot:
        d.ellipse([tx, 553, tx + 9, 562], fill=ORANGE)
        tx += 15
    d.text((tx, 546), label, font=mono600_14, fill=CREAM if hot else MUTED)
    chx += pw + 10

# terminal card
TX0, TY0, TX1, TY1 = 716, 64, 1128, 566
card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(card).rounded_rectangle([TX0, TY0, TX1, TY1], radius=16, fill=(22, 18, 16, 245))
img = Image.alpha_composite(img.convert("RGBA"), card).convert("RGB")
d = ImageDraw.Draw(img)
d.rounded_rectangle([TX0, TY0, TX1, TY1], radius=16, outline=LINE, width=1)

for i, c in enumerate([RED, AMBER_DOT, GREEN_DOT]):
    d.ellipse([738 + i * 20, 88, 738 + i * 20 + 12, 100], fill=c)
tab_txt = "~/projects/fastty"
tab_w = int(d.textlength(tab_txt, font=mono400_12)) + 22
d.rounded_rectangle([806, 82, 806 + tab_w, 106], radius=5, outline=LINE, width=1)
d.text((817, 85), tab_txt, font=mono400_12, fill=CREAM)
stat = "0.7% cpu"
d.text((TX1 - 14 - d.textlength(stat, font=mono600_12), 85), stat, font=mono600_12, fill=MUTED)
d.line([(TX0, 120), (TX1, 120)], fill=LINE, width=1)

mono700_15 = font(MONO, 15, 700)
mono400_15 = font(MONO, 15, 400)
mono600_15b = font(MONO, 15, 600)
mono400_13b = font(MONO, 13, 400)
lx = TX0 + 26
ly = 142
lh = 34
d.text((lx, ly), ">", font=mono700_15, fill=ORANGE)
d.text((lx + 24, ly), "cargo bench --release", font=mono400_15, fill=CREAM)
ly += lh
d.text((lx, ly), "Finished release in 1.46s", font=mono400_13b, fill=SUBTLE)
ly += lh - 4
d.text((lx, ly), "parser_plain", font=mono400_15, fill=MUTED)
val = "23.82 us"
d.text((lx + 250 - d.textlength(val, font=mono600_15b), ly), val, font=mono600_15b, fill=CREAM)
ly += lh
d.text((lx, ly), "parser_sgr", font=mono400_15, fill=MUTED)
val2 = "40.95 us"
d.text((lx + 250 - d.textlength(val2, font=mono600_15b), ly), val2, font=mono600_15b, fill=YELLOW)
ly += lh
d.text((lx, ly), "OK", font=mono700_15, fill=GREEN)
d.text((lx + 34, ly), "spawned tab", font=mono400_15, fill=CREAM)
tm = "in 0.8 ms"
d.text((lx + 250 - d.textlength(tm, font=mono600_15b), ly), tm, font=mono600_15b, fill=ORANGE)
ly += lh + 6
d.text((lx, ly), ">", font=mono700_15, fill=ORANGE)
d.rectangle([lx + 24, ly + 3, lx + 35, ly + 21], fill=ORANGE)

d.line([(TX0, 516), (TX1, 516)], fill=LINE, width=1)
d.text((TX0 + 20, 526), "main  ^2", font=mono600_12, fill=CREAM)
d.text((TX0 + 118, 526), "@3", font=mono600_12, fill=YELLOW)
kube = "kube: prod"
d.text((TX1 - 20 - d.textlength(kube, font=mono400_12), 526), kube, font=mono400_12, fill=MUTED)

d.text((72, 592), "macOS - LINUX - WINDOWS", font=mono500_13, fill=SUBTLE)
foot_r = "RUST - GPUI - ALACRITTY"
d.text((W - 72 - d.textlength(foot_r, font=mono500_13), 592), foot_r, font=mono500_13, fill=SUBTLE)

d.rectangle([0, 0, W - 1, H - 1], outline=LINE, width=1)

out = ROOT / "public/og-image.png"
img.save(out)
print(f"wrote {out} ({W}x{H}) version={version}")

#!/usr/bin/env python3
"""
Regenerate the PWA PNG icons from icons/icon.svg.

No third-party deps: uses macOS `qlmanage` (QuickLook) to rasterize the SVG,
then `sips` (built in) to resize to each target. Run from the project root:

    python3 tools/gen_icons.py

Produces in icons/:
    icon-192.png, icon-512.png, maskable-512.png, apple-touch-icon-180.png

If you are not on macOS, rasterize icons/icon.svg with any tool
(rsvg-convert, Inkscape, an online converter) at 512x512 and downscale.
"""
import os, subprocess, shutil, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, "icons")
SVG = os.path.join(ICONS, "icon.svg")
TARGETS = {  # filename -> size
    "icon-512.png": 512,
    "maskable-512.png": 512,   # icon.svg already has a full-bleed safe background
    "icon-192.png": 192,
    "apple-touch-icon-180.png": 180,
}

def run(*args):
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def main():
    if not shutil.which("qlmanage") or not shutil.which("sips"):
        sys.exit("qlmanage/sips not found — this script needs macOS. See the module docstring.")
    with tempfile.TemporaryDirectory() as tmp:
        # qlmanage renders <name>.svg -> <name>.svg.png at max dimension 1024
        run("qlmanage", "-t", "-s", "1024", "-o", tmp, SVG)
        base = os.path.join(tmp, "icon.svg.png")
        if not os.path.exists(base):
            sys.exit("qlmanage did not produce a thumbnail; render icon.svg manually.")
        for name, size in TARGETS.items():
            out = os.path.join(ICONS, name)
            shutil.copyfile(base, out)
            run("sips", "-z", str(size), str(size), out)
            print("wrote", os.path.relpath(out, ROOT))

if __name__ == "__main__":
    main()

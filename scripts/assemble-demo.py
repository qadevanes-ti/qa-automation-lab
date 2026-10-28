"""Monta a animação com capturas reais feitas pelo Playwright."""
from pathlib import Path
import sys
from PIL import Image

folder, output = Path(sys.argv[1]), Path(sys.argv[2])
frames = []
for source in sorted(folder.glob('*.png'), key=lambda p: int(p.stem)):
    with Image.open(source) as image:
        frames.append(image.convert('RGB'))
if not frames:
    raise SystemExit('Nenhuma captura encontrada.')
frames[0].save(output, save_all=True, append_images=frames[1:],
               duration=[1800] * (len(frames) - 1) + [3000], loop=0)

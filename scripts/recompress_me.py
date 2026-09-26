"""Recompress me.jpg to be smaller (target <150KB per audit)."""
from PIL import Image
import os

src = "/home/z/my-project/public/images/me/me.jpg"
img = Image.open(src)

# Downscale to 800x1000 (display is max 340-400px wide; this is plenty)
img.thumbnail((800, 1000), Image.Resampling.LANCZOS)

# Save with lower quality
img.save(src, "JPEG", quality=70, optimize=True, progressive=True)
print(f"Recompressed: {src} ({os.path.getsize(src)} bytes)")

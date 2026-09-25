"""Generate placeholder me.jpg and cv.pdf for the portfolio.
The user will replace these with their real photo and CV later.
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = "/home/z/my-project/public"

# --- Generate me.jpg (portrait, 1200x1500) ---
img = Image.new("RGB", (1200, 1500), color=(10, 10, 10))
draw = ImageDraw.Draw(img)

# Background gradient (manual)
for y in range(1500):
    t = y / 1500
    r = int(28 + (10 - 28) * t)
    g = int(28 + (10 - 28) * t)
    b = int(28 + (10 - 28) * t)
    draw.line([(0, y), (1200, y)], fill=(r, g, b))

# Accent diagonal wash
overlay = Image.new("RGBA", (1200, 1500), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for i in range(200):
    alpha = int(80 * (1 - abs(i - 100) / 100))
    od.line([(i * 8, 0), (i * 8 + 1200, 1500)], fill=(184, 69, 31, alpha))
img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)

# Stylized portrait silhouette (head + shoulders)
cx, cy = 600, 580
draw.pieslice([cx - 280, cy + 80, cx + 280, cy + 700], 0, 180, fill=(244, 241, 234))
draw.ellipse([cx - 150, cy - 200, cx + 150, cy + 100], fill=(244, 241, 234))

# Subtle dots pattern overlay
for x in range(0, 1200, 40):
    for y in range(0, 1500, 40):
        draw.point([x, y], fill=(244, 241, 234))

# Name + label
try:
    font_name = ImageFont.truetype("/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.otf", 60)
    font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 22)
except Exception:
    font_name = ImageFont.load_default()
    font_label = ImageFont.load_default()

# Add a darker band for text contrast
draw.rectangle([(0, 1330), (1200, 1500)], fill=(10, 10, 10))

# Name centered
name_text = "AMZAD PINSO"
bbox = draw.textbbox((0, 0), name_text, font=font_name)
w = bbox[2] - bbox[0]
draw.text(((1200 - w) / 2, 1340), name_text, font=font_name, fill=(244, 241, 234))

label_text = "PLACEHOLDER · REPLACE WITH YOUR PHOTO"
bbox2 = draw.textbbox((0, 0), label_text, font=font_label)
w2 = bbox2[2] - bbox2[0]
draw.text(((1200 - w2) / 2, 1430), label_text, font=font_label, fill=(244, 241, 234))

out_jpg = os.path.join(OUT_DIR, "images", "me", "me.jpg")
os.makedirs(os.path.dirname(out_jpg), exist_ok=True)
img.save(out_jpg, "JPEG", quality=92, optimize=True)
print(f"Created: {out_jpg} ({os.path.getsize(out_jpg)} bytes)")

# --- Generate cv.pdf placeholder ---
out_pdf = os.path.join(OUT_DIR, "pdf", "cv.pdf")
os.makedirs(os.path.dirname(out_pdf), exist_ok=True)

pdf_text = """%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 380 >>
stream
BT /F1 24 Tf 60 760 Td (Amzad Pinso - CV Placeholder) Tj ET
BT /F1 14 Tf 60 720 Td (This is a placeholder CV file. Replace public/pdf/cv.pdf) Tj ET
BT /F1 14 Tf 60 700 Td (with your actual CV PDF document.) Tj ET
BT /F1 12 Tf 60 660 Td (Contact: contact.amzadpinso@gmail.com) Tj ET
BT /F1 12 Tf 60 640 Td (LinkedIn: linkedin.com/in/amzad-pinso) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000060 00000 n
0000000110 00000 n
0000000210 00000 n
0000000650 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
720
%%EOF
"""
with open(out_pdf, "w", encoding="latin-1") as f:
    f.write(pdf_text)
print(f"Created: {out_pdf} ({os.path.getsize(out_pdf)} bytes)")
print("Done.")

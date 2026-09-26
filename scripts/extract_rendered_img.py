"""Extract the rendered hero <img> element's pixels and save to a PNG file.
Uses agent-browser to get the data URL, then decodes it to a PNG file."""
import subprocess
import base64
import os

out_dir = "/home/z/my-project/download/redesign/real-photos"
os.makedirs(out_dir, exist_ok=True)

# Get the data URL from agent-browser
result = subprocess.run(
    ["agent-browser", "eval", """
const heroImg = document.querySelector('section#hero img');
const heroCanvas = document.createElement('canvas');
const heroRect = heroImg.getBoundingClientRect();
heroCanvas.width = Math.floor(heroRect.width);
heroCanvas.height = Math.floor(heroRect.height);
const heroCtx = heroCanvas.getContext('2d');
heroCtx.drawImage(heroImg, 0, 0, heroCanvas.width, heroCanvas.height);
heroCanvas.toDataURL('image/png');
"""],
    capture_output=True,
    text=True,
    timeout=30,
)

# Parse the data URL from the result
output = result.stdout.strip()
# The output looks like: "data:image/png;base64,iVBOR..."
# Strip the surrounding quotes
if output.startswith('"') and output.endswith('"'):
    output = output[1:-1]

if not output.startswith("data:image/png;base64,"):
    print(f"ERROR: Unexpected output: {output[:200]}")
    print(f"stderr: {result.stderr[:500]}")
    exit(1)

# Extract base64 data
b64_data = output.replace("data:image/png;base64,", "")
png_bytes = base64.b64decode(b64_data)

out_path = os.path.join(out_dir, "rendered-hero-img.png")
with open(out_path, "wb") as f:
    f.write(png_bytes)

print(f"Saved rendered hero <img> to: {out_path} ({len(png_bytes)} bytes)")

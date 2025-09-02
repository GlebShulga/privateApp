# Creating Optimized OG Images

## Current Issue
Social media platforms require PNG/JPG images for og:image, not SVG. The current images need to be:
- **Dimensions**: 1200x630px (1.91:1 aspect ratio)
- **Format**: PNG or JPG
- **Size**: Under 300KB for optimal loading

## Quick Solution Options

### Option 1: Use Online Tools
1. Go to [Canva](https://canva.com) or [Figma](https://figma.com)
2. Create 1200x630px canvas
3. Add gradient background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
4. Add portrait image (circular crop)
5. Add text: "Gleb Shulga - Frontend Developer"
6. Export as PNG/JPG

### Option 2: Use Existing Images (Temporary Fix)
Currently using `portrait_light.jpg` which is 990x1024px (not optimal ratio)

### Option 3: Command Line (if ImageMagick available)
```bash
# Install ImageMagick first
sudo apt install imagemagick

# Create og-home.jpg
convert -size 1200x630 xc:'#667eea' \
  \( public/assets/portrait_light.jpg -resize 200x200^ -gravity center -extent 200x200 -repage +0+0 \) \
  -gravity west -geometry +100+0 -composite \
  -font Arial-Bold -pointsize 48 -fill white -gravity center -geometry +200-50 \
  -annotate +0+0 "Gleb Shulga" \
  -font Arial -pointsize 28 -fill white -gravity center -geometry +200+0 \
  -annotate +0+0 "Frontend Developer" \
  -font Arial -pointsize 20 -fill white -gravity center -geometry +200+50 \
  -annotate +0+0 "React • Next.js • TypeScript" \
  public/assets/og-home.jpg
```

## Files Needed
- `public/assets/og-home.jpg` (1200x630px)
- `public/assets/og-3d-text.jpg` (1200x630px)

## Current Temporary Fix
Using existing portrait image until proper og:images are created.
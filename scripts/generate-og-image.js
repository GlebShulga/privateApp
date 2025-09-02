const fs = require('fs');

// Create a simple HTML file that can be used to generate og:image
const createOGImageHTML = (title, subtitle, description, bgGradient, outputFile) => {
  const html = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            width: 1200px;
            height: 630px;
            background: ${bgGradient};
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            display: flex;
            align-items: center;
            gap: 40px;
            padding: 40px;
        }
        .avatar {
            width: 200px;
            height: 200px;
            border-radius: 100px;
            background-image: url('./portrait_light.jpg');
            background-size: cover;
            background-position: center;
            border: 4px solid white;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .content {
            max-width: 600px;
        }
        .title {
            font-size: 48px;
            font-weight: 700;
            margin: 0 0 16px 0;
            line-height: 1.1;
        }
        .subtitle {
            font-size: 28px;
            font-weight: 400;
            margin: 0 0 16px 0;
            opacity: 0.9;
        }
        .description {
            font-size: 20px;
            font-weight: 300;
            margin: 0;
            opacity: 0.8;
            line-height: 1.3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="avatar"></div>
        <div class="content">
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>
            <p class="description">${description}</p>
        </div>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(outputFile, html);
  console.log(`Created ${outputFile}`);
  console.log(`To generate PNG: Open in browser and take screenshot at 1200x630px`);
};

// Generate og:image HTML templates
createOGImageHTML(
  'Gleb Shulga',
  'Frontend Developer',
  'React • Next.js • TypeScript • 5+ years experience',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'og-home-template.html'
);

createOGImageHTML(
  '3D Text',
  'Interactive Three.js Experience',
  'Explore 3D typography with WebGL rendering, orbital controls, and dynamic lighting',
  'linear-gradient(135deg, #16213e 0%, #0f3460 50%, #16213e 100%)',
  'og-3d-text-template.html'
);

console.log('\nNext steps:');
console.log('1. Open each HTML file in browser');
console.log('2. Resize browser to 1200x630px');
console.log('3. Take screenshot');
console.log('4. Save as og-home.jpg and og-3d-text.jpg in public/assets/');
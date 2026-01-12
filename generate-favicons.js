import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function generateFavicons() {
  console.log('🎨 Generating SignFlow favicons...\n');

  const BLACK = '#000000';
  const WHITE = '#FFFFFF';

  // Function to create favicon at different sizes
  function createFavicon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background - black
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, size, size);

    // White border/frame
    const borderWidth = Math.max(2, Math.floor(size * 0.08));
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, size - borderWidth, size - borderWidth);

    // Add "SF" text - white
    ctx.fillStyle = WHITE;
    ctx.font = `bold ${size * 0.5}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SF', size / 2, size / 2);

    return canvas;
  }

  // Generate 16x16 favicon
  const favicon16 = createFavicon(16);
  writeFileSync(join('./public', 'favicon-16x16.png'), favicon16.toBuffer('image/png'));
  console.log('✅ Created favicon-16x16.png');

  // Generate 32x32 favicon
  const favicon32 = createFavicon(32);
  writeFileSync(join('./public', 'favicon-32x32.png'), favicon32.toBuffer('image/png'));
  console.log('✅ Created favicon-32x32.png');

  // Generate 48x48 favicon
  const favicon48 = createFavicon(48);
  writeFileSync(join('./public', 'favicon-48x48.png'), favicon48.toBuffer('image/png'));
  console.log('✅ Created favicon-48x48.png');

  // Generate main favicon.ico (32x32)
  writeFileSync(join('./public', 'favicon.png'), favicon32.toBuffer('image/png'));
  console.log('✅ Created favicon.png');

  // Generate apple-touch-icon if not exists (already created, but ensure it's updated)
  const appleIcon = createFavicon(180);
  writeFileSync(join('./public', 'apple-touch-icon.png'), appleIcon.toBuffer('image/png'));
  console.log('✅ Updated apple-touch-icon.png');

  console.log('\n✨ All favicons generated successfully!');
  console.log('\nNote: Convert favicon.png to favicon.ico using an online tool like:');
  console.log('https://convertio.co/png-ico/');
  console.log('Or use: npm install -g sharp-cli && sharp-cli -i public/favicon.png -o public/favicon.ico');
}

generateFavicons().catch(console.error);


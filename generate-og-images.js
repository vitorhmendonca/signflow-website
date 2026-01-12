import { createCanvas, loadImage } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;
const PRIMARY_COLOR = '#4A90E2'; // Based on --primary: 217 91% 60%
const DARK_BG = '#1E293B'; // Based on --hero-bg
const WHITE = '#FFFFFF';
const CYAN = '#7DD3FC'; // Based on --cyan

async function generateOGImage(config) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, config.gradientStart || DARK_BG);
  gradient.addColorStop(1, config.gradientEnd || '#0F172A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add subtle grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < WIDTH; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, HEIGHT);
    ctx.stroke();
  }
  for (let i = 0; i < HEIGHT; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(WIDTH, i);
    ctx.stroke();
  }

  // Add logo if exists
  try {
    const logo = await loadImage('./src/assets/signflow-logo-square.png');
    const logoSize = 80;
    ctx.drawImage(logo, 60, 50, logoSize, logoSize);
  } catch (e) {
    // If logo fails, just add text logo
    ctx.fillStyle = WHITE;
    ctx.font = 'bold 36px Inter, Arial, sans-serif';
    ctx.fillText('SignFlow', 60, 100);
  }

  // Main headline
  ctx.fillStyle = WHITE;
  ctx.font = 'bold 72px Inter, Arial, sans-serif';
  ctx.textAlign = 'left';
  
  const lines = config.headline.split('\n');
  let y = config.headlineY || 280;
  lines.forEach((line, index) => {
    if (config.highlightFirstLine && index === 0) {
      ctx.fillStyle = CYAN;
    } else {
      ctx.fillStyle = WHITE;
    }
    ctx.fillText(line, 60, y + (index * 85));
  });

  // Subheadline
  if (config.subheadline) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '32px Inter, Arial, sans-serif';
    ctx.fillText(config.subheadline, 60, y + (lines.length * 85) + 40);
  }

  // CTA or branding at bottom
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = 'bold 28px Inter, Arial, sans-serif';
  ctx.fillText(config.footer || 'signflow.us', 60, HEIGHT - 60);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  writeFileSync(join('./public', config.filename), buffer);
  console.log(`✅ Created ${config.filename}`);
}

async function generateAllImages() {
  console.log('🎨 Generating OG images...\n');

  // 1. Homepage OG Image
  await generateOGImage({
    filename: 'og-image.jpg',
    headline: 'Get More Business\nSignage Projects',
    subheadline: 'Lead Generation for Sign Companies',
    footer: 'signflow.us',
    headlineY: 280
  });

  // 2. Case Study Volumes
  await generateOGImage({
    filename: 'og-case-study-volumes.jpg',
    headline: '5.45x ROI\n$1M Lead Value',
    subheadline: '363 Leads in 6 Months',
    footer: 'SignFlow Case Study',
    highlightFirstLine: true,
    headlineY: 260
  });

  // 3. Case Study Projects
  await generateOGImage({
    filename: 'og-case-study-projects.jpg',
    headline: '3.83x ROI\n$28.7K Revenue',
    subheadline: 'From First 100 Leads',
    footer: 'SignFlow Case Study',
    highlightFirstLine: true,
    headlineY: 260
  });

  // 4. Gallery
  await generateOGImage({
    filename: 'og-gallery.jpg',
    headline: 'SignFlow\nProject Gallery',
    subheadline: 'Success Stories & Completed Projects',
    footer: 'signflow.us/gallery',
    headlineY: 280
  });

  console.log('\n✨ All OG images generated successfully!\n');
}

generateAllImages().catch(console.error);


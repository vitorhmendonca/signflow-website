const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://signflow.us';
const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.ts');
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/case-study/volumes', priority: '0.8', changefreq: 'monthly' },
    { path: '/case-study/projects', priority: '0.8', changefreq: 'monthly' },
    { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Read Blog Posts
    let blogPosts = [];
    try {
        const fileContent = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');

        // Regex to find slugs and dates
        // Matches: slug: "some-slug", ... date: "2024-01-01"
        // We assume standard formatting from the file we viewed independently
        const slugRegex = /slug:\s*"([^"]+)"/g;
        const dateRegex = /date:\s*"([^"]+)"/g;

        let slugMatch;
        // We'll collect all slugs first, assuming dates appear in the same order/blocks
        // This is simple parsing. For robust parsing we'd parse objects, but this is sufficient for this file structure.

        // Improved Regex: Match the block to be safer
        // { ... slug: "..." ... date: "..." ... }
        // Using simple split by "{" might be better

        const objectBlocks = fileContent.split('  {').slice(1); // skip export line

        objectBlocks.forEach(block => {
            const slugM = block.match(/slug:\s*"([^"]+)"/);
            const dateM = block.match(/date:\s*"([^"]+)"/);

            if (slugM && dateM) {
                blogPosts.push({
                    slug: slugM[1],
                    date: dateM[1]
                });
            }
        });

        console.log(`Found ${blogPosts.length} blog posts.`);
    } catch (error) {
        console.error('Error reading blog posts:', error);
    }

    // 2. Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Static Pages
    const today = new Date().toISOString().split('T')[0];
    staticRoutes.forEach(route => {
        xml += `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Blog Posts
    blogPosts.forEach(post => {
        xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    // 3. Write File
    fs.writeFileSync(OUTPUT_PATH, xml);
    console.log(`Sitemap written to ${OUTPUT_PATH}`);
}

generateSitemap();

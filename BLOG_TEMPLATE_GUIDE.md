# Blog Template Guide

## How to Add a New Blog Post

1. Open `src/data/blogPosts.ts`
2. **Copy the "Standard Blog Template" object** (the one with `slug: "standard-blog-template"`). This contains the latest standard structure with placeholder content.
3. Paste it into the `blogPosts` array (at the top, or anywhere, standard sort is by date).
4. Update all the fields with your new content:

### Required Fields:
- **slug**: URL-friendly version of your title (e.g., "how-to-grow-sign-business"). **Must be unique.**
- **title**: The main headline of your blog post
- **description**: A brief summary (used for SEO and preview cards)
- **author**: Author name (e.g., "SignFlow Team")
- **date**: Publication date in format "YYYY-MM-DD"
- **readTime**: Estimated reading time in minutes
- **content.introduction**: Opening paragraph that hooks the reader
- **content.sections**: Array of sections, each with:
  - `headline`: Section title
  - `body`: Section content (use `\n\n` for paragraph breaks)
  - `image`: (Optional) Path to section image
  - `imageAlt`: (Optional) Alt text for the image. **Required if image is present.**

### Optional Fields:
- **category**: Category name (e.g., "Industry Insights", "Case Studies")
- **tags**: Array of tag strings (e.g., ["signage", "business"])
- **featuredImage**: Path to the main featured image
- **ogImage**: Path to the Open Graph image for social sharing
- **content.conclusion**: Closing paragraph

## Example Structure (Standard Template)

```typescript
{
  slug: "my-new-post",
  title: "My New Blog Post Title",
  description: "A brief description of what this post is about",
  author: "SignFlow Team",
  date: "2026-01-20",
  readTime: 7,
  category: "Industry Insights",
  tags: ["signage", "marketing"],
  featuredImage: "/path-to-image.jpg",
  ogImage: "/path-to-og-image.jpg",
  content: {
    introduction: "Your opening paragraph here...",
    sections: [
      {
        headline: "First Section",
        body: "Content for first section.\n\nNew paragraph here.",
      },
      {
        headline: "Second Section",
        body: "Content for second section.",
        image: "/section-image.jpg",
        imageAlt: "Description of image",
      },
      // ... typically 5 sections total
    ],
    conclusion: "Your closing thoughts here...",
  },
}
```

## Tips

- **Structure**: Try to stick to the 5-section format with ideally 2-3 images interspersed.
- **Images**: Use wide, high-quality images. Placeholders are fine during draft.
- **Formatting**: Use double newlines `\n\n` for paragraphs. Use `• ` for bullet points within strings.
- **Validation**: Check the site locally to ensure `slug` works and images load.

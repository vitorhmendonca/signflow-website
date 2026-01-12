export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string; // ISO date string (e.g., "2025-01-15")
  readTime: number; // in minutes
  category?: string;
  tags?: string[];
  featuredImage?: string;
  ogImage?: string;
  content: BlogContent;
  faqs?: FAQ[];
}

export interface BlogContent {
  introduction: string;
  sections: BlogSection[];
  conclusion?: string;
}

export interface BlogSection {
  headline: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

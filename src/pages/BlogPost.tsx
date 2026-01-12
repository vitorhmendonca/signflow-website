import { useParams } from "react-router-dom";
import { getBlogPostBySlug } from "@/data/blogPosts";
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <NotFound />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return <BlogPostTemplate post={post} />;
};

export default BlogPost;

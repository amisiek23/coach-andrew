import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string): BlogPost | null {
  try {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString().slice(0, 10),
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage,
      author: data.author,
      content,
    };
  } catch {
    return null;
  }
}

/** Return all post metadata sorted by date descending. */
export function getAllPosts(limit?: number): BlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  const posts = files
    .map((f) => readPostFile(f))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (limit ? posts.slice(0, limit) : posts).map(({ content: _c, ...meta }) => meta);
}

/** Return a single post (meta + raw MDX content), or null if not found. */
export function getPost(slug: string): BlogPost | null {
  for (const ext of ["mdx", "md"]) {
    const post = readPostFile(`${slug}.${ext}`);
    if (post) return post;
  }
  return null;
}

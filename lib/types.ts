export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string; // ISO string e.g. "2025-11-01"
  excerpt: string;
  coverImage?: string; // URL or /public path
  author?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string; // raw MDX string
}

// Normalised nav link used in components
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

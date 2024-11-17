
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsPath = path.join(process.cwd(), 'markdown');

export async function searchBlogs(query) {
  const terms = query.toLowerCase().split(' ');

  // Load and parse blogs.json
  const blogsJsonPath = path.join(blogsPath, 'blogs.json');
  const blogsMetadata = JSON.parse(fs.readFileSync(blogsJsonPath, 'utf-8'));

  // Load and parse markdown files
  const blogFiles = fs.readdirSync(blogsPath).filter(file => file.endsWith('.md'));
  const blogsContent = blogFiles.map(file => {
    const filePath = path.join(blogsPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { ...data, content };
  });

  // Combine metadata and content for full search
  const allBlogs = [...blogsMetadata, ...blogsContent];

  // Filter blogs based on query terms (matching all terms)
  const results = allBlogs.filter(blog =>
    terms.every(term =>
      (blog.title?.toLowerCase().includes(term)) ||
      (blog.description?.toLowerCase().includes(term)) ||
      (blog.tags?.join(' ').toLowerCase().includes(term)) ||
      (blog.category?.toLowerCase().includes(term)) ||
      (blog.content?.toLowerCase().includes(term))
    )
  );

  return results;
}

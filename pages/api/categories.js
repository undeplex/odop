import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Get the file path
    const filePath = path.join(process.cwd(), 'markdown', 'blogs.json');

    // Read the JSON file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogs = JSON.parse(fileContents);

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(blogs.map((blog) => blog.category)));

    res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error('Error reading blogs.json:', error);
    res.status(500).json({ error: 'Failed to load categories' });
  }
}
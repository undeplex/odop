
import { useEffect, useState } from 'react';

const TOC = ({ content }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // Wait until the DOM is ready and headings are available.
    const headings = Array.from(document.querySelectorAll('h2, h3')); // Add more heading levels as needed
    const tocItems = headings.map((heading) => ({
      text: heading.innerText,
      id: heading.id,
      level: heading.tagName, // "H2", "H3", etc.
    }));
    setToc(tocItems);
  }, [content]); // Re-run when content changes

  return (
    <nav className="mb-10 overflow-y-scroll  max-h-[360px]">
      <ul>
        {toc.map(({ id, text, level }) => (
          <ol key={id} className={`list-none ml-${level === 'H3' ? 4 : 0}`}> {/* Indent H3 elements */}
            <a href={`#${id}`} className="text-blue-500 hover:underline">
              {text}
            </a>
          </ol>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;

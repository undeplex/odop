

const CodeBlockWithCopy = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 bg-gray-800 text-white px-2 py-1 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="bg-gray-100 p-4 rounded">{code}</pre>
    </div>
  );
};

export default CodeBlockWithCopy;

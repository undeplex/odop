// components/SearchForm.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-4">
      <input
        type="text"
        className="bg-transparent border-none"
        placeholder="Type to search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 p-2 dark:text-white text-gray-600 rounded"
        disabled={!searchTerm.trim()}
      >
        <Search/>
      </button>
    </form>
  );
}
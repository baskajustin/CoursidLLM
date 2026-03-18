"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "Search for anything", className = "" }: SearchBarProps) {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#1c1d1f] rounded pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-blue-200 transition-colors duration-150"
      />
      <svg
        className="absolute left-3 w-4 h-4 text-[#6a6f73] pointer-events-none"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <button
        type="submit"
        className="absolute right-0 h-full px-4 bg-[#0056d2] hover:bg-[#004ab3] text-white rounded-r text-sm font-semibold transition-colors duration-150"
      >
        Search
      </button>
    </form>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const AUDIENCE_TABS = [
  { label: "Individuals", href: "/?audience=individuals" },
  { label: "Businesses", href: "/?audience=businesses" },
  { label: "Universities", href: "/?audience=universities" },
  { label: "Governments", href: "/?audience=governments" },
];

const COURSE_CATEGORIES = [
  { name: "Technology", items: ["Web Development", "Data Science", "Machine Learning", "Cloud Computing", "Cybersecurity"] },
  { name: "Design", items: ["UX/UI Design", "Graphic Design", "Motion Graphics", "3D Design"] },
  { name: "Business", items: ["Entrepreneurship", "Finance", "Marketing", "Leadership", "Project Management"] },
];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "AR", label: "العربية" },
  { code: "FR", label: "Français" },
  { code: "ES", label: "Español" },
  { code: "ZH", label: "中文" },
];

export default function SiteHeader() {
  const [activeAudience, setActiveAudience] = useState("Individuals");
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const [searchValue, setSearchValue] = useState("");

  const coursesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Audience bar */}
      <div className="bg-[#1c1d1f] h-9 flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full flex items-center gap-6">
          <nav className="flex items-center gap-0" aria-label="Audience">
            {AUDIENCE_TABS.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                onClick={() => setActiveAudience(tab.label)}
                className={`text-xs font-medium px-3 h-9 flex items-center transition-colors duration-150 ${
                  activeAudience === tab.label
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-[#d1d7dc] h-14 flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 mr-2">
            <span className="text-[#0056d2] font-extrabold text-xl tracking-tight">
              Coursid<span className="text-[#a435f0]">LLM</span>
            </span>
          </Link>

          {/* Courses dropdown */}
          <div ref={coursesRef} className="relative hidden md:block shrink-0">
            <button
              onClick={() => { setCoursesOpen((v) => !v); setLangOpen(false); }}
              className="flex items-center gap-1 text-sm font-semibold text-[#1c1d1f] hover:text-[#0056d2] transition-colors duration-150 py-2"
              aria-expanded={coursesOpen}
            >
              Courses
              <svg
                className={`w-4 h-4 transition-transform duration-150 ${coursesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {coursesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-[#d1d7dc] rounded-xl shadow-xl p-5 min-w-[480px] grid grid-cols-3 gap-6 z-50">
                {COURSE_CATEGORIES.map((cat) => (
                  <div key={cat.name}>
                    <h3 className="text-xs font-bold text-[#1c1d1f] uppercase tracking-wider mb-2">{cat.name}</h3>
                    <ul className="space-y-1">
                      {cat.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/catalog?category=${encodeURIComponent(cat.name)}&topic=${encodeURIComponent(item)}`}
                            onClick={() => setCoursesOpen(false)}
                            className="text-sm text-[#3d3d3d] hover:text-[#0056d2] block py-0.5 transition-colors duration-150"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-3 pt-3 border-t border-[#d1d7dc]">
                  <Link
                    href="/catalog"
                    onClick={() => setCoursesOpen(false)}
                    className="text-sm text-[#0056d2] font-semibold hover:underline"
                  >
                    Browse all courses →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Skills & Career Builder links */}
          <Link href="/skills" className="hidden lg:block text-sm font-semibold text-[#1c1d1f] hover:text-[#0056d2] transition-colors duration-150 shrink-0">
            Skills Builder
          </Link>
          <Link href="/careers" className="hidden lg:block text-sm font-semibold text-[#1c1d1f] hover:text-[#0056d2] transition-colors duration-150 shrink-0">
            Career Builder
          </Link>

          {/* Search bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = `/catalog?q=${encodeURIComponent(searchValue)}`; }}
            className="flex-1 flex items-center"
          >
            <div className="relative flex items-center w-full">
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for anything"
                className="w-full border border-[#1c1d1f] rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-blue-200 transition-colors duration-150"
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
                className="absolute right-0 h-full px-3 bg-[#1c1d1f] hover:bg-[#0056d2] text-white rounded-r transition-colors duration-150"
                aria-label="Search"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>
          </form>

          {/* Language switcher */}
          <div ref={langRef} className="relative hidden md:block shrink-0">
            <button
              onClick={() => { setLangOpen((v) => !v); setCoursesOpen(false); }}
              className="flex items-center gap-1.5 border border-[#d1d7dc] rounded px-2.5 py-1.5 text-xs font-semibold text-[#3d3d3d] hover:border-[#1c1d1f] transition-colors duration-150"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <svg className="w-4 h-4 text-[#6a6f73]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {activeLang}
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#d1d7dc] rounded-xl shadow-xl py-1 min-w-[140px] z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeLang === lang.code
                        ? "text-[#0056d2] font-semibold bg-blue-50"
                        : "text-[#3d3d3d] hover:bg-[#f7f9fa]"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth buttons */}
          <Link href="/login" className="hidden md:block text-sm font-semibold text-[#1c1d1f] hover:text-[#0056d2] transition-colors duration-150 shrink-0">
            Log In
          </Link>
          <Link
            href="/signup"
            className="hidden md:flex items-center border border-[#0056d2] text-[#0056d2] hover:bg-[#0056d2] hover:text-white font-semibold text-sm px-4 py-1.5 rounded transition-colors duration-150 shrink-0"
          >
            Join for Free
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden ml-auto p-2 text-[#1c1d1f]" aria-label="Open menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

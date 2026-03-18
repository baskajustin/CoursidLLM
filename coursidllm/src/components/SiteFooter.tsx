import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Courses", href: "/catalog" },
    { label: "Skills Builder", href: "/skills" },
    { label: "Career Builder", href: "/careers" },
    { label: "AI Tutor", href: "/about#ai-tutor" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/company/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Audiences: [
    { label: "For Individuals", href: "/?audience=individuals" },
    { label: "For Businesses", href: "/?audience=businesses" },
    { label: "For Universities", href: "/?audience=universities" },
    { label: "For Governments", href: "/?audience=governments" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="bg-[#1c1d1f] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-white font-extrabold text-xl tracking-tight">
                Coursid<span className="text-[#a435f0]">LLM</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered learning for individuals, businesses, universities, and governments.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CoursidLLM. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {[
              { label: "Twitter/X", href: "#", icon: "𝕏" },
              { label: "LinkedIn", href: "#", icon: "in" },
              { label: "GitHub", href: "#", icon: "⌥" },
              { label: "YouTube", href: "#", icon: "▶" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-[#0056d2] flex items-center justify-center text-xs font-bold transition-colors duration-150"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

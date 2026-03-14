import { useState } from "react";
import { Sun, Moon, Github, Database, Menu, X, Zap, Code2 } from "lucide-react";
import { clsx } from "clsx";
import {
  components,
  createButtonClass,
  createNavLinkClass,
} from "../styles/components";
import "../styles/navbar.css";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features", icon: <Zap className="w-4 h-4" /> },
  { label: "Docs", href: "#docs", icon: <Code2 className="w-4 h-4" /> },
  { label: "Editor", href: "#editor", icon: <Database className="w-4 h-4" /> },
  {
    label: "Templates",
    href: "#templates",
    icon: <Database className="w-4 h-4" />,
  },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={components.container.header}>
      <nav className={components.container.nav}>
        <a
          href="/"
          className="group flex items-center gap-3 text-neutral-900 dark:text-white hover:scale-105 transition-all duration-200 focus-ring"
        >
          <div className="logo-glow">
            <span className="text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
              <Database className="w-7 h-7" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
              Draft
            </span>
            <span className="font-bold text-xl tracking-tight gradient-text">
              DB
            </span>
            <span className="ml-1 text-xs font-medium text-green-600 dark:text-green-400 opacity-80">
              β
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-2">
          {navLinks.map(({ label, href, icon }) => (
            <li key={label}>
              <a href={href} className={createNavLinkClass()}>
                <span className="group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`${createButtonClass("ghost", "icon")} cursor-pointer`}
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={createButtonClass("ghost", "icon")}
          >
            <Github className="w-5 h-5" />
          </a>

          {/* CTA with more unique styling */}
          <Link to="/editor" className={createButtonClass("primary")}>
            <Database className="w-4 h-4" />
            Launch Editor
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className={clsx(createButtonClass("ghost", "icon"), "lg:hidden")}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu with enhanced styling */}
      {menuOpen && (
        <div className={components.container.mobileMenu}>
          <div className="flex flex-col gap-2">
            {navLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={createNavLinkClass("mobile")}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                {label}
              </a>
            ))}
            <a
              href="#editor"
              onClick={() => setMenuOpen(false)}
              className={clsx(
                createButtonClass("primary"),
                "mt-3 justify-center",
              )}
            >
              <Database className="w-4 h-4" />
              Launch Editor
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

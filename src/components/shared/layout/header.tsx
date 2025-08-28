import React from "react";

import { Star } from "lucide-react";

import Link from "next/link";

import MobileMenu from "@/components/ui/mobile-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { NAV_LINKS } from "@/const";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 px-4 py-3">
      <nav className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Star size={20} className="text-foreground fill-foreground" />
          <span className="text-lg">nPhan</span>
        </Link>
        <div className="flex items-center sm:gap-4">
          <div className="hidden items-center gap-4 text-sm sm:flex sm:gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground/80 capitalize transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <MobileMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;

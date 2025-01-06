// 'use client'
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Home,
  Film,
  Tv,
  Search,
  Heart,
  JapaneseYen,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

// import Link from 'next/link'
// import { Search } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { useState } from 'react'
import { SearchResults } from "@/components/search-results";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  // Debounce function to reset interaction timer
  const resetInteractionTimer = useCallback(() => {
    setLastInteractionTime(Date.now());
    setIsNavbarVisible(true);
  }, []);

  const navLinks = [
    { href: "https://cmoon.sumit.info.np", label: "Home", icon: Home },
    { href: "https://cmoon.sumit.info.np/movie", label: "Movies", icon: Film },
    { href: "https://cmoon.sumit.info.np/series", label: "TV", icon: Tv },
    {
      href: "/",
      label: "Anime(β)",
      icon: JapaneseYen,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      resetInteractionTimer();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resetInteractionTimer]);

  // Effect for mouse movement and keyboard interaction
  useEffect(() => {
    const handleMouseMove = () => resetInteractionTimer();
    const handleKeyPress = () => resetInteractionTimer();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [resetInteractionTimer]);

  // Effect to hide navbar after 5 seconds of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > 5000) {
        setIsNavbarVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastInteractionTime]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    resetInteractionTimer();
  };

  return (
    <header className="sticky top-0 z-[100] pl-8 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 justify-between items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Omega</span>
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="group flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                onClick={resetInteractionTimer}
              >
                <link.icon
                  size={20}
                  className="group-hover:text-indigo-400 transition-colors"
                />
                <span className="font-medium group-hover:text-indigo-400">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex-1 relative">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="search"
              placeholder="Search anime..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length >= 3);
              }}
              className="w-full"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          {showResults && query.length >= 3 && (
            <SearchResults
              query={query}
              onSelect={() => setShowResults(false)}
            />
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

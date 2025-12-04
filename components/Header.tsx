// components/Header.tsx
'use client';

import Link from 'next/link';
import { Plane, Menu, X, DollarSign } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'บริการ', href: '/services' },
  { label: 'ราคา', href: '/pricing' },
  { label: 'วิธีการ', href: '/how-to' },
  { label: 'ตัวอย่าง', href: '/samples' },
  { label: 'คำถามที่พบบ่อย', href: '/faq' },
  { label: 'ติดต่อ', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link
            href="/"
            aria-label="VisaReady Docs Home"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-brand-green transition-colors"
          >
            <Plane className="w-6 h-6 text-brand-gold" />
            <span>VisaReady Docs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-green transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/pricing"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-brand-green text-white hover:bg-emerald-700 transition-colors"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              ดูราคา
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-brand-green transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 border-t border-gray-100 bg-white shadow-sm'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 divide-y divide-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="block w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-brand-green transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3">
            <Link
              href="/pricing"
              onClick={toggleMobileMenu}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-md bg-brand-green text-white hover:bg-emerald-700 transition-colors"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              ดูราคาและสั่งซื้อ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
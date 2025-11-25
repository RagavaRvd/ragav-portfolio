'use client';

import Link from 'next/link';

export default function QRHeader() {
  return (
    <header className="fixed top-0 w-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl border-b border-gray-200/30 dark:border-gray-800/30 z-50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
              <span className="text-white font-black text-xl">RG</span>
            </div>
          </div>
          <div>
            <div className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ragavendiran G
            </div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 -mt-0.5 tracking-wider uppercase">
              Premium QR Studio
            </div>
          </div>
        </Link>
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-sm font-bold rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <svg className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="relative z-10">Back to Portfolio</span>
        </Link>
      </nav>
    </header>
  );
}

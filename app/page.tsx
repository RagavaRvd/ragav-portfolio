'use client';

import { SmartChat } from '@/components/SmartChat';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with animated gradient */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-black text-lg">RG</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
            </div>
            <div>
              <div className="text-lg font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ragavendiran G
              </div>
              <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 -mt-1">
                Full-Stack Leader
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '#about', label: 'About', icon: '👤' },
              { href: '#experience', label: 'Experience', icon: '💼' },
              { href: '#skills', label: 'Skills', icon: '⚡' },
              { href: '#projects', label: 'Projects', icon: '🚀' },
              { href: '#contact', label: 'Contact', icon: '📧' },
              { href: '/qr-code', label: 'QR Code', icon: '📱' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </div>


          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Download Resume Button */}
            {/* <a
              href="/resume.pdf"
              download="Ragavendiran_G_Resume.pdf"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-xl hover:border-blue-600 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
              title="Download Resume"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden lg:inline">Resume</span>
            </a> */}

            {/* CTA Button */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              <span>Hire Me</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section - Creative & Innovative */}
      <section className="pt-24 pb-16 px-4 md:px-6 relative overflow-visible flex items-center min-h-[90vh]">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 w-full ">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Content */}
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
              
              <div className="mb-5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                  Hey, I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] whitespace-nowrap">Ragavendiran G</span>
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-lg shadow-md">
                    Full-Stack Leader
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg shadow-md">
                    MERN/MEAN Expert
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-lg shadow-md">
                    Associate Manager
                  </span>
                </div>
              </div>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                Architecting enterprise solutions that drive <strong className="text-gray-900 dark:text-white">$3.8M+ revenue</strong> and serve <strong className="text-gray-900 dark:text-white">500K+ users</strong>. Transforming complex business challenges into elegant, scalable applications with <strong className="text-gray-900 dark:text-white">99.8% uptime</strong>.
              </p>

              {/* Stats Grid */}
              {/* <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">8.5+</div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">500K+</div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">$3.8M+</div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Revenue Impact</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1">4x</div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Award Winner</div>
                </div>
              </div> */}

              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                  Let's Connect
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a href="https://linkedin.com/in/ragav-g" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-xl hover:border-blue-600 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="inline-flex items-center gap-2">
                    LinkedIn
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Chat Assistant */}
            <div className="relative hidden md:block">
              <SmartChat />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Building the Future of Web</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Architecting business transformation through scalable, elegant technical solutions that drive measurable ROI
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">8.5+</div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">500K+</div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Users Served</div>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">$3.8M+</div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Revenue Impact</div>
            </div>
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 hover:shadow-xl hover:shadow-orange-500/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">99.8%</div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">System Uptime</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation Driver</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I don't just write code—I architect business transformation. With <strong className="text-gray-900 dark:text-white">8.5+ years leading full-stack development</strong> at industry giants like <strong className="text-gray-900 dark:text-white">Tredence, Aspire Systems, and Mobinius</strong>, I've mastered translating complex business requirements into scalable solutions.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technical Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                My superpower? Building <strong className="text-gray-900 dark:text-white">enterprise-grade applications that scale effortlessly</strong>. From architecting microservices handling 50,000+ daily API requests to optimizing data pipelines that reduced costs by 30%, I combine deep expertise in <strong className="text-gray-900 dark:text-white">React, Angular, Node.js, AWS/Azure</strong> with strategic thinking.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Proven Impact</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                What sets me apart? I've delivered <strong className="text-gray-900 dark:text-white">$3.8M+ in measurable contract value</strong>, maintained 99.8% uptime across mission-critical systems, and earned <strong className="text-gray-900 dark:text-white">4 "Pat on the Back" awards</strong> for innovation. As a published NPM author and technical mentor, I build systems and teams that thrive.
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Key Highlights
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '🏆', text: '4x Award Winner for technical innovation and delivery excellence' },
                { icon: '📦', text: 'Published NPM Package Author used by 100+ companies' },
                { icon: '👥', text: 'Mentored 15+ developers to technical excellence' },
                { icon: '🚀', text: '60% faster deployments through microservices migration' },
                { icon: '⚡', text: 'Zero critical defects in 18 months of production systems' },
                { icon: '📈', text: '95%+ client satisfaction through performance-first architecture' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Career Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">Work Experience</h2>
          </div>
          <div className="space-y-12">
            {[
              {
                year: 'May 2022 - Present',
                title: 'Associate Manager',
                company: 'Tredence, Bangalore',
                description: 'Spearhead end-to-end architecture and delivery of enterprise B2B SaaS platforms, orchestrating cross-functional teams while serving as the technical voice bridging C-suite stakeholders and engineering excellence.',
                achievements: [
                  '🏆 Architected 5+ production-grade SaaS platforms generating $3.8M+ revenue—zero critical defects in 18 months',
                  '📈 Achieved 95%+ client satisfaction by implementing performance-first architecture (40% faster load times)',
                  '🚀 Pioneered microservices migration strategy reducing deployment cycles by 60% and system downtime by 85%',
                  '👥 Mentored 8+ engineers through code reviews and architecture sessions, elevating team capability by 40%',
                  '🎯 Won 4 company awards for technical innovation and consistently exceeding delivery commitments'
                ],
                tech: ['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Microservices']
              },
              {
                year: 'Jan 2021 - Apr 2022',
                title: 'Senior Software Developer',
                company: 'Aspire Systems, Chennai',
                description: 'Engineered mission-critical sales automation ecosystem serving half a million broadband customers, transforming manual processes into intelligent, automated workflows that drove operational excellence.',
                achievements: [
                  '💡 Architected serverless sales platform (Angular 10 + AWS Lambda) processing 100K+ transactions daily',
                  '⚡ Slashed manual reconciliation time by 30% through intelligent data pipeline optimization',
                  '📊 Built real-time analytics dashboard reducing operational decision-making time from hours to minutes',
                  '🔧 Enhanced UI responsiveness by 55% through lazy loading and performance optimization techniques',
                  '🎖️ Recognized as top performer for delivering high-impact features ahead of aggressive timelines'
                ],
                tech: ['Angular 10', 'AWS Lambda', 'MongoDB', 'Node.js', 'REST APIs']
              },
              {
                year: 'Jul 2020 - Dec 2020',
                title: 'Senior Software Developer',
                company: 'Mobinius, Bangalore',
                description: 'Revolutionized transport industry operations by building robust inventory and POS systems that automated complex logistics workflows, eliminating manual errors and operational bottlenecks.',
                achievements: [
                  '🚛 Built end-to-end inventory management system tracking 10K+ SKUs with 99.9% accuracy',
                  '⚙️ Designed RESTful APIs handling 50K+ requests/day with sub-200ms response times',
                  '💪 Increased transaction reliability by 95% through fault-tolerant architecture and comprehensive error handling',
                  '🤝 Championed Agile best practices, leading daily standups and sprint retrospectives across 4 teams',
                  '🎯 Delivered MVP 2 weeks ahead of schedule, enabling early customer validation'
                ],
                tech: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Agile/Scrum']
              },
              {
                year: 'Jul 2017 - Jun 2019',
                title: 'Senior Application Developer',
                company: 'NextONTOP HI-Tech SoftSolutions, Bangalore',
                description: 'Founded and led technical team building The Casttree—a groundbreaking talent marketplace connecting filmmakers with artists. Drove product from concept to 10K+ active users through innovative architecture and rapid iteration.',
                achievements: [
                  '🎬 Architected from scratch: talent marketplace serving 10K+ filmmakers, artists, and performers',
                  '👨‍💻 Built and mentored team of 4 junior developers, establishing coding standards and review processes',
                  '⚡ Record-breaking delivery: Designed, developed, and launched mobile app to Play Store in just 10 days',
                  '🏗️ Pioneered scalable API architecture supporting 50K+ monthly searches with intelligent matching algorithms',
                  '🌟 Established engineering culture of excellence with 80%+ code coverage and zero-downtime deployments'
                ],
                tech: ['Angular 6', 'SailsJS', 'MongoDB', 'Node.js', 'Mobile Development']
              }
            ].map((exp, i) => (
              <div key={i} className="relative pl-10 border-l-2 border-blue-200 dark:border-blue-900">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/50"></div>
                <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start mb-5">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg">{exp.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{exp.description}</p>
                  <div className="mb-5 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-xl">
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Key Achievements
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">▹</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, j) => (
                      <span key={j} className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Technical Arsenal</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Full-Stack Mastery</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Battle-tested expertise across the entire technology stack—from pixel-perfect UIs to scalable microservices architecture. Every tool chosen with purpose, every pattern proven in production.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200 dark:border-yellow-800 rounded-full text-sm font-semibold text-yellow-700 dark:text-yellow-400">🏆 4x Award Winner</span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-full text-sm font-semibold text-green-700 dark:text-green-400">📦 Published NPM Author</span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-400">🎓 B.Tech IT Graduate</span>
            </div>

            {/* Top 10 In-Demand Skills */}
            <div className="mt-8 mb-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  <span>🔥</span>
                  <span className="uppercase tracking-wider">Top 10 Market Skills</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden py-6">
                <div className="flex animate-marquee items-center">
                  {/* First set */}
                  {[
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'MongoDB' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'Node.js' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', name: 'Angular' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TypeScript' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', name: 'Next.js' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', name: 'AWS' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg', name: 'Azure' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' }
                  ].map((skill, i) => (
                    <div key={i} className="group relative inline-block mx-6" style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                      <div className="relative w-16 h-16 transform group-hover:scale-110 transition-all duration-300">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'MongoDB' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'Node.js' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', name: 'Angular' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TypeScript' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', name: 'Next.js' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', name: 'AWS' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg', name: 'Azure' },
                    { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' }
                  ].map((skill, i) => (
                    <div key={`dup-${i}`} className="group relative inline-block mx-6" style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                      <div className="relative w-16 h-16 transform group-hover:scale-110 transition-all duration-300">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
          {/* Core Technologies */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                category: 'Frontend Excellence',
                icon: '⚛️',
                color: 'from-blue-500 to-cyan-500',
                skills: [
                  { name: 'React.js', logo: '⚛️' },
                  { name: 'Angular', logo: '🅰️' },
                  { name: 'Next.js', logo: '▲' },
                  { name: 'TypeScript', logo: '📘' },
                  { name: 'Tailwind CSS', logo: '🎨' },
                  { name: 'Material UI', logo: '💎' },
                  { name: 'Redux', logo: '🔄' },
                  { name: 'Flutter', logo: '🦋' }
                ]
              },
              {
                category: 'Backend Engineering',
                icon: '⚙️',
                color: 'from-purple-500 to-pink-500',
                skills: [
                  { name: 'Node.js', logo: '🟢' },
                  { name: 'Express.js', logo: '⚡' },
                  { name: 'REST APIs', logo: '🔌' },
                  { name: 'GraphQL', logo: '◈' },
                  { name: 'Microservices', logo: '🔷' },
                  { name: 'JWT/OAuth', logo: '🔐' },
                  { name: 'WebSockets', logo: '🔄' },
                  { name: 'Prisma', logo: '🔺' }
                ]
              },
              {
                category: 'Database & Storage',
                icon: '🗄️',
                color: 'from-orange-500 to-red-500',
                skills: [
                  { name: 'PostgreSQL', logo: '🐘' },
                  { name: 'MongoDB', logo: '🍃' },
                  { name: 'Redis', logo: '🔴' },
                  { name: 'Database Design', logo: '📊' },
                  { name: 'Query Optimization', logo: '⚡' },
                  { name: 'Data Migration', logo: '📦' }
                ]
              },
              {
                category: 'Cloud & DevOps',
                icon: '☁️',
                color: 'from-green-500 to-teal-500',
                skills: [
                  { name: 'AWS', logo: '☁️' },
                  { name: 'Azure', logo: '🔷' },
                  { name: 'Docker', logo: '🐋' },
                  { name: 'CI/CD', logo: '🔄' },
                  { name: 'GitHub Actions', logo: '⚙️' },
                  { name: 'Infrastructure', logo: '🏗️' }
                ]
              }
            ].map((group, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {group.icon}
                  </div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <div key={j} className={`group/skill flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:${group.color} hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                      <span className="text-base">{skill.logo}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/skill:text-white">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Technologies */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl shadow-lg">
                🛠️
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Additional Tools & Expertise
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'ShadCN UI', logo: '🎨' },
                { name: 'Ionic', logo: '⚡' },
                { name: 'SailsJS', logo: '⛵' },
                { name: 'Zod', logo: '✓' },
                { name: 'Swagger', logo: '📋' },
                { name: 'Jira', logo: '📊' },
                { name: 'Postman', logo: '📮' },
                { name: 'SonarQube', logo: '🔍' },
                { name: 'Analytics', logo: '📈' },
                { name: 'Firebase', logo: '🔥' },
                { name: 'Agile', logo: '🔄' },
                { name: 'Git', logo: '🌿' },
                { name: 'NPM', logo: '📦' },
                { name: 'Code Reviews', logo: '👁️' },
                { name: 'Mentoring', logo: '👨‍🏫' },
                { name: 'Stakeholder Mgmt', logo: '🎯' },
                { name: 'Architecture', logo: '🏗️' },
                { name: 'Leadership', logo: '👑' }
              ].map((tool, i) => (
                <div key={i} className="group/tool flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span className="text-base">{tool.logo}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/tool:text-white">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What Sets Me Apart */}
          <div className="mt-12 relative group/standout">
            {/* Animated gradient background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl opacity-20 group-hover/standout:opacity-30 blur-xl transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-pink-950/20 p-8 rounded-3xl border-2 border-yellow-300 dark:border-yellow-800">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-3">
                  <span className="text-4xl">⭐</span>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 dark:from-yellow-400 dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent">
                    What Sets Me Apart
                  </h3>
                  <span className="text-4xl">⭐</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">The unique combination that makes me exceptional</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: '🚀',
                    title: 'Performance Obsessed',
                    description: 'Reduced API latency by 60%, optimized database queries for 3x faster responses',
                    stat: '60% Faster'
                  },
                  {
                    icon: '💰',
                    title: 'Business Impact Driver',
                    description: 'Delivered $3.8M+ in contract value through scalable enterprise solutions',
                    stat: '$3.8M+ Value'
                  },
                  {
                    icon: '👨‍🏫',
                    title: 'Team Multiplier',
                    description: 'Mentored 15+ developers, established coding standards, led technical architecture',
                    stat: '15+ Mentored'
                  },
                  {
                    icon: '🎯',
                    title: 'Full-Cycle Owner',
                    description: 'From requirement gathering to production deployment and monitoring',
                    stat: 'End-to-End'
                  },
                  {
                    icon: '🏆',
                    title: 'Award-Winning Engineer',
                    description: '4x Star Performer, consistently recognized for technical excellence',
                    stat: '4x Awards'
                  },
                  {
                    icon: '📦',
                    title: 'Open Source Contributor',
                    description: 'Published NPM package (not-payouts-razorpayx) used by community',
                    stat: 'NPM Author'
                  },
                  {
                    icon: '🔥',
                    title: 'Modern Tech Adopter',
                    description: 'Early adopter of cutting-edge tech: Next.js 14, TypeScript, Serverless',
                    stat: 'Innovation Leader'
                  },
                  {
                    icon: '💡',
                    title: 'Problem Solver',
                    description: 'Architect complex solutions: Multi-tenant SaaS, Real-time dashboards, Integrations',
                    stat: 'Solution Architect'
                  }
                ].map((standout, i) => (
                  <div key={i} className="group/card bg-white dark:bg-gray-900 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="text-4xl mb-3 group-hover/card:scale-125 group-hover/card:rotate-12 transition-all duration-300">
                      {standout.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {standout.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {standout.description}
                    </p>
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {standout.stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Selected work that showcases my expertise in full-stack development
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Enterprise SaaS Platforms',
                impact: '$3.8M Impact',
                icon: '🏆',
                description: 'Architected 5 production-grade B2B platforms serving Fortune 500 clients with 95%+ satisfaction and zero P0 incidents.',
                tech: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
                link: 'https://linkedin.com/in/ragav-g',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Sales Automation Platform',
                impact: '500K Users',
                icon: '⚡',
                description: 'Serverless architecture processing 100K+ daily transactions with 30% reduction in manual reconciliation.',
                tech: ['Angular', 'Lambda', 'MongoDB', 'Node.js'],
                link: 'https://linkedin.com/in/ragav-g',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'The Casttree Marketplace',
                impact: '10K+ Creatives',
                icon: '🎬',
                description: 'AI-powered talent marketplace revolutionizing film casting with intelligent matching and real-time collaboration.',
                tech: ['Angular', 'SailsJS', 'MongoDB', 'Mobile'],
                link: 'https://linkedin.com/in/ragav-g',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: 'not-payouts-razorpayx',
                impact: 'Open Source',
                icon: '📦',
                description: 'Battle-tested NPM package automating bulk payments for 100+ SaaS companies with TypeScript support.',
                tech: ['Node.js', 'TypeScript', 'RazorpayX', 'NPM'],
                link: 'https://www.npmjs.com/package/not-payouts-razorpayx',
                gradient: 'from-green-500 to-teal-500'
              }
            ].map((project, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-bold bg-gradient-to-r ${project.gradient} text-white rounded-full`}>
                      {project.impact}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg">{t}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent hover:gap-3 transition-all`}>
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Strategic Partnership</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to architect solutions that scale? Let's discuss strategic opportunities and drive measurable outcomes together.
            </p>
          </div>
          
          <div className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
            <div className="grid md:grid-cols-3 gap-0">
              
              {/* Contact Information */}
              <div className="md:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 border-r border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
                
                <div className="space-y-4 mb-6">
                  <a href="mailto:ragavarvd@gmail.com" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm">
                      📧
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Email</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">ragavarvd@gmail.com</div>
                    </div>
                  </a>
                  
                  <a href="tel:+919677822758" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm">
                      📞
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Phone</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">+91-96778-22758</div>
                    </div>
                  </a>

                  <a href="https://linkedin.com/in/ragav-g" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm">
                      💼
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">LinkedIn</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">linkedin.com/in/ragav-g</div>
                    </div>
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-lg font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">99.8%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24h</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Response</div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2 p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all" placeholder="john@company.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all">
                      <option>Enterprise Architecture</option>
                      <option>Full-Stack Development</option>
                      <option>Technical Leadership</option>
                      <option>SaaS Platform</option>
                      <option>Performance Optimization</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none" placeholder="Tell me about your project requirements and objectives..."></textarea>
                  </div>
                  
                  <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
            {/* Bottom highlight bar */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-1"></div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>$3.8M+ Revenue Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>500K+ Users Served</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>15+ Developers Mentored</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>4x Award Winner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ragavendiran G</span>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Associate Manager | Full-Stack Engineering Leader</p>
            </div>

            {/* QR Code for Resume Download */}
            <div className="group relative">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="relative">
                  {/* QR Code Image - Replace with your actual QR code */}
                  <div className="w-32 h-32 bg-white p-2 rounded-lg">
                    <img 
                      src="/qr-code.png" 
                      alt="Scan to download resume" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback if QR code image not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded text-white text-xs font-bold text-center p-2">QR Code<br/>Coming Soon</div>';
                      }}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 mt-3">
                  📱 Scan to Download
                </p>
                <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                  Resume PDF
                </p>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10 shadow-xl">
                Scan QR code with your phone to download my resume
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="https://www.npmjs.com/package/not-payouts-razorpayx" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all" title="NPM Package">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>
              </a>
              <a href="https://linkedin.com/in/ragav-g" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:ragavarvd@gmail.com" className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2025 Ragavendiran G. Built with Next.js & Tailwind CSS. All rights reserved.</p>
            <p className="mt-2 text-xs">B.Tech in Information Technology | Sri Ramakrishna Engineering College (2013-2017) | CGPA: 7.5/10</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

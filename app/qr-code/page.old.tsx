'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type QRTemplate = 'url' | 'text' | 'vcard' | 'wifi' | 'email' | 'sms' | 'phone' | 'whatsapp' | 'resume' | 'linkedin' | 'location' | 'event';

export default function QRCodePage() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>('url');
  const [fgColor, setFgColor] = useState('#1e40af');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [includeFrame, setIncludeFrame] = useState(false);
  const [frameText, setFrameText] = useState('Scan Me');
  const [frameColor, setFrameColor] = useState('#1e40af');
  const [qrHistory, setQrHistory] = useState<Array<{url: string, template: string, timestamp: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [cornerStyle, setCornerStyle] = useState<'square' | 'dot' | 'rounded'>('square');
  const [dotStyle, setDotStyle] = useState<'square' | 'rounded' | 'dots'>('square');
  
  // VCard fields
  const [vcard, setVcard] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    country: ''
  });

  // WiFi fields
  const [wifi, setWifi] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  });

  // Contact fields
  const [contact, setContact] = useState({
    phone: '',
    message: '',
    email: '',
    subject: '',
    body: ''
  });

  // Location fields
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    label: ''
  });

  // Event fields
  const [event, setEvent] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    if (selectedTemplate === 'resume') {
      setText(`${typeof window !== 'undefined' ? window.location.origin : ''}/resume.pdf`);
    } else if (selectedTemplate === 'linkedin') {
      setText('https://linkedin.com/in/ragav-g');
    }
  }, [selectedTemplate]);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // Format data based on template type
      let qrData = text;
      let isValid = false;
      
      switch (selectedTemplate) {
        case 'text':
          qrData = text;
          isValid = text.trim().length > 0;
          break;
        case 'email':
          if (contact.email) {
            qrData = `mailto:${contact.email}${contact.subject ? `?subject=${encodeURIComponent(contact.subject)}` : ''}${contact.body ? `${contact.subject ? '&' : '?'}body=${encodeURIComponent(contact.body)}` : ''}`;
            isValid = true;
          }
          break;
        case 'phone':
          qrData = `tel:${text}`;
          isValid = text.trim().length > 0;
          break;
        case 'sms':
          qrData = `sms:${contact.phone}${contact.message ? `?body=${encodeURIComponent(contact.message)}` : ''}`;
          isValid = contact.phone.trim().length > 0;
          break;
        case 'whatsapp':
          const whatsappMsg = contact.message ? `?text=${encodeURIComponent(contact.message)}` : '';
          qrData = `https://wa.me/${text.replace(/\D/g, '')}${whatsappMsg}`;
          isValid = text.trim().length > 0;
          break;
        case 'vcard':
          qrData = `BEGIN:VCARD
VERSION:3.0
N:${vcard.lastName};${vcard.firstName}
FN:${vcard.firstName} ${vcard.lastName}
${vcard.organization ? `ORG:${vcard.organization}\n` : ''}${vcard.title ? `TITLE:${vcard.title}\n` : ''}${vcard.phone ? `TEL:${vcard.phone}\n` : ''}${vcard.email ? `EMAIL:${vcard.email}\n` : ''}${vcard.website ? `URL:${vcard.website}\n` : ''}${vcard.address ? `ADR:;;${vcard.address};${vcard.city};;${vcard.country}\n` : ''}END:VCARD`;
          isValid = vcard.firstName.trim().length > 0 && vcard.lastName.trim().length > 0;
          break;
        case 'wifi':
          qrData = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};;`;
          isValid = wifi.ssid.trim().length > 0 && wifi.password.trim().length > 0;
          break;
        case 'location':
          qrData = `geo:${location.latitude},${location.longitude}${location.label ? `?q=${encodeURIComponent(location.label)}` : ''}`;
          isValid = location.latitude.trim().length > 0 && location.longitude.trim().length > 0;
          break;
        case 'event':
          const formatDate = (date: string) => date.replace(/[-:]/g, '').replace('T', '') + '00';
          qrData = `BEGIN:VEVENT\nSUMMARY:${event.title}\nLOCATION:${event.location}\nDTSTART:${formatDate(event.startDate)}\nDTEND:${formatDate(event.endDate)}\nDESCRIPTION:${event.description}\nEND:VEVENT`;
          isValid = event.title.trim().length > 0 && event.startDate.length > 0 && event.endDate.length > 0;
          break;
        case 'url':
        case 'resume':
        case 'linkedin':
        default:
          qrData = text;
          isValid = text.trim().length > 0;
          break;
      }

      if (!isValid) {
        alert('Please fill in all required fields (marked with *)');
        setIsGenerating(false);
        return;
      }

      // Convert hex colors to RGB for API
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}-${parseInt(result[2], 16)}-${parseInt(result[3], 16)}` : '0-0-0';
      };

      // Using QR Server API with customization
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&ecc=${errorCorrection}&color=${hexToRgb(fgColor)}&bgcolor=${hexToRgb(bgColor)}`;
      setQrCodeUrl(qrUrl);

      // Draw on canvas with logo and frame
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = async () => {
          if (ctx) {
            const frameHeight = includeFrame ? 60 : 0;
            canvasRef.current!.width = size;
            canvasRef.current!.height = size + frameHeight;
            
            // Fill background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, size, size + frameHeight);
            
            // Draw QR code
            ctx.drawImage(img, 0, 0, size, size);
            
            // Draw logo if available
            if (logoPreview) {
              const logo = new Image();
              logo.src = logoPreview;
              logo.onload = () => {
                const logoSize = size * 0.2;
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;
                
                // Draw white background for logo
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
                
                ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
              };
            }
            
            // Draw frame if enabled
            if (includeFrame) {
              ctx.fillStyle = frameColor;
              ctx.fillRect(0, size, size, frameHeight);
              
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 20px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(frameText, size / 2, size + 38);
            }
          }
        };
        
        img.src = qrUrl;
      }

      // Add to history
      setQrHistory(prev => [...prev, { url: qrUrl, template: selectedTemplate, timestamp: Date.now() }].slice(-5));
      
    } catch (error) {
      console.error('QR Generation failed:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    const link = document.createElement('a');
    
    if (downloadFormat === 'png') {
      link.download = `qr-code-${selectedTemplate}-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
    } else if (downloadFormat === 'svg') {
      // For SVG, redirect to QR Server API
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}-${parseInt(result[2], 16)}-${parseInt(result[3], 16)}` : '0-0-0';
      };
      link.download = `qr-code-${selectedTemplate}-${Date.now()}.svg`;
      link.href = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=svg&color=${hexToRgb(fgColor)}&bgcolor=${hexToRgb(bgColor)}`;
    } else if (downloadFormat === 'pdf') {
      // Convert canvas to PDF (simplified)
      link.download = `qr-code-${selectedTemplate}-${Date.now()}.pdf`;
      link.href = canvasRef.current.toDataURL('image/png');
    }
    
    link.click();
  };

  const printQRCode = () => {
    if (!qrCodeUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print QR Code</title></head>
          <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            <img src="${qrCodeUrl}" style="max-width: 90%; max-height: 90%;" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const copyToClipboard = async () => {
    try {
      if (!canvasRef.current) return;
      
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('QR Code copied to clipboard!');
        }
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
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

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Luxury Page Header */}
          {/* <div className="text-center mb-12 space-y-4">
            <div className="inline-block">
              <div className="px-6 py-2 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 border border-blue-600/20 dark:border-blue-600/30 rounded-full backdrop-blur-xl">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ PROFESSIONAL QR CODE STUDIO
                </span>
              </div>
            </div>
          </div> */}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Templates & Input */}
            <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 hover:shadow-3xl transition-all duration-500">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">
                      Templates
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Choose your QR type</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { type: 'url' as QRTemplate, icon: '🔗', label: 'URL' },
                  { type: 'text' as QRTemplate, icon: '📝', label: 'Text' },
                  { type: 'vcard' as QRTemplate, icon: '👤', label: 'vCard' },
                  { type: 'wifi' as QRTemplate, icon: '📶', label: 'WiFi' },
                  { type: 'email' as QRTemplate, icon: '📧', label: 'Email' },
                  { type: 'sms' as QRTemplate, icon: '💬', label: 'SMS' },
                  { type: 'phone' as QRTemplate, icon: '📱', label: 'Phone' },
                  { type: 'whatsapp' as QRTemplate, icon: '💚', label: 'WhatsApp' },
                  { type: 'resume' as QRTemplate, icon: '📄', label: 'Resume' },
                  { type: 'linkedin' as QRTemplate, icon: '💼', label: 'LinkedIn' },
                  { type: 'location' as QRTemplate, icon: '📍', label: 'Location' },
                  { type: 'event' as QRTemplate, icon: '📅', label: 'Event' },
                ].map((template) => (
                  <button
                    key={template.type}
                    onClick={() => setSelectedTemplate(template.type)}
                    className={`group/btn relative p-3 rounded-2xl transition-all duration-500 hover:scale-110 ${
                      selectedTemplate === template.type
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl shadow-blue-500/50'
                        : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl'
                    }`}
                  >
                    {selectedTemplate === template.type && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50" />
                    )}
                    <div className={`text-2xl mb-1 relative z-10 transition-transform group-hover/btn:scale-110 ${
                      selectedTemplate === template.type ? 'filter drop-shadow-lg' : ''
                    }`}>{template.icon}</div>
                    <div className={`text-[10px] font-black relative z-10 ${
                      selectedTemplate === template.type 
                        ? 'text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>{template.label}</div>
                  </button>
                ))}
              </div>

              {/* Dynamic form fields based on template */}
              {selectedTemplate === 'url' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    URL
                  </label>
                  <input
                    type="url"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>
              )}

              {selectedTemplate === 'text' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Plain Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter any text..."
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                    rows={4}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 text-sm font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Text File
                  </button>
                </div>
              )}

              {selectedTemplate === 'email' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({...contact, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={contact.subject}
                    onChange={(e) => setContact({...contact, subject: e.target.value})}
                    placeholder="Subject (optional)"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <textarea
                    value={contact.body}
                    onChange={(e) => setContact({...contact, body: e.target.value})}
                    placeholder="Message body (optional)"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                    rows={2}
                  />
                </div>
              )}

              {selectedTemplate === 'phone' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>
              )}

              {selectedTemplate === 'sms' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({...contact, phone: e.target.value})}
                    placeholder="+1234567890"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    value={contact.message}
                    onChange={(e) => setContact({...contact, message: e.target.value})}
                    placeholder="Your message..."
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                    rows={2}
                  />
                </div>
              )}

              {selectedTemplate === 'whatsapp' && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Pre-filled Message (Optional)
                  </label>
                  <textarea
                    value={contact.message}
                    onChange={(e) => setContact({...contact, message: e.target.value})}
                    placeholder="Hi! I'd like to connect..."
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                    rows={2}
                  />
                </div>
              )}

              {selectedTemplate === 'vcard' && (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={vcard.firstName}
                      onChange={(e) => setVcard({...vcard, firstName: e.target.value})}
                      placeholder="First Name *"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                    <input
                      type="text"
                      value={vcard.lastName}
                      onChange={(e) => setVcard({...vcard, lastName: e.target.value})}
                      placeholder="Last Name *"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    value={vcard.organization}
                    onChange={(e) => setVcard({...vcard, organization: e.target.value})}
                    placeholder="Organization"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={vcard.title}
                    onChange={(e) => setVcard({...vcard, title: e.target.value})}
                    placeholder="Job Title"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="tel"
                    value={vcard.phone}
                    onChange={(e) => setVcard({...vcard, phone: e.target.value})}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="email"
                    value={vcard.email}
                    onChange={(e) => setVcard({...vcard, email: e.target.value})}
                    placeholder="Email"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="url"
                    value={vcard.website}
                    onChange={(e) => setVcard({...vcard, website: e.target.value})}
                    placeholder="Website"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={vcard.address}
                    onChange={(e) => setVcard({...vcard, address: e.target.value})}
                    placeholder="Address"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={vcard.city}
                      onChange={(e) => setVcard({...vcard, city: e.target.value})}
                      placeholder="City"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                    <input
                      type="text"
                      value={vcard.country}
                      onChange={(e) => setVcard({...vcard, country: e.target.value})}
                      placeholder="Country"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              )}

              {selectedTemplate === 'wifi' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={wifi.ssid}
                    onChange={(e) => setWifi({...wifi, ssid: e.target.value})}
                    placeholder="Network Name (SSID) *"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="password"
                    value={wifi.password}
                    onChange={(e) => setWifi({...wifi, password: e.target.value})}
                    placeholder="Password *"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <select
                    value={wifi.encryption}
                    onChange={(e) => setWifi({...wifi, encryption: e.target.value})}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Encryption</option>
                  </select>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wifi.hidden}
                      onChange={(e) => setWifi({...wifi, hidden: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hidden Network</span>
                  </label>
                </div>
              )}

              {selectedTemplate === 'location' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={location.latitude}
                    onChange={(e) => setLocation({...location, latitude: e.target.value})}
                    placeholder="Latitude * (e.g., 40.7128)"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={location.longitude}
                    onChange={(e) => setLocation({...location, longitude: e.target.value})}
                    placeholder="Longitude * (e.g., -74.0060)"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={location.label}
                    onChange={(e) => setLocation({...location, label: e.target.value})}
                    placeholder="Location Label (optional)"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>
              )}

              {selectedTemplate === 'event' && (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => setEvent({...event, title: e.target.value})}
                    placeholder="Event Title *"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) => setEvent({...event, location: e.target.value})}
                    placeholder="Location"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={event.startDate}
                      onChange={(e) => setEvent({...event, startDate: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={event.endDate}
                      onChange={(e) => setEvent({...event, endDate: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <textarea
                    value={event.description}
                    onChange={(e) => setEvent({...event, description: e.target.value})}
                    placeholder="Event Description"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                    rows={3}
                  />
                </div>
              )}

              {(selectedTemplate === 'resume' || selectedTemplate === 'linkedin') && (
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    URL
                  </label>
                  <input
                    type="url"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={selectedTemplate === 'resume' ? 'Resume URL will be auto-filled' : 'LinkedIn profile URL'}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    readOnly={selectedTemplate === 'resume'}
                  />
                  {selectedTemplate === 'resume' && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Auto-filled with your resume download link
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="group/gen relative w-full mt-6 px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-base font-black rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:shadow-purple-500/60 hover:scale-[1.02] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/gen:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="tracking-wide">GENERATING...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 group-hover/gen:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span className="tracking-wide">GENERATE QR CODE</span>
                      <svg className="w-5 h-5 group-hover/gen:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Middle Column - Customization */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 space-y-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">
                      Customization
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Design your QR code</p>
                  </div>
                </div>
              </div>
              
              {/* Size Control */}
              <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 p-5 rounded-2xl border border-blue-200/30 dark:border-blue-800/30">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Size
                  </label>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-black text-blue-600 border border-blue-200 dark:border-blue-800">
                    {size}x{size}px
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="500"
                  step="50"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-900 dark:to-purple-900 rounded-full appearance-none cursor-pointer accent-blue-600 shadow-inner"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #a855f7 ${((size - 150) / 350) * 100}%, #e5e7eb ${((size - 150) / 350) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Error Correction
                </label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                >
                  <option value="L">🟢 Low (7%)</option>
                  <option value="M">🟡 Medium (15%)</option>
                  <option value="Q">🟠 Quartile (25%)</option>
                  <option value="H">🔴 High (30%)</option>
                </select>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Foreground
                  </label>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{fgColor}</div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Background
                  </label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{bgColor}</div>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Color Presets
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { fg: '#000000', bg: '#ffffff', name: 'Classic' },
                    { fg: '#1e40af', bg: '#ffffff', name: 'Blue' },
                    { fg: '#7c3aed', bg: '#ffffff', name: 'Purple' },
                    { fg: '#dc2626', bg: '#ffffff', name: 'Red' },
                    { fg: '#059669', bg: '#ffffff', name: 'Green' },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => { setFgColor(preset.fg); setBgColor(preset.bg); }}
                      className="h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${preset.bg} 50%, ${preset.fg} 50%)` }}
                      title={preset.name}
                    />
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Logo (Optional)
                </label>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 text-sm font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                </button>
                {logoPreview && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={logoPreview} alt="Logo preview" className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 object-contain bg-white" />
                    <button
                      onClick={() => { setLogoPreview(''); setLogoFile(null); }}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Frame Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFrame}
                    onChange={(e) => setIncludeFrame(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add Frame</span>
                </label>
                {includeFrame && (
                  <div className="space-y-2 pl-6">
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="Frame text"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                    <input
                      type="color"
                      value={frameColor}
                      onChange={(e) => setFrameColor(e.target.value)}
                      className="w-full h-8 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Preview & Export */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">👁️</span>
                Preview & Export
              </h2>
              
              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl flex-1 relative overflow-hidden">
                {/* Grid background pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 20px)',
                  backgroundSize: '20px 20px'
                }} />
                
                {qrCodeUrl ? (
                  <div className="text-center relative z-10 animate-fadeIn">
                    <div className="relative inline-block">
                      <img
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="mx-auto shadow-2xl rounded-2xl border-4 border-white dark:border-gray-700 hover:scale-105 transition-transform duration-300"
                        style={{ maxWidth: size, maxHeight: size }}
                      />
                      {logoPreview && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 h-1/5 bg-white rounded-lg p-1 shadow-xl">
                          <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {size}x{size}px • {errorCorrection} Error Correction
                    </p>
                  </div>
                ) : (
                  <div className="text-center relative z-10">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      No QR Code Yet
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Fill in the details and click Generate
                    </p>
                  </div>
                )}
              </div>

              {qrCodeUrl && (
                <div className="mt-4 space-y-3">
                  {/* Export Format Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['png', 'svg', 'pdf'].map((format) => (
                        <button
                          key={format}
                          onClick={() => setDownloadFormat(format as 'png' | 'svg' | 'pdf')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                            downloadFormat === format
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={downloadQRCode}
                      className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-bold rounded-xl hover:border-blue-600 dark:hover:border-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>

                  <button
                    onClick={printQRCode}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print QR Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import QRHeader from './QRHeader';
import QRTemplateSelector from './QRTemplateSelector';
import QRFormFields from './QRFormFields';
import QRCustomization from './QRCustomization';
import QRPreview from './QRPreview';
import { QRTemplate, VCardData, WiFiData, ContactData, LocationData, EventData } from './types';
import { generateQRData, hexToRgb, drawQROnCanvas, handleCopyToClipboard, handlePrint, handleDownload } from './utils';

export default function QRCodePage() {
  // State management
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'pdf'>('png');

  // Template-specific state
  const [vcard, setVcard] = useState<VCardData>({
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

  const [wifi, setWifi] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  });

  const [contact, setContact] = useState<ContactData>({
    phone: '',
    message: '',
    email: '',
    subject: '',
    body: ''
  });

  const [location, setLocation] = useState<LocationData>({
    latitude: '',
    longitude: '',
    label: ''
  });

  const [event, setEvent] = useState<EventData>({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-fill resume and linkedin URLs
  useEffect(() => {
    if (selectedTemplate === 'resume') {
      setText('https://drive.google.com/file/d/1enfkRnO4uRMXaPGoiTPfS3KrA7bpB2hN/view?usp=sharing');
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

  // Generate QR Code
  const generateQRCode = async () => {
    setIsGenerating(true);

    try {
      const { qrData, isValid } = generateQRData(selectedTemplate, text, vcard, wifi, contact, location, event);

      if (!isValid) {
        alert('Please fill in all required fields (marked with *)');
        setIsGenerating(false);
        return;
      }

      // Generate QR URL using API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&ecc=${errorCorrection}&color=${hexToRgb(fgColor)}&bgcolor=${hexToRgb(bgColor)}`;
      setQrCodeUrl(qrUrl);

      // Draw on canvas with logo and frame
      if (canvasRef.current) {
        drawQROnCanvas(canvasRef.current, qrUrl, size, bgColor, logoPreview, includeFrame, frameColor, frameText);
      }
    } catch (error) {
      console.error('QR Generation failed:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Download QR Code
  const downloadQRCode = () => {
    handleDownload(canvasRef.current, downloadFormat, selectedTemplate, size, text, fgColor, bgColor);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    await handleCopyToClipboard(canvasRef.current);
  };

  // Print QR Code
  const printQRCode = () => {
    handlePrint(qrCodeUrl);
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
      <QRHeader />

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Templates & Input */}
            <div className="space-y-6">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900 dark:text-white">Templates</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Choose your QR type</p>
                    </div>
                  </div>
                </div>
                <QRTemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
              </div>

              <QRFormFields
                selectedTemplate={selectedTemplate}
                text={text}
                setText={setText}
                vcard={vcard}
                setVcard={setVcard}
                wifi={wifi}
                setWifi={setWifi}
                contact={contact}
                setContact={setContact}
                location={location}
                setLocation={setLocation}
                event={event}
                setEvent={setEvent}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
                isGenerating={isGenerating}
                onGenerate={generateQRCode}
              />
            </div>

            {/* Middle Column - Customization */}
            <QRCustomization
              size={size}
              setSize={setSize}
              errorCorrection={errorCorrection}
              setErrorCorrection={setErrorCorrection}
              fgColor={fgColor}
              setFgColor={setFgColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              logoPreview={logoPreview}
              setLogoPreview={setLogoPreview}
              setLogoFile={setLogoFile}
              logoInputRef={logoInputRef}
              handleLogoUpload={handleLogoUpload}
              includeFrame={includeFrame}
              setIncludeFrame={setIncludeFrame}
              frameText={frameText}
              setFrameText={setFrameText}
              frameColor={frameColor}
              setFrameColor={setFrameColor}
            />

            {/* Right Column - Preview & Export */}
            <QRPreview
              qrCodeUrl={qrCodeUrl}
              size={size}
              errorCorrection={errorCorrection}
              logoPreview={logoPreview}
              canvasRef={canvasRef}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadQRCode={downloadQRCode}
              copyToClipboard={copyToClipboard}
              printQRCode={printQRCode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

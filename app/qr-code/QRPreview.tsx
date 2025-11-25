'use client';

interface QRPreviewProps {
  qrCodeUrl: string;
  size: number;
  errorCorrection: string;
  logoPreview: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  downloadFormat: 'png' | 'svg' | 'pdf';
  setDownloadFormat: (format: 'png' | 'svg' | 'pdf') => void;
  downloadQRCode: () => void;
  copyToClipboard: () => void;
  printQRCode: () => void;
}

export default function QRPreview({
  qrCodeUrl,
  size,
  errorCorrection,
  logoPreview,
  canvasRef,
  downloadFormat,
  setDownloadFormat,
  downloadQRCode,
  copyToClipboard,
  printQRCode
}: QRPreviewProps) {
  return (
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
              {(['png', 'svg', 'pdf'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setDownloadFormat(format)}
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
  );
}

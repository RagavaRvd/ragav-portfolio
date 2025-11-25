'use client';

interface QRCustomizationProps {
  size: number;
  setSize: (value: number) => void;
  errorCorrection: string;
  setErrorCorrection: (value: string) => void;
  fgColor: string;
  setFgColor: (value: string) => void;
  bgColor: string;
  setBgColor: (value: string) => void;
  logoPreview: string;
  setLogoPreview: (value: string) => void;
  setLogoFile: (value: File | null) => void;
  logoInputRef: React.RefObject<HTMLInputElement | null>;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  includeFrame: boolean;
  setIncludeFrame: (value: boolean) => void;
  frameText: string;
  setFrameText: (value: string) => void;
  frameColor: string;
  setFrameColor: (value: string) => void;
}

export default function QRCustomization({
  size,
  setSize,
  errorCorrection,
  setErrorCorrection,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  logoPreview,
  setLogoPreview,
  setLogoFile,
  logoInputRef,
  handleLogoUpload,
  includeFrame,
  setIncludeFrame,
  frameText,
  setFrameText,
  frameColor,
  setFrameColor
}: QRCustomizationProps) {
  const colorPresets = [
    { fg: '#000000', bg: '#ffffff', name: 'Classic' },
    { fg: '#1e40af', bg: '#ffffff', name: 'Blue' },
    { fg: '#7c3aed', bg: '#ffffff', name: 'Purple' },
    { fg: '#dc2626', bg: '#ffffff', name: 'Red' },
    { fg: '#059669', bg: '#ffffff', name: 'Green' },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Customization</h2>
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
          {colorPresets.map((preset) => (
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
  );
}

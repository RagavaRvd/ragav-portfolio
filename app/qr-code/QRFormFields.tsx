'use client';

import { QRTemplate, VCardData, WiFiData, ContactData, LocationData, EventData } from './types';

interface QRFormFieldsProps {
  selectedTemplate: QRTemplate;
  text: string;
  setText: (value: string) => void;
  vcard: VCardData;
  setVcard: (value: VCardData) => void;
  wifi: WiFiData;
  setWifi: (value: WiFiData) => void;
  contact: ContactData;
  setContact: (value: ContactData) => void;
  location: LocationData;
  setLocation: (value: LocationData) => void;
  event: EventData;
  setEvent: (value: EventData) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function QRFormFields({
  selectedTemplate,
  text,
  setText,
  vcard,
  setVcard,
  wifi,
  setWifi,
  contact,
  setContact,
  location,
  setLocation,
  event,
  setEvent,
  fileInputRef,
  handleFileUpload,
  isGenerating,
  onGenerate
}: QRFormFieldsProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl space-y-6">
      {/* URL Template */}
      {selectedTemplate === 'url' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">URL</label>
          <input
            type="url"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          />
        </div>
      )}

      {/* Text Template */}
      {selectedTemplate === 'text' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Plain Text</label>
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

      {/* Email Template */}
      {selectedTemplate === 'email' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Email Address</label>
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

      {/* Phone Template */}
      {selectedTemplate === 'phone' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Phone Number</label>
          <input
            type="tel"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          />
        </div>
      )}

      {/* SMS Template */}
      {selectedTemplate === 'sms' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Phone Number</label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => setContact({...contact, phone: e.target.value})}
            placeholder="+1234567890"
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          />
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Message</label>
          <textarea
            value={contact.message}
            onChange={(e) => setContact({...contact, message: e.target.value})}
            placeholder="Your message..."
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
            rows={2}
          />
        </div>
      )}

      {/* WhatsApp Template */}
      {selectedTemplate === 'whatsapp' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">WhatsApp Number</label>
          <input
            type="tel"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          />
          <label className="block text-sm font-bold text-gray-900 dark:text-white">Pre-filled Message (Optional)</label>
          <textarea
            value={contact.message}
            onChange={(e) => setContact({...contact, message: e.target.value})}
            placeholder="Hi! I'd like to connect..."
            className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
            rows={2}
          />
        </div>
      )}

      {/* vCard Template */}
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

      {/* WiFi Template */}
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

      {/* Location Template */}
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

      {/* Event Template */}
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

      {/* Resume/LinkedIn Templates */}
      {(selectedTemplate === 'resume' || selectedTemplate === 'linkedin') && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 dark:text-white">URL</label>
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

      {/* Generate Button */}
      <button
        onClick={onGenerate}
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
  );
}

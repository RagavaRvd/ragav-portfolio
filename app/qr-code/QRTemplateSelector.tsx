'use client';

import { QRTemplate } from './types';

interface QRTemplateSelectorProps {
  selectedTemplate: QRTemplate;
  onSelectTemplate: (template: QRTemplate) => void;
}

export default function QRTemplateSelector({ selectedTemplate, onSelectTemplate }: QRTemplateSelectorProps) {
  const templates = [
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
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {templates.map((template) => (
        <button
          key={template.type}
          onClick={() => onSelectTemplate(template.type)}
          className={`group/btn relative px-3 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center ${
            selectedTemplate === template.type
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30'
              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg'
          }`}
        >
          {selectedTemplate === template.type && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-40" />
          )}
          <div className={`text-2xl mb-1.5 relative z-10 transition-transform group-hover/btn:scale-110 ${
            selectedTemplate === template.type ? 'filter drop-shadow-md' : ''
          }`}>{template.icon}</div>
          <div className={`text-[11px] font-bold relative z-10 leading-tight text-center ${
            selectedTemplate === template.type 
              ? 'text-white' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>{template.label}</div>
        </button>
      ))}
    </div>
  );
}

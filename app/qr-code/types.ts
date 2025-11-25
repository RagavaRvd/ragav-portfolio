export type QRTemplate = 'url' | 'text' | 'vcard' | 'wifi' | 'email' | 'sms' | 'phone' | 'whatsapp' | 'resume' | 'linkedin' | 'location' | 'event';

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  country: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: string;
  hidden: boolean;
}

export interface ContactData {
  phone: string;
  message: string;
  email: string;
  subject: string;
  body: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  label: string;
}

export interface EventData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface QRState {
  text: string;
  qrCodeUrl: string;
  size: number;
  errorCorrection: string;
  selectedTemplate: QRTemplate;
  fgColor: string;
  bgColor: string;
  logoFile: File | null;
  logoPreview: string;
  includeFrame: boolean;
  frameText: string;
  frameColor: string;
  isGenerating: boolean;
  downloadFormat: 'png' | 'svg' | 'pdf';
  vcard: VCardData;
  wifi: WiFiData;
  contact: ContactData;
  location: LocationData;
  event: EventData;
}

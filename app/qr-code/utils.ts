import { QRTemplate, VCardData, WiFiData, ContactData, LocationData, EventData } from './types';

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}-${parseInt(result[2], 16)}-${parseInt(result[3], 16)}` : '0-0-0';
}

export function generateQRData(
  selectedTemplate: QRTemplate,
  text: string,
  vcard: VCardData,
  wifi: WiFiData,
  contact: ContactData,
  location: LocationData,
  event: EventData
): { qrData: string; isValid: boolean } {
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

  return { qrData, isValid };
}

export function drawQROnCanvas(
  canvas: HTMLCanvasElement,
  qrUrl: string,
  size: number,
  bgColor: string,
  logoPreview: string,
  includeFrame: boolean,
  frameColor: string,
  frameText: string
) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = async () => {
    if (ctx) {
      const frameHeight = includeFrame ? 60 : 0;
      canvas.width = size;
      canvas.height = size + frameHeight;

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

export async function handleCopyToClipboard(canvas: HTMLCanvasElement | null) {
  try {
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
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
}

export function handlePrint(qrCodeUrl: string) {
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
}

export function handleDownload(
  canvas: HTMLCanvasElement | null,
  downloadFormat: 'png' | 'svg' | 'pdf',
  selectedTemplate: string,
  size: number,
  text: string,
  fgColor: string,
  bgColor: string
) {
  if (!canvas) return;

  const link = document.createElement('a');

  if (downloadFormat === 'png') {
    link.download = `qr-code-${selectedTemplate}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
  } else if (downloadFormat === 'svg') {
    link.download = `qr-code-${selectedTemplate}-${Date.now()}.svg`;
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=svg&color=${hexToRgb(fgColor)}&bgcolor=${hexToRgb(bgColor)}`;
  } else if (downloadFormat === 'pdf') {
    link.download = `qr-code-${selectedTemplate}-${Date.now()}.pdf`;
    link.href = canvas.toDataURL('image/png');
  }

  link.click();
}

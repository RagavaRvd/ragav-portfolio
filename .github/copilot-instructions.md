# GitHub Copilot Instructions for Portfolio Project

## Project Overview
This is a **Next.js 16** portfolio website with TypeScript, React 19, and TailwindCSS 4. It features an AI-powered chat assistant, QR code generator, and premium animations.

## Key Technologies
- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 4
- **UI**: React 19.2.0 with Server/Client Components
- **API**: Google Gemini AI for chat functionality
- **QR Generation**: QR Server API (https://api.qrserver.com)

## Project Structure

```
portfolio-pro/
├── app/
│   ├── page.tsx                 # Main portfolio page
│   ├── layout.tsx               # Root layout with metadata
│   ├── globals.css              # Global styles & animations
│   ├── qr-code/                 # QR Generator module
│   │   ├── page.tsx             # Main QR page (253 lines)
│   │   ├── QRHeader.tsx         # Header component
│   │   ├── QRTemplateSelector.tsx  # Template buttons
│   │   ├── QRFormFields.tsx     # Dynamic forms
│   │   ├── QRCustomization.tsx  # Customization panel
│   │   ├── QRPreview.tsx        # Preview & export
│   │   ├── types.ts             # TypeScript interfaces
│   │   └── utils.ts             # Helper functions
│   └── api/
│       └── chat/route.ts        # Gemini AI chat endpoint
├── components/
│   ├── SmartChat.tsx            # Chat wrapper with API check
│   └── PortfolioChat.tsx        # Terminal-style AI chat (570 lines)
└── public/
    └── Ragavendiran_FullStack_Resume_2025.pdf
```

## Important Guidelines

### 1. Component Architecture
- **Use 'use client'** for components with hooks, state, or browser APIs
- **Keep files under 300 lines** - split into smaller components if needed
- **Separate concerns**: UI components, types, utils, API routes
- **Example**: QR code page split into 8 files from 1102 lines

### 2. Styling Conventions
- Use **TailwindCSS utility classes** exclusively
- **Dark mode**: Always include dark: variants
- **Animations**: Define in globals.css, use via Tailwind
- **Terminal theme**: `bg-[#1e1e1e]`, `text-[#b4b4b4]`, `text-[#5cb85c]` for green
- **Gradients**: `from-blue-600 via-purple-600 to-pink-600` for premium look

### 3. TypeScript Standards
- **Strict mode enabled** - no implicit any
- **Define interfaces** in separate types.ts files
- **Use type inference** where possible
- **Example interface**:
```typescript
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  category?: string;
  qrCode?: string;
}
```

### 4. State Management
- Use **useState** for local component state
- Use **useRef** for DOM references and mutable values
- Use **useEffect** for side effects and API calls
- **No Redux** or external state libraries (keep it simple)

### 5. API Integration

#### Google Gemini AI Chat
```typescript
// Located: app/api/chat/route.ts
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
```

#### QR Code Generation
```typescript
// Using QR Server API (no key needed)
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&ecc=${errorCorrection}&color=${hexToRgb(fgColor)}&bgcolor=${hexToRgb(bgColor)}`;
```

### 6. Resume Link (IMPORTANT)
**Always use Google Drive URL for resume**:
```
https://drive.google.com/file/d/1enfkRnO4uRMXaPGoiTPfS3KrA7bpB2hN/view?usp=sharing
```

Locations to update:
- `components/PortfolioChat.tsx` - AI chat QR generation
- `app/qr-code/page.tsx` - Resume template auto-fill
- Any download/view buttons

### 7. AI Chat Knowledge Base
Located in `components/PortfolioChat.tsx`:

```typescript
const knowledgeBase: Record<string, { 
  keywords: string[]; 
  response: { category: string; text: string; qrCode?: boolean } 
}> = {
  resume: { keywords: ['resume', 'cv', 'download', 'pdf'], ... },
  experience: { keywords: ['experience', 'years', 'work'], ... },
  skills: { keywords: ['skill', 'tech', 'technology'], ... },
  // ... more categories
};
```

**To add new categories**:
1. Add entry to knowledgeBase with keywords array
2. Define response with category and text
3. Optionally add qrCode: true for QR generation
4. Update initial message and suggested questions

### 8. QR Code Templates
Located in `app/qr-code/`:

**12 Template Types**:
- url, text, vcard, wifi, email, sms, phone, whatsapp, resume, linkedin, location, event

**To add new template**:
1. Add to `QRTemplate` type in `types.ts`
2. Add template object in `QRTemplateSelector.tsx`
3. Add form fields in `QRFormFields.tsx`
4. Add data generation logic in `utils.ts` → `generateQRData()`

### 9. Animation Guidelines
Define custom animations in `app/globals.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
```

**Built-in animations**: pulse, spin, bounce, fadeIn, slideIn, shimmer

### 10. Performance Best Practices
- Use **dynamic imports** for large components
- Add **loading states** for async operations (isGenerating, isTyping)
- Implement **debouncing** for search/filter inputs
- Use **useCallback** for expensive computations
- Use **React.memo** only when needed (avoid premature optimization)

### 11. Error Handling
```typescript
try {
  // API call or operation
} catch (error) {
  console.error('Operation failed:', error);
  alert('User-friendly error message');
} finally {
  setIsLoading(false);
}
```

### 12. Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Use `lg:` prefix for desktop (1024px+)
- Use `md:` for tablet (768px+)
- Test on multiple screen sizes
- Example: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### 13. Common Patterns

#### Terminal Typing Effect
```typescript
useEffect(() => {
  let currentIndex = 0;
  const typeNextCharacter = () => {
    if (currentIndex < text.length) {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;
      setTimeout(typeNextCharacter, 20); // 20ms per character
    }
  };
  typeNextCharacter();
}, [text]);
```

#### QR Code Generation with Canvas
```typescript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.crossOrigin = 'anonymous';
img.onload = () => {
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(img, 0, 0, size, size);
  // Add logo, frame, etc.
};
img.src = qrUrl;
```

### 14. Git Workflow
- Keep commits atomic and descriptive
- Branch naming: `feature/description` or `fix/description`
- Always test before committing
- Update this file when adding new patterns

### 15. Environment Variables
Required in `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

### 16. Common Issues & Solutions

**Issue**: "Cannot find module" errors
- Solution: Check import paths, ensure 'use client' directive

**Issue**: Hydration errors
- Solution: Avoid window/document in initial render, use useEffect

**Issue**: TypeScript strict mode errors
- Solution: Define proper types, avoid 'any', use optional chaining

**Issue**: Tailwind classes not applying
- Solution: Check globals.css import, restart dev server

### 17. Testing Checklist
Before committing changes:
- [ ] No TypeScript errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Dark mode works correctly
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] AI chat responds correctly
- [ ] QR codes generate properly
- [ ] All links work (especially resume link)

### 18. Future Enhancement Ideas
- Add more QR templates (payment, social media)
- Implement QR code history/favorites
- Add QR code analytics
- Export chat conversations
- Add more AI personality animations
- Implement PWA features

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Git
git add .
git commit -m "feat: description"
git push origin main

# File operations
code components/PortfolioChat.tsx  # Open in VS Code
```

## Contact & Maintenance
**Developer**: Ragavendiran G  
**Email**: ragavarvd@gmail.com  
**LinkedIn**: linkedin.com/in/ragav-g

---

**Last Updated**: November 21, 2025  
**Version**: 1.0.0  
**Next.js Version**: 16.0.3

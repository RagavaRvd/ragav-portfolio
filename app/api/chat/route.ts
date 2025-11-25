import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        response: "API key not configured",
        mode: 'local' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemContext = `You are a friendly AI assistant for Ragavendiran G's portfolio. Be enthusiastic but professional, keep responses concise (2-3 sentences). Answer questions about his 8.5+ years experience as Full-Stack Engineering Leader, expertise in MERN/MEAN stack, $3.8M+ revenue impact, and work at Tredence as Associate Manager.`;

    const conversationHistory = history
      .slice(-10)
      .map((msg: { text: string; isBot: boolean }) => 
        `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`
      )
      .join('\n');

    const fullPrompt = `${systemContext}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`;

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), 5000)
    );

    const apiPromise = model.generateContent(fullPrompt);
    const result = await Promise.race([apiPromise, timeoutPromise]) as any;
    
    const response = result.response;
    const aiResponse = response.text();

    return NextResponse.json({ response: aiResponse, mode: 'gemini' });

  } catch (error: any) {
    console.error('Gemini API error:', error.message);
    return NextResponse.json({
      response: "Unable to connect to AI service",
      mode: 'error'
    }, { status: 500 });
  }
}

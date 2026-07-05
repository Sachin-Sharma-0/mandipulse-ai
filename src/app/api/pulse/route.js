import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { location, scenario, items, language } = await request.json();
    
    if (!location || !scenario || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const targetLanguage = language === 'en' ? 'English' : 'Hindi (हिन्दी)';
    
    const prompt = `You are an expert market analyst and decision intelligence oracle helping street vendors and market sellers in ${location} whose margins are affected by sudden environmental shocks like: ${scenario}.
    
Here is their current inventory:
${items.map(i => `- ${i.name} (Qty: ${i.quantity} ${i.unit}, Price: ${i.price})`).join('\n')}

Analyze this situation and provide a structured JSON response exactly matching this schema. STRICT INSTRUCTION: The fields 'analysisSummary', 'reasoning', and 'intelligentDecisions' MUST be written entirely in ${targetLanguage}. Keep the tone conversational, natural, and accessible to a ground-level seller.
(do NOT use markdown block backticks for the json, return raw json string):
{
  "analysisSummary": "A highly localized macro summary of the scenario in ${targetLanguage}",
  "footfallDropPercentage": 45,
  "itemsAnalysis": [
    { "itemName": "Name", "riskLevel": "CRITICAL|WARNING|STABLE", "hoursBeforeSpoilage": 3, "suggestedDistressPrice": "₹15/kg (Down from ₹40)", "reasoning": "Reason here in ${targetLanguage}" }
  ],
  "intelligentDecisions": ["Decision option 1 in ${targetLanguage}", "Decision option 2 in ${targetLanguage}"],
  "whatsappBroadcastCopy": "A highly engaging, hyper-local marketing text written in regional language/Hinglish packed with emojis for immediate local community sales."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    if (error?.status === 503 || error?.message?.toLowerCase().includes('high demand')) {
      return NextResponse.json({ error: 'Gemini API is experiencing high demand. Please try again a little bit later.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to process request. Ensure GEMINI_API_KEY is configured.' }, { status: 500 });
  }
}

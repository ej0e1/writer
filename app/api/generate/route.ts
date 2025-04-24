import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { keyword, language, wordCount, tones } = body;

  const toneDesc = tones.length > 0 ? `Gaya penulisan: ${tones.join(', ')}.` : '';
  const prompt = `Tulis artikel ${wordCount} patah perkataan dalam Bahasa ${language}.
Topik: ${keyword}.
${toneDesc}
Pastikan ayat tidak terlalu formal, bunyikan seperti ditulis oleh manusia.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  return NextResponse.json({ output: completion.choices[0].message.content });
}

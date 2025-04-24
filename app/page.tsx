'use client';

import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('Malay');
  const [wordCount, setWordCount] = useState(800);
  const [tones, setTones] = useState<string[]>([]);
  const [output, setOutput] = useState('');

  const toneOptions = [
    "Kesalahan kecil",
    "Struktur tak perfect",
    "Pendapat peribadi",
    "Santai tak formal",
    "Slang ringan"
  ];

  const toggleTone = (tone: string) => {
    setTones(prev =>
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    );
  };

  const handleGenerate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword, language, wordCount, tones }),
    });
    const data = await res.json();
    setOutput(data.output);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>ZimmWriter Clone</h1>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword / Title" />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="Malay">Malay</option>
        <option value="English">English</option>
      </select>
      <input type="number" value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} placeholder="Word Count" />
      <div>
        {toneOptions.map(tone => (
          <label key={tone}>
            <input
              type="checkbox"
              checked={tones.includes(tone)}
              onChange={() => toggleTone(tone)}
            />
            {tone}
          </label>
        ))}
      </div>
      <button onClick={handleGenerate}>Generate</button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{output}</pre>
    </main>
  );
}

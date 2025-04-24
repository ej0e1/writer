'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('Malay');
  const [wordCount, setWordCount] = useState(800);
  const [tones, setTones] = useState<string[]>([]);
  const [output, setOutput] = useState('');
  const [bulkKeywords, setBulkKeywords] = useState('');
  const [bulkResults, setBulkResults] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toneOptions = [
    'Kesalahan kecil',
    'Struktur tak perfect',
    'Pendapat peribadi',
    'Santai tak formal',
    'Slang ringan'
  ];

  const languageOptions = [
    { value: 'Malay', label: 'Bahasa Melayu' },
    { value: 'English', label: 'English' }
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
      body: JSON.stringify({ keyword, language, wordCount, tones })
    });
    const data = await res.json();
    setOutput(data.output);
    setLogs(prev => [...prev, `✅ Generated for: ${keyword}`]);
  };

  const handleBulkGenerate = async () => {
    setIsLoading(true);
    const keywords = bulkKeywords.split('\n').filter(k => k.trim() !== '');
    const results: string[] = [];
    const newLogs: string[] = [];

    for (const key of keywords) {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: key, language, wordCount, tones })
      });
      const data = await res.json();
      results.push(`🔹 ${key}\n${data.output}`);
      newLogs.push(`✅ Generated for: ${key}`);
    }
    setBulkResults(results);
    setLogs(prev => [...prev, ...newLogs]);
    setIsLoading(false);
  };

  const downloadCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + logs.map(l => `"${l}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'generate_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 ZimmWriter Clone</h1>
      <Tabs defaultValue="single">
        <TabsList className="mb-4">
          <TabsTrigger value="single">Single Article</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardContent className="space-y-4">
              <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword / Title" />
              <div className="flex gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <Input
                  type="number"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  placeholder="Word Count"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map(tone => (
                  <label key={tone} className="flex items-center gap-2">
                    <Checkbox checked={tones.includes(tone)} onCheckedChange={() => toggleTone(tone)} />
                    {tone}
                  </label>
                ))}
              </div>
              <Button onClick={handleGenerate}>🚀 Generate</Button>
              {output && (
                <Card className="mt-6">
                  <CardContent className="p-6 whitespace-pre-wrap">
                    {output}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardContent className="space-y-4">
              <Textarea
                value={bulkKeywords}
                onChange={(e) => setBulkKeywords(e.target.value)}
                placeholder="Masukkan banyak keyword — satu per baris"
              />
              <Button onClick={handleBulkGenerate} disabled={isLoading}>
                {isLoading ? '⏳ Generating...' : '🚀 Generate All'}
              </Button>
              <div className="space-y-4 mt-4">
                {bulkResults.map((res, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 whitespace-pre-wrap">
                      {res}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {logs.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📜 Log</h2>
          <ul className="list-disc pl-5 space-y-1">
            {logs.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
          <Button className="mt-4" onClick={downloadCSV}>⬇️ Export Log as CSV</Button>
        </div>
      )}
    </main>
  );
}

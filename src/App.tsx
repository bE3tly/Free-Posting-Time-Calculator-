/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

const NICHES = [
  'Fitness & Gym', 'Beauty & Skincare', 'Comedy/Skits', 'Finance & Investing', 'Gaming',
  'Food & Cooking', 'Fashion', 'Travel', 'Parenting', 'Tech Reviews',
  'Education/StudyTok', 'Music', 'Dance', 'Real Estate', 'Self-Improvement/Motivation',
  'Pets', 'DIY/Home', 'Business/Entrepreneurship', 'Sports', 'ASMR/Relaxation'
];

const TIMEZONES = [
  { label: 'HST (UTC-10)', offset: -10 },
  { label: 'AKST (UTC-9)', offset: -9 },
  { label: 'PST (UTC-8)', offset: -8 },
  { label: 'MST (UTC-7)', offset: -7 },
  { label: 'CST (UTC-6)', offset: -6 },
  { label: 'EST (UTC-5)', offset: -5 },
  { label: 'AST (UTC-4)', offset: -4 },
  { label: 'BRT (UTC-3)', offset: -3 },
  { label: 'GMT (UTC+0)', offset: 0 },
  { label: 'CET (UTC+1)', offset: 1 },
  { label: 'EET (UTC+2)', offset: 2 },
  { label: 'MSK (UTC+3)', offset: 3 },
  { label: 'GST (UTC+4)', offset: 4 },
  { label: 'IST (UTC+5:30)', offset: 5.5 },
  { label: 'BST-Bangladesh (UTC+6)', offset: 6 },
  { label: 'ICT (UTC+7)', offset: 7 },
  { label: 'SGT/CST-China (UTC+8)', offset: 8 },
  { label: 'JST/KST (UTC+9)', offset: 9 },
  { label: 'AEST (UTC+10)', offset: 10 },
  { label: 'NZST (UTC+12)', offset: 12 },
];

const REGIONS = ['North America', 'Europe', 'Asia-Pacific', 'Global/Mixed'];

const NICHE_MAPPING: Record<string, { days: string, startHour: number, endHour: number, reason: string }[]> = {
  'Fitness & Gym': [
    { days: 'Mon-Fri', startHour: 6, endHour: 8, reason: 'Pre-workout morning motivation.' },
    { days: 'Mon-Fri', startHour: 18, endHour: 20, reason: 'Post-work evening gym routine.' },
    { days: 'Sat-Sun', startHour: 9, endHour: 11, reason: 'Weekend endurance and health focus.' }
  ],
  'Beauty & Skincare': [
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening skincare routine relaxation.' },
    { days: 'Sat-Sun', startHour: 10, endHour: 12, reason: 'Weekend self-care and pampering.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Mid-day product and aesthetic checks.' }
  ],
  'Comedy/Skits': [
    { days: 'Mon-Fri', startHour: 20, endHour: 22, reason: 'Post-work evening wind-down laughs.' },
    { days: 'Fri-Sat', startHour: 21, endHour: 23, reason: 'Peak weekend leisure entertainment.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Lunch break distraction scroll.' }
  ],
  'Finance & Investing': [
    { days: 'Mon-Fri', startHour: 7, endHour: 9, reason: 'Morning financial news and market prep.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Lunch hour market check-in.' },
    { days: 'Mon-Fri', startHour: 17, endHour: 18, reason: 'Post-market wrap-up and analysis.' }
  ],
  'Gaming': [
    { days: 'Mon-Fri', startHour: 21, endHour: 23, reason: 'Late-night gaming grind.' },
    { days: 'Sat-Sun', startHour: 13, endHour: 16, reason: 'Weekend afternoon marathon sessions.' },
    { days: 'Mon-Fri', startHour: 16, endHour: 18, reason: 'After-school/work gaming warm-up.' }
  ],
  'Food & Cooking': [
    { days: 'Mon-Fri', startHour: 11, endHour: 12, reason: 'Lunch inspiration for hungry scrollers.' },
    { days: 'Mon-Fri', startHour: 17, endHour: 19, reason: 'Dinner prep and evening cravings.' },
    { days: 'Sat-Sun', startHour: 9, endHour: 11, reason: 'Weekend breakfast and brunch planning.' }
  ],
  'Fashion': [
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening trend browsing and outfit planning.' },
    { days: 'Sat-Sun', startHour: 11, endHour: 13, reason: 'Weekend style inspiration.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Mid-day retail therapy scroll.' }
  ],
  'Travel': [
    { days: 'Mon-Fri', startHour: 12, endHour: 14, reason: 'Lunch break escape and daydreaming.' },
    { days: 'Sat-Sun', startHour: 9, endHour: 11, reason: 'Weekend travel inspiration.' },
    { days: 'Mon-Fri', startHour: 18, endHour: 19, reason: 'Evening travel research.' }
  ],
  'Parenting': [
    { days: 'Mon-Fri', startHour: 20, endHour: 21, reason: 'Post-kids-bedtime scroll for parents.' },
    { days: 'Sat-Sun', startHour: 10, endHour: 12, reason: 'Weekend family-activity and parenting inspiration.' },
    { days: 'Mon-Fri', startHour: 13, endHour: 14, reason: 'Mid-day naptime break.' }
  ],
  'Tech Reviews': [
    { days: 'Mon-Fri', startHour: 7, endHour: 9, reason: 'Morning tech news and commute scan.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Lunch break product research.' },
    { days: 'Mon-Fri', startHour: 18, endHour: 20, reason: 'Evening tech shopping and browsing.' }
  ],
  'Education/StudyTok': [
    { days: 'Mon-Fri', startHour: 15, endHour: 17, reason: 'After-school study focus.' },
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening study prep and tips.' },
    { days: 'Sat-Sun', startHour: 10, endHour: 12, reason: 'Weekend study planning.' }
  ],
  'Music': [
    { days: 'Mon-Fri', startHour: 20, endHour: 22, reason: 'Evening listening and discovery.' },
    { days: 'Fri-Sat', startHour: 21, endHour: 23, reason: 'Weekend vibe and music discovery.' },
    { days: 'Mon-Fri', startHour: 17, endHour: 18, reason: 'Pre-evening transition music.' }
  ],
  'Dance': [
    { days: 'Mon-Fri', startHour: 18, endHour: 20, reason: 'Active evening dance engagement.' },
    { days: 'Sat-Sun', startHour: 12, endHour: 14, reason: 'Weekend dance showcase.' },
    { days: 'Mon-Fri', startHour: 16, endHour: 17, reason: 'After-school/work energy release.' }
  ],
  'Real Estate': [
    { days: 'Mon-Fri', startHour: 8, endHour: 9, reason: 'Morning market search.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 13, reason: 'Lunch break property scan.' },
    { days: 'Sat-Sun', startHour: 13, endHour: 15, reason: 'Weekend open house browsing.' }
  ],
  'Self-Improvement/Motivation': [
    { days: 'Mon-Fri', startHour: 6, endHour: 8, reason: 'Morning routine boost.' },
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening reflection and planning.' },
    { days: 'Sat-Sun', startHour: 8, endHour: 10, reason: 'Weekend mindset reset.' }
  ],
  'Pets': [
    { days: 'Mon-Fri', startHour: 13, endHour: 14, reason: 'Mid-day pet-content mood booster.' },
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening relaxation with pets.' },
    { days: 'Sat-Sun', startHour: 11, endHour: 13, reason: 'Weekend pet playtime.' }
  ],
  'DIY/Home': [
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening project and home inspiration browsing.' },
    { days: 'Sat-Sun', startHour: 10, endHour: 13, reason: 'Weekend DIY project time.' },
    { days: 'Mon-Fri', startHour: 17, endHour: 18, reason: 'Pre-dinner home inspiration.' }
  ],
  'Business/Entrepreneurship': [
    { days: 'Mon-Fri', startHour: 7, endHour: 9, reason: 'Morning commute motivation.' },
    { days: 'Mon-Fri', startHour: 12, endHour: 14, reason: 'Lunch break business grind.' },
    { days: 'Mon-Fri', startHour: 16, endHour: 17, reason: 'Pre-evening strategy and check-in.' }
  ],
  'Sports': [
    { days: 'Mon-Fri', startHour: 19, endHour: 21, reason: 'Evening highlight and game catchup.' },
    { days: 'Sat-Sun', startHour: 13, endHour: 16, reason: 'Weekend live game and sports afternoon.' },
    { days: 'Mon-Fri', startHour: 7, endHour: 8, reason: 'Morning sports news update.' }
  ],
  'ASMR/Relaxation': [
    { days: 'Mon-Fri', startHour: 21, endHour: 23, reason: 'Pre-sleep relaxation and focus.' },
    { days: 'Mon-Fri', startHour: 23, endHour: 24, reason: 'Late-night calm and quiet.' },
    { days: 'Sat-Sun', startHour: 14, endHour: 16, reason: 'Weekend afternoon chill and decompression.' }
  ]
};

export default function App() {
  const [niche, setNiche] = useState(NICHES[0]);
  const [timezone, setTimezone] = useState(TIMEZONES[0].label);
  const [frequency, setFrequency] = useState('1x/day');
  const [region, setRegion] = useState(REGIONS[0]);
  const [results, setResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(true);
  };

  const formatHour = (hour: number) => {
    const h = hour % 24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:00 ${ampm}`;
  };

  const shiftTime = (hour: number) => {
    const tzOffset = TIMEZONES.find(tz => tz.label === timezone)?.offset || 0;
    const regionShift = region === 'Europe' ? 1 : region === 'Asia-Pacific' ? 6 : 0;
    return (hour + tzOffset + regionShift + 24) % 24;
  };

  const getRankedWindows = () => {
    const raw = NICHE_MAPPING[niche] || NICHE_MAPPING['Fitness & Gym'];
    return raw.map(win => ({
        ...win,
        time: `${formatHour(shiftTime(win.startHour))} - ${formatHour(shiftTime(win.endHour))}`
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F0E] text-white font-sans selection:bg-teal-500/30">
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span className="font-bold text-lg">Creator Search Insights</span>
        <span className="text-xs text-white/60 uppercase tracking-widest">Free Tool</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <section className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-950 text-teal-300 text-xs font-semibold mb-4 border border-teal-800">Free Posting Time Calculator</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Find When Your Audience Actually Shows Up</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">Pick your niche and time zone to get a personalized weekly posting window — built from real audience behavior patterns, not guesswork.</p>
        </section>

        {!results ? (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">Content Niche</label>
              <select value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full bg-[#181D1C] border border-white/20 rounded-lg p-3 text-white">
                {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Time Zone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full bg-[#181D1C] border border-white/20 rounded-lg p-3 text-white">
                {TIMEZONES.map(tz => <option key={tz.label} value={tz.label}>{tz.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Posting Frequency</label>
              <div className="flex gap-4">
                {['1x/day', '2-3x/day', 'A few times/week'].map(freq => (
                    <label key={freq} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="frequency" value={freq} checked={frequency === freq} onChange={(e) => setFrequency(e.target.value)} className="accent-teal-500" />
                        <span className="text-sm">{freq}</span>
                    </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Primary Audience Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-[#181D1C] border border-white/20 rounded-lg p-3 text-white">
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-teal-400 via-violet-500 to-amber-400 text-black font-bold py-3 rounded-full hover:opacity-90 transition">
              Build My Posting Schedule →
            </button>
          </form>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700">
             <h2 className="text-3xl font-bold text-center">Your Top Posting Windows</h2>
             <div className="space-y-6">
                {getRankedWindows().map((win, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                        <h3 className="font-bold text-lg text-teal-400">{idx + 1}. {win.days}, {win.time}</h3>
                        <p className="text-sm text-white/70 mt-1">{win.reason}</p>
                    </div>
                ))}
             </div>
             
             <div className="text-center">
                <p className="text-xs text-white/50 italic mb-2">Based on published audience-behavior research, not TikTok's internal data — cross-check against your own Insights tab once you have posting history.</p>
                <p className="text-xs text-white/40 mb-6">These windows are estimates — treat this as a starting point.</p>
                <button
                  onClick={() => {
                    setResults(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-full transition text-sm"
                >
                  Try Another Niche
                </button>
             </div>
          </div>
        )}

        <section className="mt-20">
           <h2 className="text-2xl font-bold mb-6">This is for you if...</h2>
           <div className="grid md:grid-cols-3 gap-6">
             {['You post consistently but views swing.', 'Not sure if timing is the issue.', 'Backed by behavior, not guesses.'].map(item => (
               <div key={item} className="bg-white/5 border border-white/10 p-6 rounded-xl text-white/80 text-sm">
                 {item}
               </div>
             ))}
           </div>
        </section>
      </main>

      <footer className="text-center py-8 text-xs text-white/40 border-t border-white/10">
        Made by Creator Search Insights — follow for more free creator tools.
      </footer>
    </div>
  );
}

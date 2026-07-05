"use client";

import { useState } from 'react';
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google';
import { Plus, Trash2, ArrowRight, ClipboardCopy, CheckCircle2, TrendingDown, Clock, AlertTriangle, ShieldCheck, MapPin, CloudLightning, Activity, Smartphone } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const notoSansDevanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600', '700'] });

export default function MandiPulseAI() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [scenario, setScenario] = useState('');
  
  const [language, setLanguage] = useState('hi');
  
  const [items, setItems] = useState([
    { name: '', quantity: '', unit: 'kg', price: '' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: '', unit: 'kg', price: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const sampleTags = [
    "🌧️ Sudden Heavy Rain / भारी बारिश",
    "🔌 Power Cut / बिजली कटौती",
    "🔥 Extreme Heatwave / लू का प्रकोप",
    "🚧 Road Blockade / रास्ता बंद"
  ];

  const fetchAnalysis = async (lang) => {
    setLoading(true);
    try {
      const res = await fetch('/api/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, scenario, items, language: lang })
      });
      
      const data = await res.json();
      if (!res.ok || data.error) {
        setResult({ error: data.error || 'Failed to process request.' });
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Failed to analyze:", error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setStep(3);
    fetchAnalysis(language);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (step === 3 && result && !loading) {
      fetchAnalysis(lang);
    }
  };

  const handleCopy = () => {
    if (result?.whatsappBroadcastCopy) {
      navigator.clipboard.writeText(result.whatsappBroadcastCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'STABLE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'CRITICAL': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'WARNING': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'STABLE': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F5] text-[#18181b] ${poppins.className}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#EAE6DA] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <h1 className="font-bold text-lg text-emerald-800 tracking-tight leading-tight">MandiPulse AI</h1>
              <p className="text-xs text-emerald-600 font-medium">Hyper-local Market Intelligence</p>
            </div>
          </div>
          {/* <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Google Gen AI APAC Cohort 2 Track</span>
          </div> */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Language Toggle Container */}
        {step === 3 && (
          <div className="mb-6 flex justify-center">
            <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-[#EAE6DA]">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${language === 'en' ? 'bg-[#047857] text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('hi')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${language === 'hi' ? 'bg-[#047857] text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>
        )}
        
        {/* Problem Narrative Section */}
        {step === 1 && (
          <div className="mb-10 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Protecting Margins in <span className="text-emerald-700">Unpredictable Markets</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Designed for everyday street vendors and market sellers whose livelihoods are crushed by sudden environmental shocks—rains, heatwaves, or power cuts. Turn distress into intelligent community sales.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="mb-10 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Analyze Your <span className="text-emerald-700">Current Stock</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
              List the items you have right now. We'll instantly calculate the perishability risk and suggest distress pricing to help you minimize losses before the shock hits hard.
            </p>
          </div>
        )}

        {/* Form Wizard - Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] overflow-hidden transition-all">
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold">Context & Disruption</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Market Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Azadpur Mandi, New Delhi / Sector 50 Weekly Market"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-zinc-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                    <CloudLightning className="w-4 h-4 text-emerald-600" />
                    Sudden Scenario
                  </label>
                  <textarea
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    placeholder="Describe the sudden shock..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-zinc-50 focus:bg-white resize-none"
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {sampleTags.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => setScenario(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${scenario === tag ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-50 p-6 sm:p-8 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!location || !scenario}
                className="flex items-center gap-2 bg-[#047857] hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Inventory
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Form Wizard - Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] overflow-hidden transition-all">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">2</div>
                  <h3 className="text-xl font-semibold">Current Stock (Dual-Language)</h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-zinc-500 hover:text-zinc-800 font-medium transition-colors"
                >
                  Back
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Product Name (English / Hindi)</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        placeholder="e.g. Spinach / पालक"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-emerald-500 outline-none bg-white"
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-emerald-500 outline-none bg-white"
                      />
                    </div>
                    <div className="w-full sm:w-20">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Unit</label>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-emerald-500 outline-none bg-white"
                      >
                        <option value="kg">kg</option>
                        <option value="pcs">pcs</option>
                        <option value="bunch">bunch</option>
                        <option value="boxes">boxes</option>
                      </select>
                    </div>
                    <div className="w-full sm:w-32">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Daily Price (₹)</label>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                        placeholder="e.g. ₹40"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-emerald-500 outline-none bg-white"
                      />
                    </div>
                    <div className="flex items-end pb-1">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddItem}
                className="w-full py-3 border-2 border-dashed border-emerald-200 text-emerald-700 font-medium rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Multiple Entry Line
              </button>
            </div>

            <div className="bg-zinc-50 p-6 sm:p-8 border-t border-zinc-100 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={items.some(i => !i.name || !i.quantity || !i.price)}
                className="flex items-center gap-2 bg-[#047857] hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                <Activity className="w-4 h-4" />
                Analyze with Gemini Flash
              </button>
            </div>
          </div>
        )}

        {/* Form Wizard - Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#047857] border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl animate-pulse">✨</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Analyzing Micro-Market Dynamics</h3>
                <p className="text-zinc-500 font-medium text-center max-w-md animate-pulse">
                  Processing parameters via Gemini Flash...
                </p>
              </div>
            ) : result?.error ? (
              <div className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-200 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Analysis Failed</h3>
                <p className="mb-6">{result.error}</p>
                <button onClick={() => { setStep(1); setResult(null); }} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                  Try Again
                </button>
              </div>
            ) : result ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => { setStep(1); setResult(null); }}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 transition-colors"
                  >
                    Start New Analysis
                  </button>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left Column: Summary & Stress */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] p-6 h-full flex flex-col">
                      <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Market Outlook
                      </h4>
                      <p className={`text-zinc-800 text-lg font-medium leading-relaxed mb-6 flex-grow ${notoSansDevanagari.className}`}>
                        {result.analysisSummary}
                      </p>
                      
                      <div className="mt-auto bg-red-50 p-4 rounded-xl border border-red-100">
                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <span className="text-sm font-bold text-red-800 flex items-center gap-1">
                              <TrendingDown className="w-4 h-4" /> {language === 'en' ? 'Footfall Drop' : 'ग्राहकों की संख्या में गिरावट'}
                            </span>
                            <p className="text-[11px] text-red-600/80 italic mt-1 leading-tight max-w-[200px]">
                              {language === 'en' ? 'Estimated reduction in active buyers entering the market area right now.' : 'बाजार में आने वाले ग्राहकों और खरीदारों की संख्या में संभावित कमी।'}
                            </p>
                          </div>
                          <span className="text-2xl font-black text-red-700">{result.footfallDropPercentage}%</span>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-2.5">
                          <div className="bg-red-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${result.footfallDropPercentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Perishability Matrix */}
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] p-6 h-full">
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                          {language === 'en' ? 'Perishability Matrix' : 'Perishability / सड़ने का जोखिम'}
                        </h4>
                        <p className="text-xs text-zinc-500 italic">
                          {language === 'en' ? 'How quickly this item will lose value if not cleared immediately.' : 'यदि इसे तुरंत नहीं निकाला गया, तो यह वस्तु कितनी जल्दी खराब हो जाएगी।'}
                        </p>
                      </div>
                      <div className="space-y-4">
                        {result.itemsAnalysis.map((item, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h5 className={`font-bold text-zinc-900 ${notoSansDevanagari.className}`}>{item.itemName}</h5>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${getRiskColor(item.riskLevel)}`}>
                                  {getRiskIcon(item.riskLevel)}
                                  {item.riskLevel}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-600">{item.reasoning}</p>
                            </div>
                            
                            <div className="flex gap-4 sm:flex-col sm:gap-2 sm:text-right min-w-[140px] shrink-0">
                              <div>
                                <span className="block text-xs font-medium text-zinc-500 uppercase">Spoils In</span>
                                <span className="font-semibold text-zinc-800 flex items-center sm:justify-end gap-1">
                                  <Clock className="w-3.5 h-3.5 text-zinc-400" /> {item.hoursBeforeSpoilage} Hrs
                                </span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-zinc-500 uppercase">Distress Price</span>
                                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5 border border-emerald-100">
                                  {item.suggestedDistressPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Row: Decisions & Marketing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DA] p-6">
                    <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-5">Intelligent Actions</h4>
                    <ul className="space-y-3">
                      {result.intelligentDecisions.map((decision, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-zinc-700 leading-relaxed">{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FAF9F5] rounded-2xl shadow-sm border-2 border-dashed border-[#047857]/30 p-6 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Smartphone className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                        💬 Gully-Marketing Broadcast
                      </h4>
                      <div className={`bg-white p-4 rounded-xl border border-emerald-100 text-zinc-800 mb-4 whitespace-pre-wrap ${notoSansDevanagari.className} shadow-sm`}>
                        {result.whatsappBroadcastCopy}
                      </div>
                      <button
                        onClick={handleCopy}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                          copied 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-[#047857] hover:bg-emerald-800 text-white shadow-sm hover:shadow'
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <ClipboardCopy className="w-5 h-5" />
                            📋 Copy Broadcast Text
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}

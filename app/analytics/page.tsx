"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, BrainCircuit, Database, Target, Zap, 
  Layers, Activity, Network, BarChart3, AlertCircle
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// --- DUMMY DATA UNTUK GRAFIK ---
const accuracyData = [
  { name: 'Random Forest', accuracy: 96.5, fill: '#3b82f6' }, // Blue
  { name: 'Naive Bayes', accuracy: 88.2, fill: '#64748b' },   // Slate
];

const featureImportanceData = [
  { subject: 'Kecepatan Angin', A: 120, fullMark: 150 },
  { subject: 'Tinggi Gelombang', A: 98, fullMark: 150 },
  { subject: 'Suhu Udara', A: 86, fullMark: 150 },
  { subject: 'Kelembapan', A: 99, fullMark: 150 },
  { subject: 'Indeks UV', A: 65, fullMark: 150 },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration error pada Recharts
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('dark'); // Memaksa Dark Mode untuk halaman ini
    document.body.style.backgroundColor = '#020617'; 
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-[#020617] text-slate-100 pb-24 font-sans ${poppins.className}`}>
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-[5000] bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-slate-300" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                <BrainCircuit size={20} />
              </div>
              <span className="font-black text-xl tracking-tight text-white uppercase">Model Analisis</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Model Engine Active</span>
          </div>
        </div>
      </nav>

      <div className="pt-28 md:pt-36 px-4 md:px-8 max-w-7xl mx-auto relative z-10 space-y-8">

        {/* HEADER SECTION */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            dashboard <span className="text-blue-500">Model</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Dapur pacu di balik keputusan SmartBeach. Kami menggunakan arsitektur ensemble learning untuk memproses data maritim mentah menjadi status keamanan yang presisi.
          </p>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">+2.4%</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Algoritma Utama</p>
            <h3 className="text-xl md:text-2xl font-black text-white">Random Forest</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Akurasi Model (RF)</p>
            <h3 className="text-3xl md:text-4xl font-black text-white">96.5<span className="text-lg text-slate-400">%</span></h3>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                <Database size={24} />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Volume Dataset</p>
            <h3 className="text-3xl md:text-4xl font-black text-white">477<span className="text-lg text-slate-400"> Baris</span></h3>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Pembanding (Naive Bayes)</p>
            <h3 className="text-3xl md:text-4xl font-black text-white">88.2<span className="text-lg text-slate-400">%</span></h3>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
          
          {/* Bar Chart: Model Comparison */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="text-blue-500" size={24} />
              <h3 className="text-lg font-bold text-white">Komparasi Akurasi Algoritma</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart: Feature Importance */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <Network className="text-emerald-500" size={24} />
              <h3 className="text-lg font-bold text-white">Bobot Fitur (Feature Importance)</h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={featureImportanceData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Pengaruh" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4 italic">
              Kecepatan angin & kelembapan menjadi faktor paling krusial dalam menentukan status pantai.
            </p>
          </div>
        </div>

        {/* CONFUSION MATRIX & MODEL EXPLANATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8">
          
          {/* Confusion Matrix Visualizer */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-purple-500" size={24} />
              <h3 className="text-lg font-bold text-white">Confusion Matrix (Random Forest)</h3>
            </div>
            
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
              {/* Matrix Grid */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs md:text-sm">
                <div className="col-span-1"></div>
                <div className="col-span-1 font-bold text-slate-400 mb-2">Pred. Aman</div>
                <div className="col-span-1 font-bold text-slate-400 mb-2">Pred. Waspada</div>
                <div className="col-span-1 font-bold text-slate-400 mb-2">Pred. Bahaya</div>

                <div className="font-bold text-slate-400 flex items-center justify-end pr-4">Aktual Aman</div>
                <div className="bg-blue-600/80 text-white p-4 rounded-xl font-black text-lg border border-blue-500">842</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">12</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">0</div>

                <div className="font-bold text-slate-400 flex items-center justify-end pr-4">Aktual Waspada</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">15</div>
                <div className="bg-blue-600/60 text-white p-4 rounded-xl font-black text-lg border border-blue-500">310</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">8</div>

                <div className="font-bold text-slate-400 flex items-center justify-end pr-4">Aktual Bahaya</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">0</div>
                <div className="bg-slate-800/50 text-slate-400 p-4 rounded-xl border border-slate-700">9</div>
                <div className="bg-blue-600/40 text-white p-4 rounded-xl font-black text-lg border border-blue-500">185</div>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> True Positive</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-800 border border-slate-600 rounded-sm"></div> False Negative</div>
            </div>
          </div>

          {/* Model Explanation */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-800 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 w-max">
              <AlertCircle size={16} /> Architect's Note
            </div>
            
            <h3 className="text-2xl font-black text-white mb-4">Mengapa Random Forest?</h3>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>
                Setelah melakukan komparasi antara Naive Bayes, SVM, dan Random Forest, kami memutuskan untuk menggunakan <strong>Random Forest Classifier</strong> sebagai decision engine utama.
              </p>
              <p>
                Random Forest bekerja dengan cara membangun ratusan "Pohon Keputusan" (Decision Trees) secara acak dan mengambil voting terbanyak. Ini sangat ideal untuk data cuaca laut karena:
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span>
                  <span>Sangat tahan terhadap <strong>Outliers</strong> (cuaca ekstrem anomali yang tiba-tiba muncul).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span>
                  <span>Mampu menangani hubungan non-linear antara kecepatan angin dan tinggi gelombang secara kompleks tanpa *overfitting*.</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-slate-800 text-xs italic text-slate-500">
                * Model telah ditraining ulang (retrained) pada Q1 2026 menggunakan data BMKG Lampung dan Open-Meteo Historis.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

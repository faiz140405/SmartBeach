"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import { 
  MapPin, Wind, ThermometerSun, Sun, Waves, 
  CheckCircle2, AlertTriangle, ShieldAlert, Ticket, Clock, 
  CarFront, Info, Check, Sunrise, Sunset, Camera, Loader2,
  Sparkles, Trophy, Map as MapIcon, Radar, Activity, Navigation, 
  ChevronDown, ChevronUp, MessageCircle, X, Send, Bot, User,
  BotMessageSquare, Sparkle
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-50 animate-pulse flex flex-col items-center justify-center text-slate-300">
      <MapIcon size={48} className="mb-3 animate-bounce opacity-10" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-30">Mengalibrasi Satelit...</span>
    </div>
  )
});

const PANTAI_LAMPUNG = [
  { nama: "Daftar Pantai...", lat: -5.4254, lng: 105.2590, info: null },
  { nama: "Pantai Mutun (Pesawaran)", lat: -5.5507, lng: 105.2428, info: { deskripsi: "Pantai berpasir putih terdekat dari Bandar Lampung, sangat ramah anak.", htm: "Rp 25.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Mudah, semua kendaraan.", fasilitas: ["Pondokan", "Banana Boat", "Bilas"], waktuTerbaik: "15:00 - 17:00 WIB" } },
  { nama: "Pantai Sari Ringgung (Pesawaran)", lat: -5.5715, lng: 105.2624, info: { deskripsi: "Terkenal dengan fenomena Pasir Timbul dan Masjid Terapung.", htm: "Rp 20.000 / Orang", jam: "06:00 - 18:00 WIB", akses: "Aspal mulus.", fasilitas: ["Perahu", "Masjid Apung", "Kafe"], waktuTerbaik: "08:00 - 11:00 WIB" } },
  { nama: "Pantai Klara (Pesawaran)", lat: -5.5968, lng: 105.2215, info: { deskripsi: "Singkatan dari 'Kelapa Rapat', perairan dangkal dan teduh.", htm: "Rp 15.000 / Motor", jam: "07:00 - 18:00 WIB", akses: "Pinggir jalan raya.", fasilitas: ["Gazebo", "Kano", "Kamar Mandi"], waktuTerbaik: "10:00 - 14:00 WIB" } },
  { nama: "Pantai Dewi Mandapa (Pesawaran)", lat: -5.6254, lng: 105.2146, info: { deskripsi: "Wisata mangrove dengan jembatan kayu dan Pulau Cinta.", htm: "Rp 15.000 / Orang", jam: "08:00 - 18:00 WIB", akses: "Aspal & tanah.", fasilitas: ["Foto Mangrove", "Pulau Cinta", "Warung"], waktuTerbaik: "16:00 - 18:00 WIB" } },
  { nama: "Pulau Pahawang (Pesawaran)", lat: -5.6704, lng: 105.2318, info: { deskripsi: "Surga snorkeling dengan pemandangan taman nemo bawah laut.", htm: "Tur mulai Rp 150rb", jam: "07:00 - 17:00 WIB", akses: "Perahu dari Ketapang.", fasilitas: ["Snorkeling", "Homestay", "Makan"], waktuTerbaik: "08:00 - 11:00 WIB" } },
  { nama: "Pantai Pasir Putih (Lampung Selatan)", lat: -5.5522, lng: 105.4067, info: { deskripsi: "Pantai legendaris dengan panorama laut lepas dan Pulau Condong.", htm: "Rp 15.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Lintas Sumatera.", fasilitas: ["Souvenir", "Perahu", "Bilas"], waktuTerbaik: "15:30 - 17:30 WIB" } },
  { nama: "Pantai Sebalang (Lampung Selatan)", lat: -5.5198, lng: 105.3902, info: { deskripsi: "Pantai vibes Jimbaran Bali, dengan bean bag dan live music.", htm: "Rp 20.000 / Orang", jam: "10:00 - 22:00 WIB", akses: "Area PLTU.", fasilitas: ["Kafe", "Live Music", "Sunset"], waktuTerbaik: "16:30 - 19:00 WIB" } },
  { nama: "Pantai Marina (Lampung Selatan)", lat: -5.7420, lng: 105.6180, info: { deskripsi: "Pantai berkarang dengan hantaman ombak besar khas Samudra Hindia.", htm: "Rp 30.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Aspal mulus.", fasilitas: ["Kafe", "Prewedding", "Mushola"], waktuTerbaik: "16:00 - 18:00 WIB" } },
  { nama: "Pantai Minang Rua (Lampung Selatan)", lat: -5.8656, lng: 105.7367, info: { deskripsi: "Paket komplit: laut, goa karang, air terjun, Green Canyon.", htm: "Rp 10.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Turunan curam.", fasilitas: ["Guide", "Jumping", "Camping"], waktuTerbaik: "08:00 - 12:00 WIB" } },
  { nama: "Pantai Ketang (Lampung Selatan)", lat: -5.7165, lng: 105.5982, info: { deskripsi: "Pantai karang hitam eksotis sisa letusan Krakatau.", htm: "Gratis - 5rb", jam: "24 Jam", akses: "Pinggir jalan.", fasilitas: ["Warung", "Parkir", "Foto"], waktuTerbaik: "16:00 - 17:30 WIB" } },
  { nama: "Pantai Batu Lapis (Lampung Selatan)", lat: -5.9105, lng: 105.7483, info: { deskripsi: "Karang laut berbentuk berlapis-lapis unik dan fotogenik.", htm: "Rp 15.000 / Orang", jam: "07:00 - 17:00 WIB", akses: "Trekking santai.", fasilitas: ["Spot Foto", "Warung", "Parkir"], waktuTerbaik: "15:00 - 17:00 WIB" } },
  { nama: "Pantai Embe (Lamsel)", lat: -5.5312, lng: 105.3734, info: { deskripsi: "Resort modern dengan garis pantai panjang dan bersih.", htm: "Rp 35.000 / Orang", jam: "08:00 - 18:00 WIB", akses: "Sangat mudah.", fasilitas: ["Resort", "Pool", "Resto"], waktuTerbaik: "Pagi/Sore" } },
  { nama: "Pantai Duta Wisata (Bandar Lampung)", lat: -5.4487, lng: 105.2421, info: { deskripsi: "Tepat di pinggir kota, menawarkan pemandangan Teluk Lampung.", htm: "Rp 15.000 / Orang", jam: "08:00 - 18:00 WIB", akses: "Bisa Ojek Online.", fasilitas: ["Sewa Ban", "Pondok", "Warung"], waktuTerbaik: "16:00 - 18:00 WIB" } },
  { nama: "Pantai Tanjung Setia (Pesisir Barat)", lat: -5.2675, lng: 103.9313, info: { deskripsi: "Surga peselancar dunia dengan ombak tertinggi Mei-Oktober.", htm: "Rp 10.000 / Orang", jam: "24 Jam", akses: "Jalan Lintas Barat.", fasilitas: ["Resort", "Surf Rental", "Kafe"], waktuTerbaik: "Pagi Hari" } },
  { nama: "Pantai Labuhan Jukung (Pesisir Barat)", lat: -5.1937, lng: 103.9384, info: { deskripsi: "Pusat keramaian Krui, lokasi festival selancar internasional.", htm: "Rp 5.000 / Motor", jam: "24 Jam", akses: "Pusat Kota Krui.", fasilitas: ["Alun-alun", "Taman", "Seafood"], waktuTerbaik: "16:30 - 18:30 WIB" } },
  { nama: "Pantai Walur (Pesisir Barat)", lat: -5.2364, lng: 103.9408, info: { deskripsi: "Pasir putih bersih dengan pemandangan mercusuar.", htm: "Gratis", jam: "24 Jam", akses: "Bisa kendaraan.", fasilitas: ["Mancing", "Piknik", "Lodging"], waktuTerbaik: "Pagi Hari" } },
  { nama: "Pantai Mandiri (Pesisir Barat)", lat: -5.2488, lng: 103.9425, info: { deskripsi: "Pasir hitam eksotis membentang lurus tanpa karang.", htm: "Gratis", jam: "24 Jam", akses: "Pinggir jalan raya.", fasilitas: ["Sunset Spot", "Warung", "Rest Area"], waktuTerbaik: "17:00 - 18:30 WIB" } },
  { nama: "Pantai Gigi Hiu (Tanggamus)", lat: -5.7552, lng: 105.0897, info: { deskripsi: "Gugusan batu karang tajam bak gigi hiu yang estetik.", htm: "Rp 20.000 / Orang", jam: "06:00 - 17:00 WIB", akses: "Tantangan tinggi.", fasilitas: ["Parkir", "Spot Foto"], waktuTerbaik: "Sore Hari" } },
  { nama: "Pantai Teluk Kiluan (Tanggamus)", lat: -5.7807, lng: 105.1015, info: { deskripsi: "Habitat lumba-lumba liar dan memiliki lagun karang bening.", htm: "Rp 15.000", jam: "24 Jam", akses: "Jalan Berbukit.", fasilitas: ["Jukung", "Homestay", "Guide"], waktuTerbaik: "06:00 - 08:00 WIB" } },
  { nama: "Pantai Batu Karang (Tanggamus)", lat: -5.7001, lng: 105.0845, info: { deskripsi: "Pantai tersembunyi dengan bebatuan besar pelindung ombak.", htm: "Rp 10.000 / Orang", jam: "08:00 - 17:00 WIB", akses: "Jalan bebatuan.", fasilitas: ["Mancing", "Relaksasi"], waktuTerbaik: "Pagi Hari" } }
];

const GEMINI_API_KEY = "AIzaSyA6S91KCuWDnrGJHykVDobLTS8CfvtWejs";

// ==========================================
// CHATBOT COMPONENT (SOPHISTICATED UI)
// ==========================================
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Saya **SmartBeach Assistant**. Butuh info ombak, cuaca, atau rekomendasi pantai di Lampung?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const systemPrompt = `Kamu adalah 'SmartBeach AI', asisten pakar pariwisata pantai Lampung. 
      Tugasmu: Menjawab pertanyaan cuaca, keamanan laut, rute, dan rekomendasi pantai.
      Gaya bicara: Ramah, informatif, profesional namun santai. Gunakan Markdown (seperti bold) untuk poin penting.
      User bertanya: ${userText}`;

      // Menggunakan Model Gemini 1.5 Flash (Terbaru & Cepat)
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: systemPrompt }] }]
        })
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Maaf, satelit komunikasi saya sedang terganggu. Coba sebentar lagi ya! 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-[10000] font-poppins">
      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[calc(100vw-32px)] md:w-[400px] h-[70vh] md:h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 translate-y-10'}`}>
        
        {/* Chat Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-5 md:p-6 flex items-center justify-between text-white shrink-0 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
              <BotMessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight tracking-tight">SmartBeach AI</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Active Intelligence</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'bot' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'}`}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div 
                className={`p-4 rounded-3xl max-w-[85%] text-[13px] md:text-sm leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 border border-slate-200/60 rounded-bl-none'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 px-10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2.5 items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya info pantai..." 
            className="flex-1 bg-slate-100 text-sm p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 disabled:opacity-30 transition-all shadow-md active:scale-90"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Bubble Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(37,99,235,0.3)] transition-all duration-500 hover:scale-110 active:scale-90 border-4 border-white overflow-hidden relative group ${isOpen ? 'bg-slate-900 rotate-180' : 'bg-blue-600'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
        {isOpen ? <X size={28} className="text-white" /> : <BotMessageSquare size={32} className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full animate-bounce shadow-lg"></span>
        )}
      </button>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD (PREMIUM LAYOUT)
// ==========================================
export default function Home() {
  const [position, setPosition] = useState({ lat: -5.4254, lng: 105.2590 });
  const [selectedPantai, setSelectedPantai] = useState(PANTAI_LAMPUNG[0].nama);
  const [hasil, setHasil] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rekomendasiTerbaik, setRekomendasiTerbaik] = useState<any[] | null>(null);
  const [isScanningAll, setIsScanningAll] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(true);

  const handlePredict = async () => {
    setLoading(true); setError(""); setHasil(null);
    try {
      const res = await fetch("https://faiz140405-backend-smartbeach.hf.space/predict-by-location", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: position.lat, lon: position.lng }),
      });
      if (!res.ok) throw new Error("API Offline.");
      const data = await res.json();
      setHasil(data);
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err: any) {
      setError("Satelit gagal merespons. Pastikan Backend aktif.");
    } finally { setLoading(false); }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleDeepScan = async () => {
    setIsScanningAll(true); setRekomendasiTerbaik(null); setError("");
    try {
      const daftar = PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...");
      const hasilSemua = [];
      for (let i = 0; i < daftar.length; i++) {
        const p = daftar[i];
        try {
          const res = await fetch("https://faiz140405-backend-smartbeach.hf.space/predict-by-location", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: p.lat, lon: p.lng }),
          });
          if (res.ok) {
            const data = await res.json();
            hasilSemua.push({ ...p, statusAI: data.rekomendasi, cuaca: data.detail_cuaca });
          }
        } catch (e) {}
        await delay(300); 
      }
      if (hasilSemua.length === 0) throw new Error("Koneksi gagal.");
      let kandidat = hasilSemua.filter(p => p.statusAI === "Aman");
      if (kandidat.length === 0) kandidat = hasilSemua.filter(p => p.statusAI === "Waspada");
      kandidat.sort((a, b) => a.cuaca.angin_ms - b.cuaca.angin_ms);
      setRekomendasiTerbaik(kandidat);
    } catch (err: any) { setError("Deep Scan terhenti."); } 
    finally { setIsScanningAll(false); }
  };

  const getSaran = (status: string) => {
    if (status === "Aman") return { teks: "Sangat Aman! Nikmati aktivitas air dengan nyaman.", icon: <CheckCircle2 className="text-emerald-500" />, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50 border-emerald-100" };
    if (status === "Waspada") return { teks: "Perhatian. Angin/ombak sedang moderat. Tetap waspada.", icon: <AlertTriangle className="text-amber-500" />, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 border-amber-100" };
    return { teks: "BAHAYA. Cuaca ekstrem terdeteksi. Hindari pantai hari ini.", icon: <ShieldAlert className="text-red-500" />, color: "from-red-500 to-rose-700", bg: "bg-red-50 border-red-100" };
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 selection:bg-blue-100 overflow-x-hidden ${poppins.className}`}>
      
      <FloatingChatbot />

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .leaflet-top { top: 95px !important; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
      `}} />

      {/* 1. GLASS NAVBAR */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[94%] max-w-6xl">
        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/50 px-5 md:px-10 py-4 rounded-[2.5rem] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-600/30">
              <Waves size={22} />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-800">
              SmartBeach<span className="text-blue-600">.ai</span>
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-8">
            <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <MapPin size={16} className="text-blue-600"/>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Lampung, ID</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">System Online</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO MAP SECTION */}
      <div className="relative w-full">
        <section className="w-full h-[60vh] md:h-[700px] z-0 overflow-hidden shadow-inner">
          <MapPicker 
            position={position} 
            setPosition={setPosition} 
            daftarPantai={PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...")} 
          />
        </section>
        
        {/* NAVIGATION RADAR BOX */}
        <div className="relative z-10 -mt-20 px-4 md:absolute md:bottom-12 md:left-12 md:px-0 md:mt-0 w-full md:w-[440px]">
          <div className="bg-white/80 backdrop-blur-3xl p-6 md:p-8 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white transition-all duration-500 overflow-hidden">
            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsRadarOpen(!isRadarOpen)}>
               <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-xl text-blue-600">
                  <Radar size={20} className={loading ? "animate-spin" : ""} />
                </div>
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.15em]">Radar Navigasi</h2>
               </div>
               {isRadarOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </div>
            
            {isRadarOpen && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                <div className="relative group">
                  <select 
                    value={selectedPantai}
                    onChange={(e) => {
                      const p = PANTAI_LAMPUNG.find(x => x.nama === e.target.value);
                      if(p) { setSelectedPantai(p.nama); setPosition({lat: p.lat, lng: p.lng}); setHasil(null); }
                    }}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent group-hover:border-blue-500/20 focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all cursor-pointer font-bold text-slate-700 appearance-none text-sm md:text-base shadow-sm"
                  >
                    {PANTAI_LAMPUNG.map((p, idx) => <option key={idx} value={p.nama}>{p.nama}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                </div>

                <div className="flex gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 items-center justify-center">
                  <Activity size={16} className="text-blue-500" />
                  <span className="text-[10px] font-mono font-bold text-blue-600 tracking-widest">{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span>
                </div>

                <button 
                  onClick={handlePredict}
                  disabled={loading} 
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-5 rounded-[1.5rem] font-black text-sm md:text-base shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {loading ? <><Loader2 className="animate-spin" /> Menganalisis...</> : <><Sparkle className="group-hover:rotate-45 transition-transform" /> Pindai Keamanan</>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 mt-12 md:mt-20 space-y-12 relative z-10">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-5 rounded-3xl text-center border border-red-100 font-bold flex items-center justify-center gap-3 shadow-sm">
            <ShieldAlert size={22} /> <span className="text-sm tracking-tight">{error}</span>
          </div>
        )}

        {/* RESULTS CARD */}
        {hasil && (
          <div id="result-area" className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden scroll-mt-28 animate-in fade-in zoom-in-95 duration-500">
            <div className={`p-10 md:p-20 text-center text-white bg-gradient-to-br ${getSaran(hasil.rekomendasi).color} relative`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6 opacity-80">AI Safety Intelligence Report</p>
              <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-none mb-4 drop-shadow-2xl">{hasil.rekomendasi}</h2>
            </div>
            
            <div className={`mx-6 md:mx-12 -mt-10 mb-10 p-6 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 md:gap-10 border-2 shadow-xl ${getSaran(hasil.rekomendasi).bg}`}>
              <div className="bg-white p-6 rounded-3xl shadow-lg shrink-0 scale-110">
                {React.cloneElement(getSaran(hasil.rekomendasi).icon, { size: 48 })}
              </div>
              <div className="text-center md:text-left space-y-2">
                <h3 className="font-black text-2xl md:text-3xl text-slate-800 tracking-tight">Rekomendasi Aktivitas</h3>
                <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">{getSaran(hasil.rekomendasi).teks}</p>
              </div>
            </div>

            <div className="px-6 md:px-12 pb-16 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[
                { icon: ThermometerSun, label: "Temperatur", val: `${hasil.detail_cuaca.suhu_saat_ini}°C`, c: "text-orange-500", b: "bg-orange-50" },
                { icon: Wind, label: "Kec. Angin", val: `${hasil.detail_cuaca.angin_maks_ms} m/s`, c: "text-blue-500", b: "bg-blue-50" },
                { icon: Waves, label: "Tinggi Ombak", val: hasil.detail_cuaca.tinggi_gelombang_meter !== "N/A" ? `${hasil.detail_cuaca.tinggi_gelombang_meter}m` : "N/A", c: "text-teal-600", b: "bg-teal-50" },
                { icon: Sunrise, label: "Matahari Terbit", val: hasil.detail_cuaca.sunrise, c: "text-amber-600", b: "bg-amber-50" },
                { icon: Sunset, label: "Matahari Terbenam", val: hasil.detail_cuaca.sunset, c: "text-indigo-600", b: "bg-indigo-50" },
                { icon: Sun, label: "UV Index", val: `LEVEL ${hasil.detail_cuaca.uv_index}`, c: hasil.detail_cuaca.uv_index > 6 ? "text-red-600" : "text-blue-600", b: hasil.detail_cuaca.uv_index > 6 ? "bg-red-50" : "bg-blue-50" },
              ].map((x, i) => (
                <div key={i} className="bg-slate-50/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center transition-all hover:bg-white hover:shadow-md">
                  <div className={`w-14 h-14 ${x.b} ${x.c} rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                    <x.icon size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{x.label}</span>
                  <span className="text-xl md:text-2xl font-black text-slate-800">{x.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BEACH DIRECTORY (POLISHED) */}
        {(() => {
          const p = PANTAI_LAMPUNG.find(x => x.nama === selectedPantai);
          if (p && p.info) {
            return (
              <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 animate-in slide-in-from-bottom-10 duration-700">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
                  <div className="bg-blue-600 text-white p-5 rounded-[1.5rem] shadow-xl shadow-blue-600/20"><Info size={32}/></div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-800">Panduan Wisata {p.nama}</h3>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Eksplorasi Destinasi Terbaik Lampung</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <div className="p-6 md:p-8 bg-slate-50 rounded-[2rem] border-l-8 border-blue-600">
                      <p className="text-slate-600 font-semibold text-lg md:text-xl italic leading-relaxed">"{p.info.deskripsi}"</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <Ticket size={24} className="text-emerald-500 mb-4"/>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Tiket Masuk</p>
                        <p className="font-bold text-lg text-slate-700">{p.info.htm}</p>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <Clock size={24} className="text-orange-500 mb-4"/>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Jam Operasional</p>
                        <p className="font-bold text-lg text-slate-700">{p.info.jam}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                      <p className="text-[10px] text-blue-400 font-black uppercase mb-4 tracking-[0.2em]">Aksesibilitas & Sarana</p>
                      <div className="flex items-start gap-4 mb-6">
                        <CarFront size={20} className="text-blue-500 shrink-0 mt-1"/>
                        <p className="text-sm md:text-base font-medium text-slate-300 leading-relaxed">{p.info.akses}</p>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {p.info.fasilitas.map((f, i) => <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold rounded-xl shadow-sm text-slate-200">{f}</span>)}
                      </div>
                    </div>
                    {p.info.waktuTerbaik && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-3xl flex gap-6 items-center shadow-xl shadow-blue-600/20 group cursor-default">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md group-hover:rotate-12 transition-transform"><Camera size={32}/></div>
                        <div><p className="text-[10px] font-black text-blue-200 uppercase mb-1 tracking-widest">Waktu Terbaik</p><p className="text-base md:text-lg font-bold leading-tight">{p.info.waktuTerbaik}</p></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* AI DEEP SCAN (FUTURISTIC) */}
        <section className="bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">Provincial AI Engine</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent tracking-tighter">
                Scanning <br/>Beach Satellites
              </h2>
              <p className="text-base md:text-xl text-slate-400 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Teknologi AI kami memindai anomali cuaca di 20 titik pantai Lampung secara bersamaan untuk kenyamanan liburan Anda.
              </p>
              <button 
                onClick={handleDeepScan}
                disabled={isScanningAll}
                className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isScanningAll ? <><Loader2 className="animate-spin" /> Deep Scanning...</> : <><Radar /> Mulai Pemindaian</>}
              </button>
            </div>

            <div className="w-full">
              {rekomendasiTerbaik !== null && (
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] animate-in slide-in-from-right-12 duration-700">
                  {rekomendasiTerbaik.length > 0 ? (
                    <div className="space-y-5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                        <Trophy size={16} className="text-yellow-400"/> AI Top Recommendations
                      </p>
                      {rekomendasiTerbaik.slice(0, 2).map((pantai, idx) => (
                        <div key={idx} onClick={() => pilihDariRekomendasi(pantai.nama, pantai.lat, pantai.lng)}
                          className="bg-white/5 hover:bg-white/10 border border-white/5 p-6 rounded-[1.5rem] cursor-pointer transition-all hover:-translate-y-2 relative group"
                        >
                          <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase ${pantai.statusAI === 'Aman' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {pantai.statusAI}
                          </div>
                          <h3 className="font-black text-xl text-white mb-2 pr-20 group-hover:text-blue-400 transition-colors">{pantai.nama}</h3>
                          <div className="flex gap-6 mt-6">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Wind size={14} className="text-blue-400"/>
                              <span className="text-[11px] font-bold uppercase">{pantai.cuaca.angin_ms} m/s</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Waves size={14} className="text-teal-400"/>
                              <span className="text-[11px] font-bold uppercase">{pantai.cuaca.tinggi_gelombang_meter} m</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 opacity-40">
                      <ShieldAlert size={64} className="mb-6 mx-auto text-red-500 animate-pulse"/>
                      <p className="text-xs font-black uppercase tracking-[0.4em]">Extreme Weather Alert</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center pt-24 pb-10 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500">Lampung Smart Beach AI Dashboard</p>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import { 
  MapPin, Wind, ThermometerSun, Sun, Waves, 
  CheckCircle2, AlertTriangle, ShieldAlert, Ticket, Clock, 
  CarFront, Info, Sunrise, Sunset, Camera, Loader2,
  Sparkles, Trophy, Map as MapIcon, Radar, Activity, Navigation, 
  ChevronDown, MessageCircle, X, Send, Bot, User,
  BotMessageSquare, Moon
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col items-center justify-center rounded-3xl">
      <MapIcon size={48} className="text-blue-500/40 animate-bounce mb-2" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Memuat Peta...</span>
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
// CHATBOT COMPONENT (RESPONSIVE)
// ==========================================
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Saya SmartBeach AI. Ada yang bisa saya bantu terkait liburan pantai Anda di Lampung?" }
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
      User bertanya: ${userText}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: systemPrompt }] }] })
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Sistem saya sedang sibuk. Mohon tunggu sebentar ya! 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[calc(100vw-32px)] md:w-[380px] h-[60vh] md:h-[550px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        <div className="bg-blue-600 p-4 md:p-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <BotMessageSquare size={22} />
            <div>
              <h3 className="font-bold text-sm">SmartBeach AI</h3>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-3 md:p-4 rounded-2xl max-w-[80%] text-[13px] md:text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>
          ))}
          {isTyping && <div className="text-xs text-slate-400 font-medium animate-pulse ml-11">Tunggu sebentar...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketikkan pesan..." 
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" disabled={!input.trim()} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50">
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-xl text-white transition-transform hover:scale-105 active:scale-95">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD PAGE
// ==========================================
export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [position, setPosition] = useState({ lat: -5.4254, lng: 105.2590 });
  const [selectedPantai, setSelectedPantai] = useState(PANTAI_LAMPUNG[0].nama);
  const [hasil, setHasil] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rekomendasiTerbaik, setRekomendasiTerbaik] = useState<any[] | null>(null);
  const [isScanningAll, setIsScanningAll] = useState(false);

  // GLOBAL DARK MODE TOGGLE
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const handlePredict = async () => {
    setLoading(true); setError(""); setHasil(null);
    try {
      const res = await fetch("https://faiz140405-backend-smartbeach.hf.space/predict-by-location", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: position.lat, lon: position.lng }),
      });
      if (!res.ok) throw new Error("Gagal menghubungi server Satelit.");
      const data = await res.json();
      setHasil(data);
      setTimeout(() => document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    } catch (err) { setError("Gagal terhubung ke satelit. Pastikan backend aktif."); } 
    finally { setLoading(false); }
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleDeepScan = async () => {
    setIsScanningAll(true); setRekomendasiTerbaik(null); setError("");
    try {
      const daftar = PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...");
      const hasilSemua = [];
      for (const p of daftar) {
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
        await delay(400); 
      }
      let kandidat = hasilSemua.filter(p => p.statusAI === "Aman");
      if (kandidat.length === 0) kandidat = hasilSemua.filter(p => p.statusAI === "Waspada");
      kandidat.sort((a, b) => a.cuaca.angin_ms - b.cuaca.angin_ms);
      setRekomendasiTerbaik(kandidat);
    } catch (err) { setError("Deep Scan terhenti karena masalah jaringan."); } 
    finally { setIsScanningAll(false); }
  };

  const pilihDariRekomendasi = (nama: string, lat: number, lng: number) => {
    setSelectedPantai(nama); setPosition({ lat, lng }); setHasil(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSaran = (status: string) => {
    if (status === "Aman") return { 
      teks: "Kondisi laut sangat bersahabat. Nikmati liburan Anda!", 
      icon: <CheckCircle2 className="text-emerald-500" />, 
      color: "text-emerald-600 dark:text-emerald-400", 
      bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" 
    };
    if (status === "Waspada") return { 
      teks: "Angin/ombak sedikit moderat. Harap berhati-hati di air.", 
      icon: <AlertTriangle className="text-amber-500" />, 
      color: "text-amber-600 dark:text-amber-400", 
      bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" 
    };
    return { 
      teks: "Terdapat indikasi cuaca ekstrem. Disarankan menjauhi bibir pantai.", 
      icon: <ShieldAlert className="text-red-500" />, 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800" 
    };
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20 ${poppins.className}`}>
      
      <FloatingChatbot />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[5000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white"><Waves size={20} /></div>
            <span className="font-black text-lg tracking-tight">SmartBeach<span className="text-blue-600">.ai</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Satelit Aktif</span>
            </div>
            <button onClick={toggleDarkMode} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* DASHBOARD LAYOUT (GRID RESPONSIVE) */}
      <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-sm md:text-base">
            <ShieldAlert size={20} /> {error}
          </div>
        )}

        {/* TOP SECTION: KONTROL (KIRI) & PETA (KANAN) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* KOLOM KIRI: KONTROL */}
          <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Navigation size={20} />
                </div>
                <h2 className="font-bold text-lg">Pilih Lokasi Pantai</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <select 
                    value={selectedPantai}
                    onChange={(e) => {
                      const p = PANTAI_LAMPUNG.find(x => x.nama === e.target.value);
                      if(p) { setSelectedPantai(p.nama); setPosition({lat: p.lat, lng: p.lng}); setHasil(null); }
                    }}
                    className="w-full p-3.5 md:p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-800 dark:text-slate-100 text-sm md:text-base"
                  >
                    {PANTAI_LAMPUNG.map((p, idx) => <option key={idx} value={p.nama}>{p.nama}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>

                <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs md:text-sm font-mono text-slate-500 dark:text-slate-400 justify-center">
                  <MapPin size={16} className="shrink-0" />
                  <span>Lat: {position.lat.toFixed(4)}</span> <span className="hidden sm:inline">|</span> <span>Lon: {position.lng.toFixed(4)}</span>
                </div>

                <button 
                  onClick={handlePredict} disabled={loading} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-70 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Radar size={20} />}
                  {loading ? "Menganalisis Satelit..." : "Pindai Keamanan Laut"}
                </button>
              </div>
            </div>

            {/* INFO PANDUAN WISATA SINGKAT */}
            {(() => {
              const p = PANTAI_LAMPUNG.find(x => x.nama === selectedPantai);
              if (p && p.info) {
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2"><Info size={18} className="text-blue-500" /> Info Wisata</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 italic leading-relaxed">"{p.info.deskripsi}"</p>
                    <div className="space-y-3 text-xs md:text-sm">
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-slate-500 flex items-center gap-2"><Ticket size={14}/> Tiket</span>
                        <span className="font-semibold text-right">{p.info.htm}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-slate-500 flex items-center gap-2"><Clock size={14}/> Buka</span>
                        <span className="font-semibold text-right">{p.info.jam}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 flex items-center gap-2"><Camera size={14}/> Best Time</span>
                        <span className="font-semibold text-right">{p.info.waktuTerbaik}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* KOLOM KANAN: MAP & HASIL */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            
            {/* PETA TAMPILAN HP DIPERBAIKI TINGGINYA */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 relative z-0">
              <MapPicker position={position} setPosition={setPosition} daftarPantai={PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...")} />
            </div>

            {/* HASIL SCAN (RESPONSIVE GRID) */}
            {hasil && (
              <div id="result-area" className={`rounded-3xl p-5 md:p-8 border-2 shadow-lg animate-in slide-in-from-bottom-6 duration-500 ${getSaran(hasil.rekomendasi).bg}`}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm shrink-0">
                    {React.cloneElement(getSaran(hasil.rekomendasi).icon, { size: 40 })}
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Status Keamanan AI</p>
                    <h2 className={`text-3xl md:text-5xl font-black mb-2 ${getSaran(hasil.rekomendasi).color}`}>{hasil.rekomendasi}</h2>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium">{getSaran(hasil.rekomendasi).teks}</p>
                  </div>
                </div>

                {/* GRID 2 KOLOM DI HP, 3 KOLOM DI TABLET/PC */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { icon: ThermometerSun, label: "Suhu Udara", val: `${hasil.detail_cuaca.suhu_saat_ini}°C` },
                    { icon: Wind, label: "Kec. Angin", val: `${hasil.detail_cuaca.angin_maks_ms} m/s` },
                    { icon: Waves, label: "Ombak", val: hasil.detail_cuaca.tinggi_gelombang_meter !== "N/A" ? `${hasil.detail_cuaca.tinggi_gelombang_meter}m` : "N/A" },
                    { icon: Sunrise, label: "Matahari Terbit", val: hasil.detail_cuaca.sunrise },
                    { icon: Sunset, label: "Matahari Terbenam", val: hasil.detail_cuaca.sunset },
                    { icon: Sun, label: "Indeks UV", val: hasil.detail_cuaca.uv_index },
                  ].map((x, i) => (
                    <div key={i} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex flex-col items-center text-center">
                      <x.icon size={20} className="text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2" />
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase">{x.label}</span>
                      <span className="text-base md:text-lg font-black text-slate-800 dark:text-slate-100">{x.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI DEEP SCAN SECTION (MENUMPUK DI BAWAH HP) */}
        <section className="mt-12 bg-slate-900 dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-64 md:w-[400px] h-64 md:h-[400px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[100px]"></div>
          
          <div className="relative z-10 grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-2 space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} /> AI Deep Scan
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Smart Beach <br/><span className="text-blue-400">Provinsi Lampung</span></h2>
              <p className="text-sm md:text-base text-slate-400 font-medium">Pindai seluruh pantai Lampung sekaligus. Temukan lokasi wisata paling aman hari ini dengan sekali klik.</p>
              <button onClick={handleDeepScan} disabled={isScanningAll} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base">
                {isScanningAll ? <Loader2 className="animate-spin" size={18} /> : <Radar size={18} />} {isScanningAll ? "Memindai Area..." : "Mulai Pemindaian"}
              </button>
            </div>

            <div className="lg:col-span-3 w-full">
              {rekomendasiTerbaik !== null && (
                <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl w-full">
                  {rekomendasiTerbaik.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-4"><Trophy size={14} /> Pantai Teraman Hari Ini</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {rekomendasiTerbaik.slice(0, 4).map((p, i) => (
                          <div key={i} onClick={() => pilihDariRekomendasi(p.nama, p.lat, p.lng)} className="bg-slate-800 hover:bg-slate-700 p-4 md:p-5 rounded-2xl cursor-pointer transition-all border border-slate-700 hover:border-blue-500 relative">
                            <h3 className="font-bold text-xs md:text-sm text-white mb-2 md:mb-3 pr-8">{p.nama}</h3>
                            <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${p.statusAI === 'Aman' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></div>
                            <div className="flex gap-3 md:gap-4 text-[10px] md:text-xs text-slate-400">
                              <span className="flex items-center gap-1"><Wind size={12}/> {p.cuaca.angin_ms}m/s</span>
                              <span className="flex items-center gap-1"><Waves size={12}/> {p.cuaca.tinggi_gelombang_meter}m</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12 opacity-50"><ShieldAlert size={36} className="mx-auto mb-3" /><p className="font-bold text-xs md:text-sm uppercase tracking-widest">Cuaca Ekstrem Merata</p></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

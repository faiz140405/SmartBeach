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
  BotMessageSquare, Sparkle, Moon
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-900 animate-pulse flex flex-col items-center justify-center">
      <div className="relative">
        <MapIcon size={48} className="text-blue-500/20 animate-bounce" />
        <Radar className="absolute top-0 left-0 text-blue-500 animate-spin" size={48} />
      </div>
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
// CHATBOT COMPONENT
// ==========================================
const FloatingChatbot = ({ isDark }: { isDark: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Saya **SmartBeach AI**. Ada yang bisa saya bantu terkait liburan pantai Anda di Lampung?" }
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
      setMessages(prev => [...prev, { role: "bot", text: "Sistem saya sedang di-reboot. Mohon tunggu sebentar ya! 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-4 md:right-8 z-[10001] ${isDark ? 'dark' : ''}`}>
      <div className={`absolute bottom-24 right-0 w-[calc(100vw-32px)] md:w-[400px] h-[70vh] md:h-[550px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 translate-y-10'}`}>
        
        <div className="bg-blue-600 dark:bg-blue-700 p-6 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <BotMessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">SmartBeach AI</h3>
              <p className="text-[10px] text-blue-100 opacity-80 uppercase font-black">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'bot' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] text-[13px] md:text-sm shadow-sm transition-all ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>
          ))}
          {isTyping && <div className="animate-pulse text-[10px] text-slate-400 font-bold ml-11">AI sedang mengetik...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya apapun..." 
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button type="submit" disabled={!input.trim()} className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 disabled:opacity-30 transition-all">
            <Send size={18} />
          </button>
        </form>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 relative ${isOpen ? 'bg-slate-900 rotate-180' : 'bg-blue-600'}`}>
        {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={32} className="text-white" />}
        {!isOpen && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 border-4 border-white dark:border-slate-900 rounded-full"></span>}
      </button>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD (FULL LIGHT/DARK MODE)
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
  const [isRadarOpen, setIsRadarOpen] = useState(true);

  const toggleDarkMode = () => setIsDark(!isDark);

  const handlePredict = async () => {
    setLoading(true); setError(""); setHasil(null);
    try {
      const res = await fetch("https://faiz140405-backend-smartbeach.hf.space/predict-by-location", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: position.lat, lon: position.lng }),
      });
      if (!res.ok) throw new Error("Backend Offline.");
      const data = await res.json();
      setHasil(data);
      setTimeout(() => document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' }), 300);
    } catch (err) { setError("Gagal terhubung ke satelit AI."); } 
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
        await delay(350); 
      }
      let kandidat = hasilSemua.filter(p => p.statusAI === "Aman");
      if (kandidat.length === 0) kandidat = hasilSemua.filter(p => p.statusAI === "Waspada");
      kandidat.sort((a, b) => a.cuaca.angin_ms - b.cuaca.angin_ms);
      setRekomendasiTerbaik(kandidat);
    } catch (err) { setError("Deep Scan terhenti."); } 
    finally { setIsScanningAll(false); }
  };

  const pilihDariRekomendasi = (nama: string, lat: number, lng: number) => {
    setSelectedPantai(nama); setPosition({ lat, lng }); setHasil(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsRadarOpen(true);
  };

  const getSaran = (status: string) => {
    if (status === "Aman") return { icon: <CheckCircle2 className="text-emerald-500" />, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" };
    if (status === "Waspada") return { icon: <AlertTriangle className="text-amber-500" />, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/20" };
    return { icon: <ShieldAlert className="text-red-500" />, color: "from-red-500 to-rose-700", bg: "bg-red-50 dark:bg-red-950/20" };
  };

  return (
    <div className={`${isDark ? 'dark' : ''} ${poppins.className}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 pb-20">
        
        <FloatingChatbot isDark={isDark} />

        <style dangerouslySetInnerHTML={{__html: `.leaflet-top { top: 100px !important; }`}} />

        {/* NAVBAR */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] w-[92%] max-w-6xl">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl dark:shadow-blue-900/10 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-[2.5rem] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><Waves size={24} /></div>
              <span className="font-black text-xl tracking-tighter">SmartBeach<span className="text-blue-600">.ai</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:rotate-12 transition-all">
                {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-600" />}
              </button>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Lampung, ID</span>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[10px] font-bold opacity-50">SATELLITE ONLINE</span></div>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO MAP */}
        <div className="relative w-full h-[65vh] md:h-[750px] overflow-hidden group">
          <MapPicker position={position} setPosition={setPosition} daftarPantai={PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...")} />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-[1500] w-[90%] md:w-[420px]">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsRadarOpen(!isRadarOpen)}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/10 rounded-xl text-blue-600"><Radar size={20} className={loading ? "animate-spin" : ""} /></div>
                  <h2 className="text-xs font-black uppercase tracking-widest opacity-60">Radar Pesisir</h2>
                </div>
                {isRadarOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {isRadarOpen && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="relative">
                    <select value={selectedPantai} onChange={(e) => {
                      const p = PANTAI_LAMPUNG.find(x => x.nama === e.target.value);
                      if(p) { setSelectedPantai(p.nama); setPosition({lat: p.lat, lng: p.lng}); setHasil(null); }
                    }} className="w-full p-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl font-bold appearance-none outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-800 dark:text-slate-100 border border-transparent dark:border-slate-700">
                      {PANTAI_LAMPUNG.map((p, idx) => <option key={idx} value={p.nama}>{p.nama}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                  </div>
                  <button onClick={handlePredict} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkle />} Pindai Keamanan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS & CONTENT */}
        <main className="max-w-6xl mx-auto px-6 mt-20 space-y-16">
          {error && <div className="bg-red-500/10 text-red-500 p-6 rounded-3xl text-center font-black border border-red-500/20">{error}</div>}

          {hasil && (
            <div id="result-area" className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
              <div className={`p-16 md:p-24 text-center text-white bg-gradient-to-br ${getSaran(hasil.rekomendasi).color} relative`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-70">SATELLITE ANALYSIS COMPLETE</p>
                <h2 className="text-7xl md:text-[140px] font-black tracking-tighter leading-none mb-6 drop-shadow-2xl">{hasil.rekomendasi}</h2>
                <div className="flex justify-center gap-3">
                  {hasil.rekomendasi === "Aman" && <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase">Perfect for swimming</div>}
                </div>
              </div>
              
              <div className={`mx-8 md:mx-20 -mt-12 mb-12 p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-10 border-2 dark:border-slate-800 shadow-2xl ${getSaran(hasil.rekomendasi).bg}`}>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg shrink-0 scale-125">{React.cloneElement(getSaran(hasil.rekomendasi).icon, { size: 54 })}</div>
                <div className="text-center md:text-left space-y-3">
                  <h3 className="font-black text-3xl tracking-tight text-slate-800 dark:text-white">Rekomendasi Aktivitas</h3>
                  <p className="text-lg md:text-2xl opacity-70 leading-relaxed font-medium text-slate-600 dark:text-slate-300">"{hasil.rekomendasi === "Aman" ? "Kondisi laut tenang, sangat mendukung untuk berenang atau menyewa jukung." : "Terdapat indikasi angin kencang, disarankan tetap berada di daratan."}"</p>
                </div>
              </div>

              <div className="px-10 md:px-20 pb-20 grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {[
                  { icon: ThermometerSun, label: "Suhu", val: `${hasil.detail_cuaca.suhu_saat_ini}°C`, c: "text-orange-500", b: "bg-orange-50 dark:bg-orange-950/20" },
                  { icon: Wind, label: "Angin", val: `${hasil.detail_cuaca.angin_maks_ms} m/s`, c: "text-blue-500", b: "bg-blue-50 dark:bg-blue-950/20" },
                  { icon: Waves, label: "Ombak", val: hasil.detail_cuaca.tinggi_gelombang_meter !== "N/A" ? `${hasil.detail_cuaca.tinggi_gelombang_meter}m` : "N/A", c: "text-cyan-600", b: "bg-cyan-50 dark:bg-cyan-950/20" },
                  { icon: Sunrise, label: "Sunrise", val: hasil.detail_cuaca.sunrise, c: "text-amber-500", b: "bg-amber-50 dark:bg-amber-950/20" },
                  { icon: Sunset, label: "Sunset", val: hasil.detail_cuaca.sunset, c: "text-indigo-600", b: "bg-indigo-50 dark:bg-indigo-950/20" },
                  { icon: Sun, label: "UV Index", val: hasil.detail_cuaca.uv_index, c: "text-red-500", b: "bg-red-50 dark:bg-red-950/20" },
                ].map((x, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
                    <div className={`w-16 h-16 ${x.b} ${x.c} rounded-2xl flex items-center justify-center mb-5 shadow-inner`}>
                      <x.icon size={32} />
                    </div>
                    <span className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">{x.label}</span>
                    <span className="text-2xl md:text-3xl font-black">{x.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BEACH DIRECTORY */}
          {(() => {
            const p = PANTAI_LAMPUNG.find(x => x.nama === selectedPantai);
            if (p && p.info) {
              return (
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-10 duration-700">
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
                    <div className="bg-blue-600 text-white p-5 rounded-[1.5rem] shadow-xl shadow-blue-600/20"><Info size={32}/></div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-800 dark:text-white">Panduan Wisata {p.nama}</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Eksplorasi Destinasi Terbaik Lampung</p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-l-8 border-blue-600">
                        <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg md:text-xl italic leading-relaxed">"{p.info.deskripsi}"</p>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                          <Ticket size={24} className="text-emerald-500 mb-4"/>
                          <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Tiket Masuk</p>
                          <p className="font-bold text-lg text-slate-700 dark:text-white">{p.info.htm}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                          <Clock size={24} className="text-orange-500 mb-4"/>
                          <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Jam Operasional</p>
                          <p className="font-bold text-lg text-slate-700 dark:text-white">{p.info.jam}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 dark:bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                        <p className="text-[10px] text-blue-500 dark:text-blue-400 font-black uppercase mb-4 tracking-[0.2em]">Aksesibilitas & Sarana</p>
                        <div className="flex items-start gap-4 mb-6">
                          <CarFront size={20} className="text-blue-500 shrink-0 mt-1"/>
                          <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed">{p.info.akses}</p>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {p.info.fasilitas.map((f, i) => <span key={i} className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold rounded-xl shadow-sm text-slate-700 dark:text-slate-200">{f}</span>)}
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

          {/* AI DEEP SCAN SECTION */}
          <section className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-24 relative overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 border-b-[12px] border-b-blue-600 transition-colors">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[120px]"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-500/20">
                  <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-300">Provincial Radar Scan</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-500 dark:from-white dark:via-blue-100 dark:to-slate-400">
                  AI Satelit <br/><span className="text-blue-600 dark:text-blue-500">Deep Scan.</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg">Sistem kami memindai 20 pantai Lampung secara real-time. Temukan lokasi liburan paling aman hari ini.</p>
                <button onClick={handleDeepScan} disabled={isScanningAll} className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-14 py-7 rounded-3xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl">
                  {isScanningAll ? <Loader2 className="animate-spin" /> : <Radar />} {isScanningAll ? "Scanning..." : "Mulai Pemindaian"}
                </button>
              </div>

              <div className="w-full">
                {rekomendasiTerbaik && (
                  <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-10 rounded-[3.5rem] animate-in slide-in-from-right-12 duration-1000 space-y-6">
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-8 flex items-center gap-3"><Trophy size={18} /> Best Conditions Found</p>
                    {rekomendasiTerbaik.length > 0 ? rekomendasiTerbaik.slice(0, 2).map((p, i) => (
                      <div key={i} onClick={() => pilihDariRekomendasi(p.nama, p.lat, p.lng)} className="bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 p-8 rounded-3xl border border-slate-200 dark:border-white/5 cursor-pointer transition-all hover:-translate-y-2 relative group text-slate-800 dark:text-white">
                        <div className={`absolute top-8 right-8 px-3 py-1 rounded-full text-[9px] font-black uppercase ${p.statusAI === 'Aman' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'}`}>{p.statusAI}</div>
                        <h3 className="font-black text-2xl mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-24">{p.nama}</h3>
                        <div className="flex gap-8 opacity-60 dark:opacity-50">
                          <div className="flex items-center gap-2"><Wind size={16} /> <span className="font-bold">{p.cuaca.angin_ms}m/s</span></div>
                          <div className="flex items-center gap-2"><Waves size={16} /> <span className="font-bold">{p.cuaca.tinggi_gelombang_meter}m</span></div>
                        </div>
                      </div>
                    )) : <div className="text-center py-20 text-slate-400"><ShieldAlert size={64} className="mx-auto mb-4 opacity-50" /><p className="font-black uppercase tracking-widest">No Safe Location Detected</p></div>}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center pt-32 pb-12 opacity-40 dark:opacity-30">
          <p className="text-xs font-black uppercase tracking-[0.8em]">Lampung Smart Beach Intelligence</p>
        </footer>
      </div>
    </div>
  );
}

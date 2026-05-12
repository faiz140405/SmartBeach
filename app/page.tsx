"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
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

// ==========================================
// NATIVE MAP COMPONENT (Bebas Error Next.js SSR)
// ==========================================
const NativeMapPicker = ({ position, setPosition, daftarPantai }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([position.lat, position.lng], 11);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
        }).addTo(mapInstance.current);

        const customIcon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        markerInstance.current = L.marker([position.lat, position.lng], { icon: customIcon }).addTo(mapInstance.current);

        mapInstance.current.on("click", (e: any) => {
          setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        });

        daftarPantai.forEach((p: any) => {
          if (p.lat && p.lng) {
            L.marker([p.lat, p.lng], { icon: customIcon, opacity: 0.6 })
              .addTo(mapInstance.current)
              .bindPopup(`<b>${p.nama}</b>`);
          }
        });

      } else {
        mapInstance.current.setView([position.lat, position.lng], 13);
        markerInstance.current.setLatLng([position.lat, position.lng]);
      }
    };

    if (!(window as any).L) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [position.lat, position.lng]);

  return <div ref={mapRef} className="w-full h-full rounded-[2rem] z-0 shadow-inner" />;
};

const PANTAI_LAMPUNG = [
  { nama: "Daftar Pantai...", lat: -5.4254, lng: 105.2590, info: null },

  {
    nama: "Pantai Mutun (Pesawaran)",
    lat: -5.56195,
    lng: 105.25055,
    info: {
      deskripsi: "Pantai berpasir putih terdekat dari Bandar Lampung, sangat ramah anak.",
      htm: "Rp 25.000 / Orang",
      jam: "07:00 - 18:00 WIB",
      akses: "Mudah, semua kendaraan.",
      fasilitas: ["Pondokan", "Banana Boat", "Bilas"],
      waktuTerbaik: "15:00 - 17:00 WIB"
    }
  },

  {
    nama: "Pantai Sari Ringgung (Pesawaran)",
    lat: -5.57842,
    lng: 105.26384,
    info: {
      deskripsi: "Terkenal dengan fenomena Pasir Timbul dan Masjid Terapung.",
      htm: "Rp 20.000 / Orang",
      jam: "06:00 - 18:00 WIB",
      akses: "Aspal mulus.",
      fasilitas: ["Perahu", "Masjid Apung", "Kafe"],
      waktuTerbaik: "08:00 - 11:00 WIB"
    }
  },

  {
    nama: "Pantai Klara (Pesawaran)",
    lat: -5.59714,
    lng: 105.22304,
    info: {
      deskripsi: "Singkatan dari 'Kelapa Rapat', perairan dangkal dan teduh.",
      htm: "Rp 15.000 / Motor",
      jam: "07:00 - 18:00 WIB",
      akses: "Pinggir jalan raya.",
      fasilitas: ["Gazebo", "Kano", "Kamar Mandi"],
      waktuTerbaik: "10:00 - 14:00 WIB"
    }
  },

  {
    nama: "Pantai Dewi Mandapa (Pesawaran)",
    lat: -5.60251,
    lng: 105.24155,
    info: {
      deskripsi: "Wisata mangrove dengan jembatan kayu dan Pulau Cinta.",
      htm: "Rp 15.000 / Orang",
      jam: "08:00 - 18:00 WIB",
      akses: "Aspal & tanah.",
      fasilitas: ["Foto Mangrove", "Pulau Cinta", "Warung"],
      waktuTerbaik: "16:00 - 18:00 WIB"
    }
  },

  {
    nama: "Pulau Pahawang (Pesawaran)",
    lat: -5.67281,
    lng: 105.22013,
    info: {
      deskripsi: "Surga snorkeling dengan pemandangan taman nemo bawah laut.",
      htm: "Tur mulai Rp 150rb",
      jam: "07:00 - 17:00 WIB",
      akses: "Perahu dari Ketapang.",
      fasilitas: ["Snorkeling", "Homestay", "Makan"],
      waktuTerbaik: "08:00 - 11:00 WIB"
    }
  },

  {
    nama: "Pantai Pasir Putih (Lampung Selatan)",
    lat: -5.53321,
    lng: 105.34032,
    info: {
      deskripsi: "Pantai legendaris dengan panorama laut lepas dan Pulau Condong.",
      htm: "Rp 15.000 / Orang",
      jam: "07:00 - 18:00 WIB",
      akses: "Lintas Sumatera.",
      fasilitas: ["Souvenir", "Perahu", "Bilas"],
      waktuTerbaik: "15:30 - 17:30 WIB"
    }
  },

  {
    nama: "Pantai Sebalang (Lampung Selatan)",
    lat: -5.51888,
    lng: 105.34144,
    info: {
      deskripsi: "Pantai vibes Jimbaran Bali, dengan bean bag dan live music.",
      htm: "Rp 20.000 / Orang",
      jam: "10:00 - 22:00 WIB",
      akses: "Area PLTU.",
      fasilitas: ["Kafe", "Live Music", "Sunset"],
      waktuTerbaik: "16:30 - 19:00 WIB"
    }
  },

  {
    nama: "Pantai Marina (Lampung Selatan)",
    lat: -5.73562,
    lng: 105.58985,
    info: {
      deskripsi: "Pantai berkarang dengan hantaman ombak besar khas Samudra Hindia.",
      htm: "Rp 30.000 / Orang",
      jam: "07:00 - 18:00 WIB",
      akses: "Aspal mulus.",
      fasilitas: ["Kafe", "Prewedding", "Mushola"],
      waktuTerbaik: "16:00 - 18:00 WIB"
    }
  },

  {
    nama: "Pantai Minang Rua (Lampung Selatan)",
    lat: -5.87102,
    lng: 105.74833,
    info: {
      deskripsi: "Paket komplit: laut, goa karang, air terjun, Green Canyon.",
      htm: "Rp 10.000 / Orang",
      jam: "07:00 - 18:00 WIB",
      akses: "Turunan curam.",
      fasilitas: ["Guide", "Jumping", "Camping"],
      waktuTerbaik: "08:00 - 12:00 WIB"
    }
  },

  {
    nama: "Pantai Ketang (Lampung Selatan)",
    lat: -5.71715,
    lng: 105.59472,
    info: {
      deskripsi: "Pantai karang hitam eksotis sisa letusan Krakatau.",
      htm: "Gratis - 5rb",
      jam: "24 Jam",
      akses: "Pinggir jalan.",
      fasilitas: ["Warung", "Parkir", "Foto"],
      waktuTerbaik: "16:00 - 17:30 WIB"
    }
  },

  {
    nama: "Pantai Batu Lapis (Lampung Selatan)",
    lat: -5.89745,
    lng: 105.75331,
    info: {
      deskripsi: "Karang laut berbentuk berlapis-lapis unik dan fotogenik.",
      htm: "Rp 15.000 / Orang",
      jam: "07:00 - 17:00 WIB",
      akses: "Trekking santai.",
      fasilitas: ["Spot Foto", "Warung", "Parkir"],
      waktuTerbaik: "15:00 - 17:00 WIB"
    }
  },

  {
    nama: "Pantai Embe (Lamsel)",
    lat: -5.58164,
    lng: 105.47462,
    info: {
      deskripsi: "Resort modern dengan garis pantai panjang dan bersih.",
      htm: "Rp 35.000 / Orang",
      jam: "08:00 - 18:00 WIB",
      akses: "Sangat mudah.",
      fasilitas: ["Resort", "Pool", "Resto"],
      waktuTerbaik: "Pagi/Sore"
    }
  },

  {
    nama: "Pantai Duta Wisata (Bandar Lampung)",
    lat: -5.46732,
    lng: 105.25361,
    info: {
      deskripsi: "Tepat di pinggir kota, menawarkan pemandangan Teluk Lampung.",
      htm: "Rp 15.000 / Orang",
      jam: "08:00 - 18:00 WIB",
      akses: "Bisa Ojek Online.",
      fasilitas: ["Sewa Ban", "Pondok", "Warung"],
      waktuTerbaik: "16:00 - 18:00 WIB"
    }
  },

  {
    nama: "Pantai Tanjung Setia (Pesisir Barat)",
    lat: -5.30441,
    lng: 103.99612,
    info: {
      deskripsi: "Surga peselancar dunia dengan ombak tertinggi Mei-Oktober.",
      htm: "Rp 10.000 / Orang",
      jam: "24 Jam",
      akses: "Jalan Lintas Barat.",
      fasilitas: ["Resort", "Surf Rental", "Kafe"],
      waktuTerbaik: "Pagi Hari"
    }
  },

  {
    nama: "Pantai Labuhan Jukung (Pesisir Barat)",
    lat: -5.18742,
    lng: 103.92983,
    info: {
      deskripsi: "Pusat keramaian Krui, lokasi festival selancar internasional.",
      htm: "Rp 5.000 / Motor",
      jam: "24 Jam",
      akses: "Pusat Kota Krui.",
      fasilitas: ["Alun-alun", "Taman", "Seafood"],
      waktuTerbaik: "16:30 - 18:30 WIB"
    }
  },

  {
    nama: "Pantai Walur (Pesisir Barat)",
    lat: -5.21154,
    lng: 103.92421,
    info: {
      deskripsi: "Pasir putih bersih dengan pemandangan mercusuar.",
      htm: "Gratis",
      jam: "24 Jam",
      akses: "Bisa kendaraan.",
      fasilitas: ["Mancing", "Piknik", "Lodging"],
      waktuTerbaik: "Pagi Hari"
    }
  },

  {
    nama: "Pantai Mandiri (Pesisir Barat)",
    lat: -5.26622,
    lng: 103.97452,
    info: {
      deskripsi: "Pasir hitam eksotis membentang lurus tanpa karang.",
      htm: "Gratis",
      jam: "24 Jam",
      akses: "Pinggir jalan raya.",
      fasilitas: ["Sunset Spot", "Warung", "Rest Area"],
      waktuTerbaik: "17:00 - 18:30 WIB"
    }
  },

  {
    nama: "Pantai Gigi Hiu (Tanggamus)",
    lat: -5.75161,
    lng: 105.05142,
    info: {
      deskripsi: "Gugusan batu karang tajam bak gigi hiu yang estetik.",
      htm: "Rp 20.000 / Orang",
      jam: "06:00 - 17:00 WIB",
      akses: "Tantangan tinggi.",
      fasilitas: ["Parkir", "Spot Foto"],
      waktuTerbaik: "Sore Hari"
    }
  },

  {
    nama: "Pantai Teluk Kiluan (Tanggamus)",
    lat: -5.77942,
    lng: 105.10521,
    info: {
      deskripsi: "Habitat lumba-lumba liar dan memiliki lagun karang bening.",
      htm: "Rp 15.000",
      jam: "24 Jam",
      akses: "Jalan Berbukit.",
      fasilitas: ["Jukung", "Homestay", "Guide"],
      waktuTerbaik: "06:00 - 08:00 WIB"
    }
  },

  {
    nama: "Pantai Batu Karang (Tanggamus)",
    lat: -5.7005,
    lng: 105.0849,
    info: {
      deskripsi: "Pantai tersembunyi dengan bebatuan besar pelindung ombak.",
      htm: "Rp 10.000 / Orang",
      jam: "08:00 - 17:00 WIB",
      akses: "Jalan bebatuan.",
      fasilitas: ["Mancing", "Relaksasi"],
      waktuTerbaik: "Pagi Hari"
    }
  }
];

const GEMINI_API_KEY = "AIzaSyBACWToYsyaqS-Bj0BEiDyEk6LSdE-YbH0";

// ==========================================
// CHATBOT COMPONENT 
// ==========================================
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! Saya **Samba AI**. Ada yang bisa saya bantu terkait liburan pantai Anda di Lampung?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInput("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsTyping(true);

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "Kamu adalah 'Samba AI', asisten pakar pariwisata pantai Lampung. Tugasmu: Menjawab pertanyaan cuaca, rute, keamanan, dan info pantai secara ringkas dan ramah." }]
          },
          contents: [{ 
            role: "user", 
            parts: [{ text: userText }] 
          }] 
        })
      });

      if (!res.ok) throw new Error("Gagal mengambil respon dari Gemini API.");
      const data = await res.json();
      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Maaf, sistem satelit saya sedang sibuk. Mohon coba beberapa saat lagi ya! 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999]">
      <div className={`absolute bottom-20 right-0 w-[calc(100vw-32px)] md:w-[380px] h-[65vh] md:h-[550px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        <div className="bg-blue-600 p-4 flex items-center justify-between text-white shrink-0 shadow-sm z-10 relative">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <BotMessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Samba AI</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest opacity-90">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[75%] text-[13px] md:text-sm shadow-sm break-words whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-sm'}`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>
          ))}
          {isTyping && <div className="text-[11px] text-slate-400 font-medium animate-pulse ml-11">Samba AI sedang memproses...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-end gap-2 shrink-0 z-10 relative">
          <textarea 
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Tanya info pantai..." 
            rows={1}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-[100px] min-h-[44px] overflow-y-auto placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors font-sans"
            style={{ paddingBottom: '12px', paddingTop: '12px' }}
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 disabled:opacity-50 h-[44px] w-[44px] flex items-center justify-center shrink-0 shadow-md">
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)] text-white transition-transform hover:scale-105 active:scale-95 relative">
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-ping"></span>}
        {!isOpen && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>}
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617'; 
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; 
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

  // ✅ PERBAIKAN LOGIKA DATA: Tidak lagi mem-parse nilai teks secara paksa menjadi angka
  const formatData = (val: any, suffix: string = "") => {
    if (val === undefined || val === null || val === "NaN" || val === "N/A") {
      return "N/A";
    }
    // Cek khusus jika tipe datanya number dan terdeteksi NaN
    if (typeof val === 'number' && Number.isNaN(val)) {
      return "N/A";
    }
    // Jika sensor mendeteksi suhu 0 murni di perairan Indonesia, berarti server gagal
    if (val === 0 && suffix === "°C") {
      return "Offline"; 
    }
    return `${val}${suffix}`;
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
    <div className={isDark ? "dark" : ""}>
      <div className={`min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-24 font-sans ${poppins.className}`}>
        
        <style dangerouslySetInnerHTML={{__html: `
          .leaflet-top { top: 90px !important; z-index: 1000 !important; }
          .dark .leaflet-layer { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
        `}} />

        <FloatingChatbot />

        <nav className="fixed top-0 left-0 right-0 z-[5000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md"><Waves size={20} /></div>
              <span className="font-black text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white uppercase">SmartBeach</span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-5">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Satelit Aktif</span>
              </div>
              <button onClick={toggleDarkMode} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm border border-slate-200 dark:border-slate-700">
                {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-24 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
          
          {error && (
            <div className="bg-red-100 dark:bg-rose-500/10 border border-red-200 dark:border-rose-500/20 text-red-600 dark:text-rose-400 px-5 py-4 rounded-2xl flex items-center gap-3 font-medium text-sm md:text-base animate-in fade-in shadow-sm">
              <ShieldAlert size={20} className="shrink-0" /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Navigation size={22} />
                  </div>
                  <h2 className="font-black text-lg md:text-xl text-slate-800 dark:text-white tracking-tight">Pilih Lokasi Pantai</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <select 
                      value={selectedPantai}
                      onChange={(e) => {
                        const p = PANTAI_LAMPUNG.find(x => x.nama === e.target.value);
                        if(p) { setSelectedPantai(p.nama); setPosition({lat: p.lat, lng: p.lng}); setHasil(null); }
                      }}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-700 dark:text-slate-200 text-sm md:text-base transition-colors shadow-inner"
                    >
                      {PANTAI_LAMPUNG.map((p, idx) => <option key={idx} value={p.nama}>{p.nama}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs md:text-sm font-mono text-slate-500 dark:text-slate-400 justify-center transition-colors">
                    <MapPin size={16} className="text-blue-500 shrink-0" />
                    <span>Lat: {position.lat.toFixed(4)}</span> | <span>Lon: {position.lng.toFixed(4)}</span>
                  </div>

                  <button 
                    onClick={handlePredict} disabled={loading} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 flex items-center justify-center gap-3 text-sm md:text-base active:scale-95"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Radar size={20} />}
                    {loading ? "Menghubungi Satelit..." : "Pindai Keamanan Laut"}
                  </button>
                </div>
              </div>

              {(() => {
                const p = PANTAI_LAMPUNG.find(x => x.nama === selectedPantai);
                if (p && p.info) {
                  return (
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors animate-in slide-in-from-bottom-4">
                      <h3 className="font-black text-base md:text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white"><Info size={20} className="text-blue-500" /> Profil Singkat</h3>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-5 italic leading-relaxed border-l-4 border-blue-100 dark:border-slate-800 pl-3">"{p.info.deskripsi}"</p>
                      
                      <div className="space-y-3 text-xs md:text-sm">
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">HTM</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{p.info.htm}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Buka</span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">{p.info.jam}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            <div className="lg:col-span-8 space-y-6 md:space-y-8 order-1 lg:order-2">
              <div className="w-full h-[350px] md:h-[450px] bg-slate-200 dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 relative z-0">
                <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-blue-500" size={40} /></div>}>
                  <NativeMapPicker position={position} setPosition={setPosition} daftarPantai={PANTAI_LAMPUNG.filter(p => p.nama !== "Daftar Pantai...")} />
                </Suspense>
              </div>

              {hasil && (
                <div id="result-area" className={`rounded-[2rem] p-6 md:p-10 border shadow-lg animate-in slide-in-from-bottom-8 duration-500 transition-colors ${getSaran(hasil.rekomendasi).bg}`}>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 mb-8 md:mb-10">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm shrink-0">
                      {React.cloneElement(getSaran(hasil.rekomendasi).icon, { size: 56 })}
                    </div>
                    <div className="text-center md:text-left space-y-2">
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Analisis Satelit Real-Time</p>
                      <h2 className={`text-4xl md:text-6xl font-black tracking-tighter ${getSaran(hasil.rekomendasi).color}`}>{hasil.rekomendasi}</h2>
                      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium max-w-xl leading-relaxed">{getSaran(hasil.rekomendasi).teks}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    {[
                      { icon: ThermometerSun, label: "Suhu", val: formatData(hasil.detail_cuaca?.suhu_saat_ini, "°C") },
                      { icon: Wind, label: "Angin", val: formatData(hasil.detail_cuaca?.angin_maks_ms, " m/s") },
                      { icon: Waves, label: "Ombak", val: formatData(hasil.detail_cuaca?.tinggi_gelombang_meter, " m") },
                      { icon: Sunrise, label: "Sunrise", val: formatData(hasil.detail_cuaca?.sunrise) },
                      { icon: Sunset, label: "Sunset", val: formatData(hasil.detail_cuaca?.sunset) },
                      { icon: Sun, label: "UV Index", val: formatData(hasil.detail_cuaca?.uv_index) },
                    ].map((x, i) => (
                      <div key={i} className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/50 dark:border-slate-700/50 flex flex-col items-center text-center shadow-sm">
                        <x.icon size={24} className="text-slate-500 dark:text-slate-400 mb-3" />
                        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{x.label}</span>
                        <span className={`text-lg font-black ${x.val === "N/A" || x.val === "Offline" ? "text-slate-400 text-sm md:text-base" : "text-slate-800 dark:text-slate-100 md:text-2xl"}`}>{x.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <section className="bg-slate-900 dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800 mt-12">
            <div className="absolute top-0 right-0 w-64 md:w-[500px] h-64 md:h-[500px] bg-blue-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 grid lg:grid-cols-5 gap-10 md:gap-16 items-center">
              <div className="lg:col-span-2 space-y-5 md:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> Intelligence Engine
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">AI Satelit <br/><span className="text-blue-500">Deep Scan.</span></h2>
                <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                  Sistem kami memindai 20 titik pantai di Provinsi Lampung secara serentak untuk mencarikan Anda lokasi wisata paling aman hari ini.
                </p>
                <button onClick={handleDeepScan} disabled={isScanningAll} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm md:text-base shadow-xl mt-4 active:scale-95">
                  {isScanningAll ? <Loader2 className="animate-spin" size={20} /> : <Radar size={20} />} 
                  {isScanningAll ? "Memindai Server..." : "Mulai Radar Massal"}
                </button>
              </div>

              <div className="lg:col-span-3 w-full">
                {rekomendasiTerbaik !== null && (
                  <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] w-full backdrop-blur-md">
                    {rekomendasiTerbaik.length > 0 ? (
                      <div className="space-y-5">
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-2"><Trophy size={16} /> Pantai Rekomendasi Teratas</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                          {rekomendasiTerbaik.slice(0, 4).map((p, i) => (
                            <div key={i} onClick={() => pilihDariRekomendasi(p.nama, p.lat, p.lng)} className="bg-slate-800 hover:bg-slate-700 p-5 md:p-6 rounded-2xl cursor-pointer transition-all border border-slate-700 hover:border-blue-500 relative group shadow-sm">
                              <h3 className="font-bold text-sm md:text-base text-white mb-3 md:mb-4 pr-10 group-hover:text-blue-400 transition-colors">{p.nama}</h3>
                              <div className={`absolute top-5 right-5 w-3 h-3 rounded-full ${p.statusAI === 'Aman' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-amber-500'}`}></div>
                              <div className="flex gap-5 md:gap-6 text-[10px] md:text-xs text-slate-400 font-medium">
                                <span className="flex items-center gap-1.5"><Wind size={14}/> {formatData(p.cuaca.angin_ms, "m/s")}</span>
                                <span className="flex items-center gap-1.5"><Waves size={14}/> {formatData(p.cuaca.tinggi_gelombang_meter, "m")}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 opacity-50">
                        <ShieldAlert size={56} className="mx-auto mb-4 text-red-400" />
                        <p className="font-black text-sm uppercase tracking-widest text-red-300">Cuaca Ekstrem Terdeteksi Merata</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>

        <footer className="text-center pt-24 pb-8 opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Lampung Smart Beach Intelligence</p>
        </footer>
      </div>
    </div>
  );
}

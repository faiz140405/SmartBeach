"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import { 
  MapPin, Wind, ThermometerSun, Sun, Waves, 
  CheckCircle2, AlertTriangle, ShieldAlert, Ticket, Clock, 
  CarFront, Info, Check, Sunrise, Sunset, Camera, Loader2,
  Sparkles, Trophy, Map as MapIcon, Radar, Activity, Navigation, ChevronDown
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse flex flex-col items-center justify-center text-slate-400">
      <MapIcon size={40} className="mb-2 animate-bounce opacity-20" />
      <span className="text-xs font-bold uppercase tracking-widest">Sinyal Satelit...</span>
    </div>
  )
});

const PANTAI_LAMPUNG = [
  { nama: "Pilih dari daftar (Opsional)", lat: -5.4254, lng: 105.2590, info: null },
  { nama: "Pantai Mutun (Pesawaran)", lat: -5.5507, lng: 105.2428, info: { deskripsi: "Pantai berpasir putih terdekat dari Bandar Lampung, ramah anak.", htm: "Rp 25.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Mudah, semua kendaraan.", fasilitas: ["Pondokan", "Banana Boat", "Bilas"], waktuTerbaik: "15:00 - 17:00 WIB" } },
  { nama: "Pantai Sari Ringgung (Pesawaran)", lat: -5.5715, lng: 105.2624, info: { deskripsi: "Terkenal dengan fenomena Pasir Timbul dan Masjid Terapung.", htm: "Rp 20.000 / Orang", jam: "06:00 - 18:00 WIB", akses: "Aspal mulus.", fasilitas: ["Perahu", "Masjid Apung", "Kafe"], waktuTerbaik: "08:00 - 11:00 WIB" } },
  { nama: "Pantai Klara (Pesawaran)", lat: -5.5968, lng: 105.2215, info: { deskripsi: "Singkatan dari 'Kelapa Rapat', perairan dangkal dan teduh.", htm: "Rp 15.000 / Motor", jam: "07:00 - 18:00 WIB", akses: "Pinggir jalan raya.", fasilitas: ["Gazebo", "Kano", "Kamar Mandi"], waktuTerbaik: "10:00 - 14:00 WIB" } },
  { nama: "Pantai Dewi Mandapa (Pesawaran)", lat: -5.6254, lng: 105.2146, info: { deskripsi: "Wisata mangrove dengan jembatan kayu dan Pulau Cinta.", htm: "Rp 15.000 / Orang", jam: "08:00 - 18:00 WIB", akses: "Aspal & tanah.", fasilitas: ["Foto Mangrove", "Pulau Cinta", "Warung"], waktuTerbaik: "16:00 - 18:00 WIB" } },
  { nama: "Pulau Pahawang (Pesawaran)", lat: -5.6704, lng: 105.2318, info: { deskripsi: "Surga snorkeling dengan pemandangan taman nemo bawah laut.", htm: "Tur mulai Rp 150rb", jam: "07:00 - 17:00 WIB", akses: "Perahu dari Ketapang.", fasilitas: ["Snorkeling", "Homestay", "Makan"], waktuTerbaik: "08:00 - 11:00 WIB" } },
  { nama: "Pantai Pasir Putih (Lampung Selatan)", lat: -5.5522, lng: 105.4067, info: { deskripsi: "Pantai legendaris dengan panorama laut lepas dan Pulau Condong.", htm: "Rp 15.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Lintas Sumatera.", fasilitas: ["Souvenir", "Perahu", "Bilas"], waktuTerbaik: "15:30 - 17:30 WIB" } },
  { nama: "Pantai Sebalang (Lampung Selatan)", lat: -5.5198, lng: 105.3902, info: { deskripsi: "Pantai vibes Jimbaran Bali, dengan bean bag dan live music.", htm: "Rp 20.000 / Orang", jam: "10:00 - 22:00 WIB", akses: "Area PLTU.", fasilitas: ["Kafe", "Live Music", "Sunset"], waktuTerbaik: "16:30 - 19:00 WIB" } },
  { nama: "Pantai Marina (Lampung Selatan)", lat: -5.7420, lng: 105.6180, info: { deskripsi: "Pantai berkarang dengan hantaman ombak besar Samudra Hindia.", htm: "Rp 30.000 / Orang", jam: "07:00 - 18:00 WIB", akses: "Aspal mulus.", fasilitas: ["Kafe", "Prewedding", "Mushola"], waktuTerbaik: "16:00 - 18:00 WIB" } },
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

export default function Home() {
  const [position, setPosition] = useState({ lat: -5.4254, lng: 105.2590 });
  const [selectedPantai, setSelectedPantai] = useState(PANTAI_LAMPUNG[0].nama);
  const [hasil, setHasil] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rekomendasiTerbaik, setRekomendasiTerbaik] = useState<any[] | null>(null);
  const [isScanningAll, setIsScanningAll] = useState(false);

  const handlePredict = async () => {
    setLoading(true); setError(""); setHasil(null);
    try {
      const res = await fetch("https://backendsmartbeach.railway.internal/predict-by-location", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: position.lat, lon: position.lng }),
      });
      if (!res.ok) throw new Error("Gagal akses AI satelit.");
      const data = await res.json();
      setHasil(data);
      
      // Memberikan waktu sedikit agar komponen hasil ter-render, lalu scroll
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      
    } catch (err: any) {
      setError(err.message || "Pastikan Backend API menyala.");
    } finally { setLoading(false); }
  };

  const handleDeepScan = async () => {
    setIsScanningAll(true); setRekomendasiTerbaik(null);
    try {
      const daftar = PANTAI_LAMPUNG.filter(p => p.nama !== "Pilih dari daftar (Opsional)");
      const promises = daftar.map(async (p) => {
        const res = await fetch("http://localhost:8000/predict-by-location", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: p.lat, lon: p.lng }),
        });
        const data = await res.json();
        return { ...p, statusAI: data.rekomendasi, cuaca: data.detail_cuaca };
      });
      const hasilSemua = await Promise.all(promises);
      let kandidat = hasilSemua.filter(p => p.statusAI === "Aman");
      if (kandidat.length === 0) kandidat = hasilSemua.filter(p => p.statusAI === "Waspada");
      kandidat.sort((a, b) => a.cuaca.angin_ms - b.cuaca.angin_ms);
      setRekomendasiTerbaik(kandidat);
    } catch (err) { setError("Deep Scan terganggu."); }
    finally { setIsScanningAll(false); }
  };

  const pilihDariRekomendasi = (nama: string, lat: number, lng: number) => {
    setSelectedPantai(nama); setPosition({ lat, lng }); setHasil(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSaran = (status: string) => {
    if (status === "Aman") return { teks: "Sangat Aman! Kondisi laut dan angin mendukung untuk berenang/snorkeling.", icon: <CheckCircle2 className="text-emerald-500" />, color: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    if (status === "Waspada") return { teks: "Hati-hati, angin atau ombak agak menantang. Cocok untuk bersantai di tepi.", icon: <AlertTriangle className="text-amber-500" />, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 border-amber-200" };
    return { teks: "BAHAYA! Cuaca ekstrem terdeteksi. Segera jauhi bibir pantai.", icon: <ShieldAlert className="text-red-500" />, color: "from-red-500 to-rose-600", bg: "bg-red-50 border-red-200" };
  };

  return (
    <div className="font-poppins min-h-screen bg-slate-50 text-slate-900 pb-12 selection:bg-blue-100 overflow-x-hidden">
      
      {/* Menggabungkan CSS External Khusus untuk Mobile Layout */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        /* Mendorong tombol Zoom Leaflet ke bawah agar tidak bertabrakan dengan Navbar di Mobile */
        .leaflet-top { top: 85px !important; }
      `}} />

      {/* 1. FLOATING NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-5xl">
        <div className="bg-white/85 backdrop-blur-xl shadow-xl shadow-blue-900/10 border border-white px-4 md:px-8 py-3 rounded-full flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full text-white shadow-lg">
              <Waves size={18} />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter">
              SmartBeach<span className="text-blue-600">.ai</span>
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-6 text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-slate-600">
              <MapPin size={14} className="text-blue-500"/> Lampung
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <Activity size={14}/> <span className="hidden xs:inline">Online</span>
            </span>
          </div>
        </div>
      </nav>

      {/* 2. WRAPPER PETA DAN RADAR (Diatur Ulang untuk Mobile) */}
      <div className="relative w-full">
        
        {/* Peta: Tingginya disesuaikan agar lega dilihat */}
        <section className="w-full h-[55vh] md:h-[650px] z-0">
          <MapPicker 
            position={position} 
            setPosition={setPosition} 
            daftarPantai={PANTAI_LAMPUNG.filter(p => p.nama !== "Pilih dari daftar (Opsional)")} 
          />
        </section>
        
        {/* Radar Navigasi: Di Mobile ditarik sedikit (-mt-16) agar tumpang tindih natural. Di Desktop dibuat Absolute */}
        <div className="relative z-10 -mt-16 px-4 md:absolute md:bottom-12 md:left-12 md:px-0 md:mt-0 w-full md:w-[420px]">
          <div className="bg-white/95 backdrop-blur-xl p-5 md:p-7 rounded-[2rem] shadow-2xl border border-white">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Navigation size={14}/> Radar Navigasi
               </h2>
               <div className="flex gap-2 text-[9px] md:text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100">
                {position.lat.toFixed(3)}, {position.lng.toFixed(3)}
               </div>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <select 
                  value={selectedPantai}
                  onChange={(e) => {
                    const p = PANTAI_LAMPUNG.find(x => x.nama === e.target.value);
                    if(p) { setSelectedPantai(p.nama); setPosition({lat: p.lat, lng: p.lng}); setHasil(null); }
                  }}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all cursor-pointer font-bold text-slate-700 appearance-none text-sm shadow-inner"
                >
                  {PANTAI_LAMPUNG.map((p, idx) => <option key={idx} value={p.nama}>{p.nama}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={18} />
              </div>

              <button 
                onClick={handlePredict}
                disabled={loading} 
                className="w-full bg-blue-600 active:bg-blue-800 text-white p-4 rounded-2xl font-black text-sm md:text-base shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="animate-spin" size={18}/> Menghubungi Satelit...</> : <><Radar size={18}/> Pindai Lokasi Ini</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 md:mt-12 space-y-8 relative z-10">
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center border border-red-100 font-bold flex items-center justify-center gap-2 animate-in zoom-in-95 text-sm">
            <AlertTriangle size={18} /> {error}
          </div>
        )}

        {/* HASIL PREDIKSI (Area Anchor Scroll) */}
        {hasil && (
          <div id="result-area" className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden scroll-mt-28">
            <div className={`p-8 md:p-12 text-center text-white bg-gradient-to-br ${getSaran(hasil.rekomendasi).color} relative`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-3 opacity-80">AI Safety Report</p>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl">{hasil.rekomendasi}</h2>
            </div>
            
            <div className={`m-5 md:m-8 p-5 md:p-8 rounded-[2rem] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-2 ${getSaran(hasil.rekomendasi).bg}`}>
              <div className="bg-white p-4 rounded-full shadow-lg shrink-0">
                {React.cloneElement(getSaran(hasil.rekomendasi).icon, { size: 36 })}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-black text-lg md:text-2xl mb-1 text-slate-800">Rekomendasi Aktivitas</h3>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{getSaran(hasil.rekomendasi).teks}</p>
              </div>
            </div>

            <div className="px-5 md:px-10 pb-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {[
                { icon: ThermometerSun, label: "Suhu", val: `${hasil.detail_cuaca.suhu_saat_ini}°C`, c: "text-orange-500", b: "bg-orange-50" },
                { icon: Wind, label: "Angin", val: `${hasil.detail_cuaca.angin_maks_ms} m/s`, c: "text-cyan-500", b: "bg-cyan-50" },
                { icon: Waves, label: "Ombak", val: hasil.detail_cuaca.tinggi_gelombang_meter !== "N/A" ? `${hasil.detail_cuaca.tinggi_gelombang_meter}m` : "N/A", c: "text-blue-500", b: "bg-blue-50" },
                { icon: Sunrise, label: "Sunrise", val: hasil.detail_cuaca.sunrise, c: "text-amber-500", b: "bg-amber-50" },
                { icon: Sunset, label: "Sunset", val: hasil.detail_cuaca.sunset, c: "text-rose-500", b: "bg-rose-50" },
              ].map((x, i) => (
                <div key={i} className="bg-slate-50/70 p-4 md:p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${x.b} ${x.c} rounded-2xl flex items-center justify-center mb-3 shadow-sm`}>
                    <x.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{x.label}</span>
                  <span className="text-lg md:text-xl font-black">{x.val}</span>
                </div>
              ))}
              <div className="bg-slate-50/70 p-4 md:p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                <Sun size={24} className="text-yellow-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Indeks UV</span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${hasil.detail_cuaca.uv_index > 6 ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : 'bg-blue-600 text-white shadow-md shadow-blue-500/30'}`}>
                  Level {hasil.detail_cuaca.uv_index}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Direktori Wisata */}
        {(() => {
          const p = PANTAI_LAMPUNG.find(x => x.nama === selectedPantai);
          if (p && p.info) {
            return (
              <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl"><Info size={24}/></div>
                  <h3 className="text-xl md:text-2xl font-black">Panduan {p.nama}</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <p className="text-slate-500 font-medium text-sm md:text-base italic leading-relaxed">"{p.info.deskripsi}"</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <Ticket size={18} className="text-emerald-500 mb-2"/>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Tiket Masuk</p>
                        <p className="font-bold text-sm">{p.info.htm}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <Clock size={18} className="text-orange-500 mb-2"/>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Operasional</p>
                        <p className="font-bold text-sm">{p.info.jam}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-5 rounded-3xl border border-white shadow-sm">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-3 tracking-widest">Akses & Fasilitas</p>
                      <p className="text-xs md:text-sm font-medium mb-4 text-slate-600 leading-relaxed">
                        <CarFront size={14} className="inline mr-2 text-blue-500"/>{p.info.akses}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.info.fasilitas.map((f, i) => <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-[10px] md:text-xs font-bold rounded-xl shadow-sm text-slate-700">{f}</span>)}
                      </div>
                    </div>
                    {p.info.waktuTerbaik && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl flex gap-4 items-center shadow-lg shadow-blue-600/20">
                        <Camera size={28} className="opacity-50 shrink-0"/>
                        <div><p className="text-[9px] font-black text-blue-200 uppercase mb-1 tracking-widest">Golden Time</p><p className="text-xs md:text-sm font-bold">{p.info.waktuTerbaik}</p></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* AI DEEP SCAN SECTION - Mobile Optimized */}
        <section className="bg-slate-950 rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-8 md:p-14 text-white relative overflow-hidden shadow-2xl border-b-4 border-blue-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left space-y-5 md:space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold text-blue-300">
                <Sparkles size={14} /> AI Radar Provincial
              </span>
              <h2 className="text-4xl md:text-6xl font-black leading-none bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tighter">
                Satelit <br/>Deep Scan
              </h2>
              <p className="text-sm md:text-lg text-slate-400 font-medium max-w-sm mx-auto lg:mx-0">
                Pindai cuaca dan keselamatan laut di 20 pantai pesisir Lampung secara serentak dalam hitungan detik.
              </p>
              <button 
                onClick={handleDeepScan}
                disabled={isScanningAll}
                className="w-full sm:w-auto bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm md:text-lg hover:bg-blue-400 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
              >
                {isScanningAll ? <><Loader2 className="animate-spin" size={20}/> Memindai Satelit...</> : <><Radar size={20}/> Mulai Deep Scan</>}
              </button>
            </div>

            <div className="w-full min-h-[200px] mt-4 lg:mt-0">
              {rekomendasiTerbaik !== null && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-[2rem] animate-in slide-in-from-right-10 duration-500">
                  {rekomendasiTerbaik.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Trophy size={14}/> Rekomendasi AI Teratas
                      </p>
                      {rekomendasiTerbaik.slice(0, 2).map((pantai, idx) => (
                        <div key={idx} onClick={() => pilihDariRekomendasi(pantai.nama, pantai.lat, pantai.lng)}
                          className="bg-white/5 hover:bg-white/10 border border-white/5 border-b-white/10 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 relative"
                        >
                          <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${pantai.statusAI === 'Aman' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {pantai.statusAI}
                          </span>
                          <h3 className="font-black text-base md:text-xl text-white mb-1 pr-14">{pantai.nama}</h3>
                          <div className="flex flex-wrap gap-2 md:gap-4 mt-3">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5"><Wind size={12} className="text-cyan-400"/> {pantai.cuaca.angin_ms}m/s</span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5"><Waves size={12} className="text-blue-400"/> {pantai.cuaca.tinggi_gelombang_meter}m</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 opacity-50 flex flex-col items-center">
                      <ShieldAlert size={48} className="mb-4 text-red-500"/>
                      <p className="text-xs font-bold uppercase tracking-widest">Pesisir Sedang Bahaya</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="text-center pt-16 pb-8 opacity-30">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Lampung Intelligence Beach Management</p>
      </footer>
    </div>
  );
}

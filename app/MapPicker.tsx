"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Memperbaiki icon marker Leaflet di Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function MapPicker({ position, setPosition, daftarPantai }: any) {
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      map.flyTo(position, map.getZoom());
    }, [position, map]);

    return position === null ? null : <Marker position={position} icon={customIcon}></Marker>;
  }

  return (
    <MapContainer 
      center={position} 
      zoom={9} 
      scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {daftarPantai && daftarPantai.map((pantai: any, idx: number) => (
        <Marker key={idx} position={{ lat: pantai.lat, lng: pantai.lng }} icon={customIcon}>
          <Tooltip direction="top" offset={[0, -40]} opacity={0.9} permanent={false}>
            <span className="font-semibold text-slate-700 tracking-wide">{pantai.nama}</span>
          </Tooltip>
        </Marker>
      ))}

      <LocationMarker />
    </MapContainer>
  );
}
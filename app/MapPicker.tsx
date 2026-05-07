"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function UpdateView({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => { map.setView([position.lat, position.lng], 13); }, [position, map]);
  return null;
}

function MapEvents({ setPosition }: { setPosition: any }) {
  useMapEvents({
    click(e) { setPosition({ lat: e.latlng.lat, lng: e.latlng.lng }); },
  });
  return null;
}

export default function MapPicker({ position, setPosition, daftarPantai }: any) {
  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <UpdateView position={position} />
      <MapEvents setPosition={setPosition} />
      <Marker position={[position.lat, position.lng]} icon={icon}>
        <Popup>Lokasi yang dipilih</Popup>
      </Marker>
      {daftarPantai?.map((p: any, i: number) => (
        <Marker key={i} position={[p.lat, p.lng]} icon={icon}>
          <Popup>{p.nama}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

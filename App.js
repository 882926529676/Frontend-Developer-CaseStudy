import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

const profilesData = [
  {
    id: 1,
    name: 'Shreya Kamat',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'Frontend Developer from India .',
    address: {
      lat: 40.7128,
      lng: -74.006,
      location: 'New York, USA'
    },
    details: 'Email: alice@example.com\nInterests: UI/UX, React'
  },
  {
    id: 2,
    name: 'Suraj Raut',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'Backend Engineer from Channai.',
    address: {
      lat: 51.5074,
      lng: -0.1278,
      location: 'London, UK'
    },
    details: 'Email: bob@example.com\nInterests: Node.js, Databases'
  },
  {
    id: 3,
    name: 'Vikram Khade ',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'Fullstack Developer  from Pune .',
    address: {
      lat: 51.5074,
      lng: -0.1278,
      location: 'London, UK'
    },
    details: 'Email: bob@example.com\nInterests: Node.js, Databases'
  }
];

function ProfileCard({ profile, onSummary }) {
  return (
    <div className="p-4 border rounded shadow mb-4">
      <img src={profile.photo} alt={profile.name} className="w-20 h-20 rounded-full mb-2" />
      <h3 className="text-xl font-bold">{profile.name}</h3>
      <p>{profile.description}</p>
      <button onClick={() => onSummary(profile)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Summary
      </button>
    </div>
  );
}

function ProfileList({ profiles, onSummary }) {
  return (
    <div className="w-full md:w-1/2 p-4 overflow-y-auto max-h-[80vh]">
      {profiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} onSummary={onSummary} />
      ))}
    </div>
  );
}

function MapView({ location }) {
  return (
    <div className="w-full md:w-1/2 h-[500px]">
      {location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>{location.location}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">Select a profile to view location</div>
      )}
    </div>
  );
}

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profilesData.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <ProfileList profiles={filteredProfiles} onSummary={setSelectedProfile} />
      </div>
      <MapView location={selectedProfile?.address} />
    </div>
  );
}

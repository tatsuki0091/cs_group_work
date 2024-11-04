'use client';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPoint } from '@/features/common/interfaces';
import LocationMarker from '../location/LocationMaker';
import SearchField from '../search/SearchField';
import styles from './style.module.css';
interface Locations {
    location: MapPoint;
    setLocation: React.Dispatch<React.SetStateAction<MapPoint>>;
}
const Map = ({ location, setLocation }: Locations) => {
    return (
        <>
            <div className="mt-4">
                <MapContainer
                    className={styles.map}
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    style={{ height: '500px', width: '100%' }}
                >
                    <SearchField setLocation={setLocation} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {location.latitude !== 0 && location.longitude !== 0 && (
                        <LocationMarker position={location} />
                    )}
                </MapContainer>
            </div>
        </>
    );
};

export default Map;

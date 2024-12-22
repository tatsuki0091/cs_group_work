'use client';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPoint } from '@/features/common/interfaces';
import { EventInfoProps } from '@/features/event/interfaces';
import LocationMarker from '../location/LocationMaker';
import SearchField from '../search/SearchField';
import styles from './style.module.css';
interface Locations {
    location: MapPoint;
    eventInfo?: EventInfoProps[];
    setLocation: React.Dispatch<React.SetStateAction<MapPoint>>;
    setAddress?: React.Dispatch<React.SetStateAction<string>>;
}
const Map = ({ location, setLocation, eventInfo, setAddress }: Locations) => {
    return (
        <>
            <div className="mt-4">
                <MapContainer
                    className={styles.map}
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    style={{ height: '500px', width: '100%' }}
                >
                    <SearchField
                        setLocation={setLocation}
                        setAddress={setAddress}
                    />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {eventInfo &&
                        eventInfo.length > 0 &&
                        eventInfo.map((event, index) => (
                            <LocationMarker
                                key={index}
                                position={{
                                    latitude: parseFloat(event.latitude),
                                    longitude: parseFloat(event.longitude),
                                }}
                                eventInfo={event}
                            />
                        ))}
                    {location.latitude !== 0 && location.longitude !== 0 && (
                        <LocationMarker position={location} />
                    )}
                </MapContainer>
            </div>
        </>
    );
};

export default Map;

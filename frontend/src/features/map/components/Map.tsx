'use client';
import React, { useEffect, useState, Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { MapPoint } from '@/features/common/interfaces';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import useValidation from '../../../hooks/useValidation';
import LocationMarker from './LocationMaker';
import { LONDON_LOCATION } from '../../dashboard/components/constants';
import SearchField from './SearchField';

interface Locations {
    location: MapPoint;
    prevLocation?: MapPoint;
    setLocation?: React.Dispatch<React.SetStateAction<MapPoint>>;
    setPrevLocation?: React.Dispatch<React.SetStateAction<MapPoint>>;
}
const Map = ({
    location,
    // prevLocation = {
    //     latitude: LONDON_LOCATION.latitude,
    //     longitude: LONDON_LOCATION.longitude,
    // },
    setLocation,
    // setPrevLocation = () => {},
}: Locations) => {
    return (
        <>
            <div className="mt-4">
                <MapContainer
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    style={{ height: '500px', width: '100%' }}
                >
                    <SearchField
                        setLocation={setLocation}
                        latitude={location.latitude}
                        longitude={location.longitude}
                    />
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

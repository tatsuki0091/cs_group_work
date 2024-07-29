'use client'
import React, { useEffect, useState, Suspense } from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPoint } from '../../interface'
import { useInput } from "../../../../hooks/useInput";
import { useForm } from "../../../../hooks/useForm";
import useValidation from "../../../../hooks/useValidation";
import LocationMarker from "./LocationMaker"
import { LONDON_LOCATION } from '../constants'

const Map = () => {
    let geolocationPromise: Promise<{ latitude: number; longitude: number }> | null = null;

    const [location, setLocation] = useState<MapPoint>({ latitude: LONDON_LOCATION.latitude, longitude: LONDON_LOCATION.longitude });
    const [error, setError] = useState<string | null>(null);
    const getGeolocation = (): Promise<{ latitude: number; longitude: number }> => {
        if (!geolocationPromise) {
            geolocationPromise = new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            });
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                } else {
                    reject(new Error("Geolocation is not supported by this browser."));
                }
            });
        }
        return geolocationPromise;
    };

    // Execute once
    useEffect(() => {
        getGeolocation().then(
            (loc) => {
                setLocation(loc);
            },
            (err) => {
                setError(err.message);
            }
        );

    }, []);

    if (location === null && error === null) {
        throw getGeolocation();
    }

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <div className='mt-4'>
                <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
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
    )
}

export default Map
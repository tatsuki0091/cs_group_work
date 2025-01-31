import { Marker, Popup, useMap } from 'react-leaflet';
import { MapPoint } from '../../interface'
import React, { useEffect } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";


const LocationMarker = ({ position }: { position: MapPoint }) => {
    const map = useMap();
    useEffect(() => {
        if (position.latitude !== 0 && position.longitude !== 0) {
            map.flyTo([position.latitude, position.longitude], map.getZoom());
        }
    }, [position, map]);

    return (
        <Marker position={[position.latitude, position.longitude]}>
            <Popup>
                You are here.
            </Popup>
        </Marker>
    );
};

export default LocationMarker

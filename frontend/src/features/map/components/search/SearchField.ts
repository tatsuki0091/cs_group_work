'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css'; // leaflet-geosearch のスタイルをインポート
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as L from 'leaflet'; // leaflet の型定義を使用
import { MapPoint } from '@/features/common/interfaces';

// interface SearchFieldProps {
//     latitude: number;
//     longitude: number;
// }

interface ChildComponentProps {
    setLocation: React.Dispatch<React.SetStateAction<MapPoint>>;
    // latitude: number;
    // longitude: number;
}

const SearchField = (locationInfo: ChildComponentProps) => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();
    // const [location, setLocation] = useState<MapPoint>({
    //     latitude: 0,
    //     longitude: 0,
    // });
    // Add customer function for GeoSearchControl
    // When you type enter to search the place this section is going to be executed
    map.on('geosearch/showlocation', async (result: unknown) => {
        console.log('Search result:');
        if (typeof result === 'object') {
            console.log('sdfdsfs');
            console.log(locationInfo.setLocation);

            if (result.location && result.location.raw) {
                locationInfo.setLocation((prev) => ({
                    ...prev,
                    latitude: parseFloat(result.location.raw.lat),
                    longitude: parseFloat(result.location.raw.lon),
                }));
            }
        }
    });

    useEffect(() => {
        // Set up the search bar

        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar', // Style to search
        });

        (map as L.Map).addControl(searchControl); // 型アサーションを使用して addControl にアクセス
        // 6. 現在位置にマーカーを追加
        // L.marker([changeLocationState.latitude, changeLocationState.longitude])
        //     .addTo(map)
        //     .bindPopup('Your current location')
        //     .openPopup();

        // コンポーネントがアンマウントされたときに検索コントロールを削除
        return () => {
            (map as L.Map).removeControl(searchControl);
        };
    }, [map]);

    return null;
};

export default SearchField;
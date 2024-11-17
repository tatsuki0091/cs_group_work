'use client';
import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Widget from '@/features/dashboard/components/widget/Widget';
import { getCurrentLocation } from '@/features/map/utilities/index';
import { MapPoint } from '@/features/common/interfaces';
import { LONDON_LOCATION } from '@/features/dashboard/components/constants';
// Dynamic import for client-side rendering
const LazyMapComponent = dynamic(
    () => import('../../features/map/components/map/Map'),
    {
        ssr: false,
        suspense: true,
        loading: () => (
            <div>
                <p className="text-white">Loading map...</p>
            </div>
        ),
    },
);

const page = () => {
    const [location, setLocation] = useState<MapPoint>({
        latitude: LONDON_LOCATION.latitude,
        longitude: LONDON_LOCATION.longitude,
    });
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getLoc() {
            const loc = await getCurrentLocation();
            setLocation(loc);
        }
        getLoc();
    }, []);

    return (
        <div className="flex-1 bg-gray-100">
            <main className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Widget title="Widget 1" content="Some content here." />
                    <Widget title="Widget 2" content="Some content here." />
                    <Widget title="Widget 3" content="Some content here." />
                    <Widget title="Widget 4" content="Some content here." />
                </div>
                <Suspense fallback={<div>Loading map...</div>}>
                    <LazyMapComponent
                        location={location}
                        setLocation={setLocation}
                    />
                </Suspense>
            </main>
        </div>
    );
};

export default page;

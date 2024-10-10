'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SideBar from '@/features/dashboard/components/sidebar/SideBar';
import Widget from '@/features/dashboard/components/widget/Widget';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { decrement, increment } from '@/store/slices/counterSlice';
// Dynamic import for client-side rendering
const LazyMapComponent = dynamic(
    () => import('@/features/dashboard/components/map/Map'),
    {
        ssr: false,
        suspense: true,
        loading: () => <div>Loading map...</div>,
    },
);

const page = () => {
    return (
        <div className="min-h-screen flex">
            <SideBar />
            <div className="flex-1 bg-gray-100">
                <main className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Widget title="Widget 1" content="Some content here." />
                        <Widget title="Widget 2" content="Some content here." />
                        <Widget title="Widget 3" content="Some content here." />
                        <Widget title="Widget 4" content="Some content here." />
                    </div>
                    <Suspense fallback={<div>Loading map...</div>}>
                        <LazyMapComponent />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default page;

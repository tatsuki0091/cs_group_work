'use client';
import React, { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dynamic from 'next/dynamic';
import Widget from '@/features/dashboard/components/widget/Widget';
import { getCurrentLocation } from '@/features/map/utilities/index';
import { MapPoint } from '@/features/common/interfaces';
import { EventInfoProps } from '@/features/event/interfaces';
import { OnChangeFunction } from '@/features/common/types';
import { LONDON_LOCATION } from '@/features/dashboard/components/constants';
import { useForm } from '../../hooks/useForm';
import { useRouter } from 'next/navigation';
import { useInput } from '../../hooks/useInput';
import { GET } from '../../helpers/axios/constants';
import DatePicker from '@/features/common/elements/datepickers/DatePicker';
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
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Validate the plugin
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const days = dayjs().tz(userTimeZone);
    const oneWeekLater = days.add(1, 'week').toISOString();
    const [location, setLocation] = useState<MapPoint>({
        latitude: LONDON_LOCATION.latitude,
        longitude: LONDON_LOCATION.longitude,
    });
    const [dateFrom, setDateFrom] = useInput<Date, HTMLInputElement>(
        new Date(),
    );
    const [dateTo, setDateTo] = useInput<Date, HTMLInputElement>(
        new Date(oneWeekLater.toString()),
    );

    const [eventInfo, setEventInfo] = useInput<
        EventInfoProps[],
        HTMLInputElement
    >([]);
    // const [error, setError] = useState<string | null>(null);
    async function fetchEvents() {
        try {
            const apiResponse = await useForm({
                values: {},
                url: `/event/fetch/?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}&timeZone=${userTimeZone}`,
                httpMethod: GET,
            });
            if (apiResponse.status === 200) {
                setEventInfo(apiResponse.data.eventInfo);
            }
            // TODO Error handling
        } catch (error) {
            console.log(error);
        }
    }

    const createHandleDateChange =
        (
            setter: React.Dispatch<React.SetStateAction<Date>>,
        ): OnChangeFunction =>
        (date) => {
            if (date) {
                setter(date);
            }
        };

    useEffect(() => {
        async function getLoc() {
            const loc = await getCurrentLocation();
            setLocation(loc);
        }
        async function getEve() {
            await fetchEvents();
        }
        getLoc();
        getEve();
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <DatePicker
                            label={'Date From'}
                            value={dateFrom}
                            handleChange={createHandleDateChange(setDateFrom)}
                        />
                        <DatePicker
                            label={'Date To'}
                            value={dateTo}
                            handleChange={createHandleDateChange(setDateTo)}
                        />
                    </div>
                    <LazyMapComponent
                        location={location}
                        setLocation={setLocation}
                        eventInfo={eventInfo ? eventInfo : []}
                    />
                </Suspense>
            </main>
        </div>
    );
};

export default page;

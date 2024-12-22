'use client';
import React, { Suspense, useState, useEffect } from 'react';
import Input from '../../components/elements/inputs/Input';
import Textbox from '../../components/elements/textboxes/Textbox';
import ErrorMessages from '../../components/elements/errors/ErrorMessages';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import useValidation from '../../../hooks/useValidation';
import { POST } from '../../../helpers/axios/constants';
import { LONDON_LOCATION } from '../../../features/dashboard/components/constants';
import { useRouter } from 'next/navigation';
import { getCurrentLocation } from '@/features/map/utilities/index';
import { OnChangeFunction } from '@/features/common/types';
import { MapPoint } from '@/features/common/interfaces';
import DatePicker from '@/app/components/elements/datepickers/DatePicker';
import { createValidateForm } from '../../../features/event/validations';
// import SideBar from '../../components/layouts/sidebar/SideBar';
import dynamic from 'next/dynamic';
// Not import the component at the once
const LazyMapComponent = dynamic(
    () => import('../../../features/map/components/map/Map'),
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
    const [name, , handleName, resetName, handleNameBlur] = useInput<
        string,
        HTMLInputElement
    >('');
    const [location, setLocation] = useState<MapPoint>({
        latitude: LONDON_LOCATION.latitude,
        longitude: LONDON_LOCATION.longitude,
    });

    const [address, setAddress, , resetAddress] = useInput<
        string,
        HTMLInputElement
    >('');

    const [date, setDate, , resetDate] = useInput<Date, HTMLInputElement>(
        new Date(),
    );

    const handleDateChange: OnChangeFunction = (date) => {
        if (date) {
            setDate(date);
        }
    };
    const [description, , handleDescription, resetDescription] = useInput<
        string,
        HTMLTextAreaElement
    >('');
    const [errors, setError, resetValidation] = useValidation([]);
    const { push } = useRouter();

    const sendCreateRequest = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        const tokenValue = localStorage.getItem('access_token');
        event.preventDefault();
        // Check validation
        const checkErrors = createValidateForm({
            name: name,
            date: date,
            address: address,
            description: description,
            latitude: location.latitude,
            longitude: location.longitude,
        });
        //If there is an error, stop submit
        if (checkErrors.length > 0) {
            setError([...checkErrors]);
            return;
        }
        try {
            const apiResponse = await useForm({
                values: {
                    name: name,
                    address: address,
                    description: description,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    date: date,
                    created: new Date(),
                },
                url: '/event/create/',
                httpMethod: POST,
            });
            if (apiResponse.status === 201) {
                resetName();
                resetAddress();
                resetValidation();
                resetDescription();
                resetDate();
                // push('/');
            } else {
                setError([apiResponse.data.message]);
            }
        } catch (error) {
            console.log(error);
            console.error(`Failed to reset your password: ${error}`);
            throw new Error(`Failed to reset your password: ${error}`);
        }
    };

    useEffect(() => {
        async function getLoc() {
            const loc = await getCurrentLocation();
            setLocation(loc);
        }
        getLoc();
    }, []);
    return (
        <>
            <div className="min-h-screen flex">
                <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-24 mb-24">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                        Create Event
                    </h1>
                    <form
                        className="w-full flex flex-col gap-4"
                        onSubmit={sendCreateRequest}
                    >
                        <div className="flex items-start flex-col justify-start">
                            <Input
                                placeHolder="JavaScript Leetcode Meetup"
                                label="Name"
                                value={name}
                                handleChange={handleName}
                                handleBlur={handleNameBlur}
                                type="text"
                                id="name"
                            />
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <DatePicker
                                label={'Event Date'}
                                value={date}
                                labelClass={'mb-2 block font-bold text-white'}
                                handleChange={handleDateChange}
                            />
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <Textbox
                                placeHolder="xxxxxxxxxxx"
                                label="Description"
                                value={description}
                                handleChange={handleDescription}
                                id="description"
                            />
                        </div>
                        <Suspense fallback={<div>Loading map...</div>}>
                            <LazyMapComponent
                                location={location}
                                setLocation={setLocation}
                                setAddress={setAddress}
                            />
                        </Suspense>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                        >
                            Create
                        </button>
                    </form>
                    <div className="mt-4">
                        <ErrorMessages errors={errors} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;

'use client';
import React, { Suspense, useState, useEffect } from 'react';
import Input from '../../../features/common/elements/inputs/Input';
import Textbox from '../../../features/common/elements/textboxes/Textbox';
import ErrorMessages from '../../../features/common/elements/errors/ErrorMessages';
import { useInput } from '../../../hooks/useInput';
import { useForm } from '../../../hooks/useForm';
import useValidation from '../../../hooks/useValidation';
import { POST } from '../../../helpers/axios/constants';
import { LONDON_LOCATION } from '../../../features/dashboard/components/constants';
// import { useRouter } from 'next/navigation';
import { getCurrentLocation } from '@/features/map/utilities/index';
import { OnChangeFunction } from '@/features/common/types';
import { MapPoint } from '@/features/common/intefaces/interfaces';
import DatePicker from '@/features/common/elements/datepickers/DatePicker';
import DateTimePicker from '@/features/common/elements/datetimepickers/DateTimePicker';
import { createValidateForm } from '../../../features/event/validations';
import dynamic from 'next/dynamic';
import Modal from '@/features/common/elements/modals/Modal';
import {
    // setErrorMessages,
    // closeModal,
    openModal,
} from '@/features/common/utilities/index';
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

    const [
        startEventTime,
        setStartEventTime,
        handleStartEventTime,
        resetStartEventTime,
    ] = useInput<Date, HTMLInputElement>(new Date());

    const [
        endEventTime,
        setEndEventTime,
        handleEndEventTime,
        resetEventEventTime,
    ] = useInput<Date, HTMLInputElement>(new Date());

    const [description, , handleDescription, resetDescription] = useInput<
        string,
        HTMLTextAreaElement
    >('');
    const [isModalOpen, setIsModalOpen] = useInput<boolean, HTMLInputElement>(
        false,
    );
    const [errors, setError, resetValidation] = useValidation([]);
    // const { push } = useRouter();

    const sendCreateRequest = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        // Check validation
        const checkErrors = createValidateForm({
            name: name,
            event_start_date_time: startEventTime,
            event_end_date_time: endEventTime,
            address: address,
            description: description,
            latitude: location.latitude.toString(),
            longitude: location.longitude.toString(),
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
                    event_start_date_time: startEventTime,
                    event_end_date_time: endEventTime,
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
                resetStartEventTime();
                resetEventEventTime();
                openModal(setIsModalOpen);
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

                        {/* <div className="flex items-start flex-col justify-start">
                            <DatePicker
                                label={'Event Date'}
                                value={date}
                                labelClass={'mb-2 block font-bold text-white'}
                                handleChange={handleDateChange}
                            />
                        </div> */}
                        <div className="flex items-start flex-col justify-start">
                            <DateTimePicker
                                label={
                                    'Event Start Date Time(Please Click Calendar Mark)'
                                }
                                value={startEventTime}
                                labelClass={'mb-2 block font-bold text-white'}
                                handleChange={handleStartEventTime}
                            />
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <DateTimePicker
                                label={
                                    'Event End Date Time(Please Click Calendar Mark)'
                                }
                                value={endEventTime}
                                labelClass={'mb-2 block font-bold text-white'}
                                handleChange={handleEndEventTime}
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
            <Modal
                isOpen={isModalOpen}
                // onClose={() => closeModal(setIsModalOpen, push('/dashboard'))}
                setIsModalOpen={setIsModalOpen}
                path={'/dashboard'}
            >
                <h1 className="text-center text-xl font-bold">
                    Event was created.
                </h1>
            </Modal>
        </>
    );
};

export default page;

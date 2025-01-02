import { Marker, Popup, useMap } from 'react-leaflet';
import { MapPoint } from '@/features/common/intefaces/interfaces';
import { EventInfoProps } from '@/features/event/interfaces';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './style.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import Modal from '@/features/common/elements/modals/Modal';
import { useInput } from '../../../../hooks/useInput';

const LocationMarker = ({
    position,
    eventInfo,
}: {
    position?: MapPoint;
    eventInfo?: EventInfoProps;
}) => {
    const [isModalOpen, setIsModalOpen] = useInput<boolean, HTMLInputElement>(
        false,
    );
    const map = useMap();
    const open: React.MouseEventHandler<HTMLButtonElement> | undefined = () => {
        setIsModalOpen((prev) => (prev = true));
    };
    useEffect(() => {
        if (position.latitude !== 0 && position.longitude !== 0) {
            map.flyTo([position.latitude, position.longitude], map.getZoom());
        }
    }, [position, map]);

    useEffect(() => {
        if (eventInfo) {
            const formattedStartDate = dayjs(
                eventInfo.event_start_date_time,
            ).format('YYYY-MM-DD HH:mm');
            const formattedEndDate = dayjs(
                eventInfo.event_end_date_time,
            ).format('YYYY-MM-DD HH:mm');
            eventInfo.event_start_date_time = formattedStartDate;
            eventInfo.event_end_date_time = formattedEndDate;
        }
    }, [eventInfo]);
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                // onClose={() => closeModal(setIsModalOpen, push('/dashboard'))}
                setIsModalOpen={setIsModalOpen}
                path={'/dashboard'}
            >
                {eventInfo ? (
                    <>
                        <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                            {/* <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" className="w-full mb-3"> */}
                            <div className="p-4 pt-2">
                                <div className="mb-8">
                                    {/* <p className="text-sm text-gray-600 flex items-center">
                                        <svg
                                            className="fill-current text-gray-500 w-3 h-3 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
                                        </svg>
                                        Members only
                                    </p> */}
                                    <h2 className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block">
                                        {eventInfo.name}
                                    </h2>
                                    {typeof eventInfo.event_start_date_time ===
                                        'string' &&
                                    typeof eventInfo.event_end_date_time ===
                                        'string' ? (
                                        <p className="text-gray-700 text-sm">
                                            Event Time:
                                            {eventInfo.event_start_date_time}-
                                            {eventInfo.event_end_date_time}
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 text-sm">
                                            No date specified
                                        </p>
                                    )}
                                    <p className="text-gray-700 text-sm">
                                        {eventInfo.description}
                                    </p>
                                </div>
                                {/* <div className="flex items-center">
                                    <a href="#"><img className="w-10 h-10 rounded-full mr-4" src="https://tailwindcss.com/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"></a>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                                        >
                                            Jonathan Reinink
                                        </a>
                                        <p className="text-gray-600">Aug 18</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className={styles.join}>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                                Join
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No Description</p>
                )}
            </Modal>
            {position ? (
                <Marker position={[position.latitude, position.longitude]}>
                    <Popup>
                        {eventInfo ? (
                            <>
                                <h2 className={styles.popupBody}>
                                    Title: {eventInfo.name}
                                </h2>
                                {typeof eventInfo.event_start_date_time ===
                                    'string' &&
                                typeof eventInfo.event_end_date_time ===
                                    'string' ? (
                                    <div className={styles.popupBody}>
                                        <h2>Event Time</h2>
                                        <h2>
                                            {eventInfo.event_start_date_time}-
                                            {eventInfo.event_end_date_time}
                                        </h2>
                                    </div>
                                ) : (
                                    <div className={styles.popupBody}>
                                        <p>No date specified</p>
                                    </div>
                                )}
                                {/* <div className={styles.popupBody}>
                                    <p>{eventInfo.description}</p>
                                </div> */}
                                <div className={styles.popupBody}>
                                    <button
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                                        onClick={open}
                                    >
                                        Detail
                                    </button>
                                </div>
                            </>
                        ) : (
                            'You are here'
                        )}
                    </Popup>
                </Marker>
            ) : (
                <></>
            )}
        </>
    );
};

export default LocationMarker;

'use client';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Icon } from './utilities';
import SidebarSubmenu from './SidebarSubmenu';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { POST } from '../../../../helpers/axios/constants';
import { useForm } from '../../../../hooks/useForm';
import { useRouter } from 'next/navigation';

const SideBar = () => {
    const { push } = useRouter();
    const logout: React.MouseEventHandler<HTMLAnchorElement> = async (
        event,
    ) => {
        event.preventDefault();
        try {
            const apiResponse = await useForm({
                values: {},
                url: '/user/logout/',
                httpMethod: POST,
            });
            if (apiResponse.status === 200) {
                push('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className={` text-white flex flex-col ${styles.sideBar}`}>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Sidebar</h2>
                </div>
                <ul className="w-80 flex-1 p-4 space-y-2">
                    <li>
                        <Link
                            href="/dashboard"
                            className="flex items-center hover:bg-blue-700 p-2 rounded"
                        >
                            <FaTachometerAlt className="mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/event/create"
                            className="flex items-center hover:bg-blue-700 p-2 rounded"
                        >
                            <FaTachometerAlt className="mr-2" />
                            Create Event
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/update"
                            className="flex items-center hover:bg-blue-700 p-2 rounded"
                        >
                            <FaUser className="mr-2" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center hover:bg-blue-700 p-2 rounded"
                        >
                            <FaCog className="mr-2" />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            onClick={logout}
                            className="flex items-center hover:bg-blue-700 p-2 rounded"
                        >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;

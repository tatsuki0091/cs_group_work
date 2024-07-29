'use client'
import React from 'react'
import routes from '../../routes/sidebar'
import { Button } from '@windmill/react-ui'
import Link from 'next/link'
import { Icon } from './utilities'
import SidebarSubmenu from './SidebarSubmenu'
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';

const SideBar = () => {
    return (
        <>
            <div className={`bg-blue-600 text-white flex flex-col ${styles.sideBar}`}>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Sidebar</h2>
                </div>
                <ul className="w-80 flex-1 p-4 space-y-2">
                    <li>
                        <Link href="#" className="flex items-center hover:bg-blue-700 p-2 rounded">
                            <FaTachometerAlt className="mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center hover:bg-blue-700 p-2 rounded">
                            <FaUser className="mr-2" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center hover:bg-blue-700 p-2 rounded">
                            <FaCog className="mr-2" />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center hover:bg-blue-700 p-2 rounded">
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SideBar
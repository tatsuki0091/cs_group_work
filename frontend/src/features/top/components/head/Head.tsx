'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';


const Head = ({ interval = 3000 }) => {

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        console.log('sdfsfsd')
        // Showing up after 0.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className={styles.slideshow}>
                <div
                    className={`${styles.slide}`}
                    style={{ backgroundImage: `url('/images/connection1.jpg')` }}
                >
                    <h2 className={`${styles.text} ${isVisible ? styles.visible : ''} text-white text-4xl`}>
                        Let's all move forward together
                    </h2>

                </div>
            </div>
        </>
    )
}

export default Head
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css';
import { TESTIMONIES } from './constants'
import { Testimonies } from "./interfaces"


const Card = () => {
    const testimonies: Testimonies[] = TESTIMONIES
    return (
        <>
            <section className={`${styles.bg1}`}>
                <h2 className={`${styles.c}`}><span className={`${styles.fadeInText}`}>Information</span><span className={`${styles.hosoku}`}>ご案内</span></h2>
                <div className={`${styles.listGrid}`}>
                    {testimonies.map((testimony, index) => (
                        <div key={index} className={`${styles.list}`}>
                            {/* <figure><Image src="images/internet.jpg" alt="" /></figure> */}
                            <div className="text">
                                <h4>{testimony.title}</h4>
                                <p>{testimony.paragraph}</p>
                            </div>
                            <p className={`${styles.btnBorderRadius}`}><Link href="service2.html">詳しくみる</Link></p>
                        </div>
                    ))}

                </div>

            </section >
        </>
    )
}

export default Card
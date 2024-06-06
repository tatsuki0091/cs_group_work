import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css';
import { Carousel, CarouselItem } from '@material-tailwind/react';
type prevArrow = (args: {
    loop: boolean;
    handlePrev: () => void;
    activeIndex: number;
    firstIndex: boolean;
}) => React.ReactNode | void;

type nextArrow = (args: {
    loop: boolean;
    handleNext: () => void;
    activeIndex: number;
    lastIndex: boolean;
}) => React.ReactNode | void;

type navigation = (args: {
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
    length: number;
}) => React.ReactNode | void;

const Card = () => {
    return (
        <>
            <section className={`${styles.bg1}`}>
                <h2 className={`${styles.c}`}><span className={`${styles.fadeInText}`}>Information</span><span className={`${styles.hosoku}`}>ご案内</span></h2>


                <div className={`${styles.listGrid}`}>
                    <div className={`${styles.list}`}>
                        {/* <figure><Image src="images/internet.jpg" alt="" /></figure> */}
                        <div className="text">
                            <h4>ここにタイトルを入れます</h4>
                            <p>ここに説明を入れます。サンプルテキスト。</p>
                        </div>
                        <p className={`${styles.btnBorderRadius}`}><Link href="service2.html">詳しくみる</Link></p>
                    </div>

                    <div className={`${styles.list}`}>
                        {/* <figure><Image src="images/internet.jpg" alt="" /></figure> */}
                        <div className="text">
                            <h4>ここにタイトルを入れます</h4>
                            <p>ここに説明を入れます。サンプルテキスト。</p>
                        </div>
                        <p className={`${styles.btnBorderRadius}`}><Link href="service2.html">詳しくみる</Link></p>
                    </div>

                    <div className={`${styles.list}`}>
                        {/* <figure><Image src="images/internet.jpg" alt="" /></figure> */}
                        <div className="text">
                            <h4>ここにタイトルを入れます</h4>
                            <p>ここに説明を入れます。サンプルテキスト。ここに説明を入れます。サンプルテキスト。ここに説明を入れます。サンプルテキスト。</p>
                        </div>
                        <p className={`${styles.btnBorderRadius}`}><Link href="service2.html">詳しくみる</Link></p>
                    </div>

                </div>

            </section >
        </>
    )
}

export default Card
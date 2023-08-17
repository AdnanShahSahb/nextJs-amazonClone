
import "react-responsive-carousel/lib/styles/carousel.min.css"; import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import a from "@/images/slides/sliderImg_1.jpg"
import b from "@/images/slides/sliderImg_2.jpg"
import c from "@/images/slides/sliderImg_3.jpg"
import d from "@/images/slides/sliderImg_4.jpg"
import Image from "next/image";

const Banner = () => {
    return (
        <div className="relative">
            <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={3000}>
                <div>
                    <Image alt="slider1" src={a} />
                </div>
                <div>
                    <Image alt="slider2" src={b} />
                </div>
                <div>
                    <Image alt="slider3" src={c} />
                </div>
                <div>
                    <Image alt="slider4" src={d} />
                </div>
            </Carousel>
            <div className="w-full bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 h-40"></div>
        </div>
    )
}

export default Banner
import React from 'react'
import logoImg from "@/images/logo.png"
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4'>
            <Image src={logoImg} className="w-24" alt="logoImg" />
            <p className='text-sm -mt-4'>All rights reseved <a className='hover:text-white hover:underline decoration-[1px] duration-300' href='https://adnanshah-codeGallery.web.app' target='_blank'>@myWebsite.com</a>
            </p>
        </div>
    )
}

export default Footer
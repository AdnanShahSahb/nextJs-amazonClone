import React, { ChangeEvent } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../types'
import { signOut } from 'next-auth/react'
import { removeUser, setKeywordsForSearching } from '@/store/slicing'

const BottomNavbar = () => {
    const dispatching = useDispatch()
    const { userInfo } = useSelector((state: StateProps) => state.theSliceName)

    const handleBottomNavbarClicks = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        const paragraphElement = e.target as HTMLParagraphElement;
        const innerHTML = paragraphElement.innerHTML;

        if (innerHTML.includes('<path ') || '')
            dispatching(setKeywordsForSearching(''))
        else
            dispatching(setKeywordsForSearching(innerHTML))
    }


    return (
        <div className='w-full bg-amazon_light text-white text-sm px-4 flex items-center h-10'>
            <p onClick={(e) => handleBottomNavbarClicks(e)} className='flex items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                <AiOutlineMenu /> All
            </p>
            <p onClick={(e) => handleBottomNavbarClicks(e)} className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                men's clothing
            </p>
            <p onClick={(e) => handleBottomNavbarClicks(e)} className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                jewelery
            </p>
            <p onClick={(e) => handleBottomNavbarClicks(e)} className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                electronics
            </p>
            <p onClick={(e) => handleBottomNavbarClicks(e)} className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                women's clothing
            </p>
            {userInfo
                &&
                <p
                    onClick={() => {
                        signOut();
                        dispatching(removeUser())
                    }}
                    className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-red-600 text-amazon_yellow hover:text-red-400 cursor-pointer duration-300 px-2'>
                    Sign Out
                </p>
            }
        </div>
    )
}

export default BottomNavbar
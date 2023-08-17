import React from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../types'
import { signOut } from 'next-auth/react'
import { removeUser } from '@/store/slicing'

const BottomNavbar = () => {
    const dispatching = useDispatch()
    const { userInfo } = useSelector((state: StateProps) => state.theSliceName)
    return (
        <div className='w-full bg-amazon_light text-white text-sm px-4 flex items-center h-10'>
            <p className='flex items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                <AiOutlineMenu /> All
            </p>
            <p className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                Todays Deals
            </p>
            <p className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                Customer Service
            </p>
            <p className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                Restry
            </p>
            <p className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                Gift Cards
            </p>
            <p className='hidden md:inline-flex  items-center h-8 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 px-2'>
                Sell
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
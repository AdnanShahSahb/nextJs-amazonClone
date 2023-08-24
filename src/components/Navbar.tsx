import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import logo from "@/images/logo.png"
import { BiLocationPlus } from "react-icons/bi"
import { BiSearch } from "react-icons/bi"
import cartImg from "@/images/cartIcon.png"

import { BiCaretDown } from "react-icons/bi"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps, StoreProdProp } from '../../types'

import { useSession, signIn } from "next-auth/react"
import { addToCart, addUser, resetCart, setKeywordsForSearching, switchToUserCart } from '@/store/slicing'


const Navbar = () => {

  const { prodData, favData, userInfo } = useSelector((state: StateProps) => state.theSliceName)
  // console.log(prodData);

  const { data: session, status } = useSession()

  // console.log(session, status);
  const dispatching = useDispatch()

  useEffect(() => {
    if (session) {
      dispatching(addUser({
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image
      }))

      // const prodData:
      // console.log(prodData);
      // console.log(status);
      // console.log(1);

      prodData.forEach((element:StoreProdProp) => {
        dispatching(switchToUserCart({
          userid: session.user?.email,
          description: element.description,
          id: element.id,
          image: element.image,
          price: element.price,
          rating: element.rating,
          title: element.title,
          quantity: 1
        }))
      });
    }

  }, [session])

  const [lengthOfUserCart, setLengthOfUserCart] = useState(0)

  // useEffect(() => { dispatching(resetCart()) },[])

  // const handleUserCart = () => {
  //   console.log(session?.user?.email);
  // }

  return (
    <div className='w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50 '>
      <div className='w-full h-full gap-1 mx-auto inline-flex items-center justify-between px-4'>

        <Link href='/' className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]'>
          <Image src={logo} className='w-28 object-cover mt-1' alt='logoImg' />

        </Link>
        <div className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1'>
          <BiLocationPlus />
          <div className='text-xs'>
            <p>Deliver to</p>
            <p className='text-white font-bold'>USA</p>
          </div>
        </div>

        <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative '>

          <input onChange={(e: ChangeEvent<HTMLInputElement>) => { dispatching(setKeywordsForSearching(e.target.value)) }} className=' w-full h-full rounded-md  placeholder:text-sm  px-2 text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow' placeholder='Search' />
          <span className='w-12 h-full bg-amazon_yellow text-black text-2xl flex  items-center justify-center absolute right-0 rounded-tr-md rounded-br-md hover:cursor-pointer'>
            <BiSearch />
          </span>
        </div>

        {userInfo ? <div className='px-2 gap-1 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center  justify-center h-[70%]'>
          <img src={userInfo.image} alt='userImage' className='w-8 h-8 rounded-full object-cover ' />
          <div className='text-xs text-gray-100 flex justify-between flex-col'>
            <p className='text-white font-bold'>{userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>
        </div> :
          <div onClick={() => { signIn() }} className='px-2 text-xs border border-transparent hover:border-white cursor-pointer duration-300 flex flex-col  justify-center h-[70%]'>
            <p>Hello, Signin</p>
            <p className=' text-white font-bold  items-center hidden sm:flex'>
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        }

        <Link href={'/Favorite'} className='relative text-xs px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex flex-col  justify-center h-[70%]'>
          <p className=' hidden sm:block'>Marked </p>
          <p className='text-white font-bold'><span className='invisible sm:visible'>&</span> Favorite</p>
          <span className='absolute text-xs text-amazon_yellow h-4 w-4 flex items-center justify-center top-2 right-0 font-semibold border-[1px] px-2'>{favData.length}</span>
        </Link>

        <Link href='/Cart' className='sm:px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%] relative'>
          {/* <HoverDiving> */}
          <Image src={cartImg} alt='cartImg' className='w-auto object-cover h-8' />
          <p className='text-xs text-white font-bold mt-3 hidden sm:block'>Cart </p>
          <span className='absolute text-amazon_yellow text-sm top-2 left-[31px] font-semibold'>{ prodData.length}</span>
          {/* </HoverDiving> */}
        </Link>



      </div>
    </div>
  )
}

export default Navbar
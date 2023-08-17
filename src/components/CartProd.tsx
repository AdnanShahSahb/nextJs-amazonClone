import Image from 'next/image'
import React from 'react'
import { StoreProdProp } from '../../types'
import FormatedPrice from './FormatedPrice'
import { IoMdClose } from "react-icons/io"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { decQuantity, incQuantity, remFromCart, remFromFavs } from '@/store/slicing'

interface cartProps {
  cartProd: StoreProdProp
}



interface Props {
  cartProd: StoreProdProp,
  itis: string
}

const CartProd: React.FC<Props> = ({ cartProd, itis }: Props) => {

  const dispatching = useDispatch()
  console.log(cartProd.price, itis);

  const isCart = itis == 'favItIs';

  return (
    <div className='bg-gray-100 rounded-lg flex items-center gap-4'>
      <Image src={cartProd.image} alt='imageCart' height={110} width={110} className='object-cover' />
      <div className='flex items-center px-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold text-amazon_blue'>{cartProd.title}</p>
          <p className='text-sm text-gray-600'>{cartProd.description}</p>
          <p className='text-sm text-gray-600'>Unit Price <span className='font-semibold text-amazon_blue'><FormatedPrice amount={cartProd.price} /></span></p>
          {!isCart ?
            <div className='flex items-center gap-6'>
              <div className='flex items-center justify-between border-gray-300 px-4 py-1 my-4 rounded-full w-28 shadow-lg shadow-gray-300'>
                <span onClick={() => { dispatching(decQuantity({ id: cartProd.id })) }} className='h-6 w-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300'>
                  <AiOutlineMinus />
                </span>
                <span>{cartProd.quantity}</span>
                <span onClick={() => { dispatching(incQuantity({ id: cartProd.id })) }} className='h-6 w-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300'>
                  <AiOutlinePlus />
                </span>
              </div>
              <div onClick={() => {
                dispatching(remFromCart({
                  id: cartProd.id
                }))
              }} className='flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300'>
              <IoMdClose className="mt-[2px]" /><p className='ml-3'> Remove</p>
            </div>
            </div>
        :
        <div className='flex items-center gap-6'>
          <div className='flex items-center justify-between border-gray-300 px-4 py-1 my-4 rounded-full w-28 shadow-lg shadow-gray-300'>

            <div onClick={() => {
              dispatching(remFromFavs({
                id: cartProd.id
              }))
            }} className='flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300'>
              <IoMdClose className="mt-[2px]" /><p className='ml-3'> Remove</p>
            </div>
          </div>
        </div>
          }
      </div>
      <div className='text-lg font-semibold text-amazon_blue'>
        <FormatedPrice amount={isCart ? cartProd.price : cartProd.price * cartProd.quantity} />
      </div>
    </div>
    </div >
  )
}

export default CartProd
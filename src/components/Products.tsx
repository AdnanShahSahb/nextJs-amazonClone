import React from 'react'
import { ProdProp, StateProps } from "../../types"
import Image from 'next/image'
import { BsCartPlus } from "react-icons/bs"
import { GrFavorite } from "react-icons/gr"
import FormatedPrice from './FormatedPrice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToFavs } from '@/store/slicing'
const Products = ({ prods }: any) => {
  // console.log(prods);
  const { searchedKeyword } = useSelector((state: StateProps) => state.theSliceName)
  console.log(prods, searchedKeyword);
  const dispatching = useDispatch()

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-6 gap-6 pb-10'>
      {prods.map(({ category, description, id, image, price, rating, title }: ProdProp) => {
        if (title.toLowerCase().includes(searchedKeyword)) {
          return (
            <div className='w-full  bg-white text-black p-4 border border-gray-300 rounded-lg group  overflow-hidden cursor-pointer' key={id}>
              <div className='w-full h-[260px] relative'>
                <Image width={100} height={100} className='h-full w-full object-cover scale-90 hover:scale-100 
            duration-300 transition-transform' src={image} alt={'img'} />
                <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px]  border-gray-400 bg-white rounded-lg flex flex-col translate-x-20 group-hover:translate-x-0 duration-300 transition-transform'>
                  <span onClick={() => {
                    dispatching(addToCart({
                      description,
                      id,
                      image,
                      price,
                      rating,
                      title,
                      quantity: 1
                    }))
                  }} className='h-full w-full border-b-[1px] flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'><BsCartPlus /></span>
                  <span onClick={() => {
                    dispatching(addToFavs({
                      description,
                      id,
                      image,
                      price,
                      rating,
                      title
                    }))
                  }} className='h-full w-full  flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'><GrFavorite /></span>
                </div>
                <p className='absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce'>!save <FormatedPrice amount={(price / 100) * 20} /></p>
              </div>
              <hr />
              <div className='px-4 py-3 flex flex-col gap-1'>
                <p className='text-xs text-gray-500 tracking-wide'></p>
                <p className='text-base  text-justify font-medium sm:h-[50px]'>{title.substring(0, 40)}</p>
                <p className='flex gap-2 items-center'>
                  <span className='text-sm line-through'><FormatedPrice amount={price + (price / 100) * 20} /></span>
                  <span className='text-amazon_blue font-semibold '><FormatedPrice amount={price} /></span>
                </p>
                <p className='text-xs sm:h-[70px] text-gray-600 text-justify'>{description.substring(0, 120)}</p>
                <button onClick={() => {
                  dispatching(addToCart({
                    description,
                    id,
                    image,
                    price,
                    rating,
                    title,
                    quantity: 1
                  }))
                }} className='h-10 text-white  bg-amazon_blue hover:bg-amazon_yellow hover:text-black duration-300 mt-2'>Add to Cart</button>
              </div>
            </div>
          )
        }
      
      }
      )}

    </div>
  )
}

export default Products
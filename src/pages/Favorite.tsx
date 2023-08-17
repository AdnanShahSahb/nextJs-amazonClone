import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';
import { StateProps, StoreProdProp } from "../../types"
import Cart from './Cart';
import ResetCart from '@/components/ResetCart';
import CartProd from '@/components/CartProd';
import Link from 'next/link';

const Favorite = () => {


    const { favData ,searchedKeyword} = useSelector((state: StateProps) => state.theSliceName)
    return (
        <div className='max-w-screen-2xl mx-auto gap-5 px-5 grid grid-cols-5  py-4'>
            {favData.length > 0 ?
                <>
                    <div className='bg-white col-span-5 p-4 rounded-lg'>
                        <div className='flex items-center justify-between border-b-[1px] border-b-gray pb-1'>
                            <p className=' text-2xl font-semibold text-amazon_blue'>My Favorites</p>
                            <p className='text-lg font-semibold text-amazon_blue'>Subtitle</p>
                        </div>
                        <div className='pt-2 flex flex-col gap-2'>

                            {favData.map((d: StoreProdProp) => {
                                if (d.title.toLowerCase().includes(searchedKeyword)) {

                                    return < div key={d.id} className=' flex flex-col gap-2' >
                                        <CartProd cartProd={d} itis={'favItIs'} />
                                    </div>
                                }
                            })
                            }
                        </div>
                    </div>
                </>
                :

                <div className='bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg'>
                    <h1 className='text-lg font-medium'>Favorite list is empty</h1>
                    <Link href='/' >
                        <button className='w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black'>
                            Go to shopping
                        </button>
                    </Link>
                </div>
            }
        </div >
    )
}

export default Favorite
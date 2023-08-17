import React, { useEffect, useState } from 'react'
import { SiMediamarkt } from "react-icons/si"
import FormatedPrice from './FormatedPrice'
import { useSelector } from 'react-redux'
import { StateProps, StoreProdProp } from '../../types'
import { useSession } from 'next-auth/react'

import { loadStripe } from '@stripe/stripe-js'

const CartPayment = () => {
    const { prodData, userInfo } = useSelector((state: StateProps) => state.theSliceName)
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        let amt = 0
        prodData.map((d: StoreProdProp) => {
            amt += d.price * d.quantity;
            return;
        })
        setTotalAmount(amt)
    }, [prodData])

    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )

    const { data: session } = useSession()

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: prodData, email: session?.user?.email })
        })
        console.log('REACHED');
        const checkoutSession=await response.json()

        const result:any=await stripe?.redirectToCheckout({
            sessionId:checkoutSession.id
        })

        if(result.error){
            alert(result?.error.message)
        }
        

    }


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <span className='bg-green-600 rounded-full p-1 h-6 text-sm text-white flex items-center justify-center mt-1'><SiMediamarkt /></span>
                <p className='text-sm'>Your order qualifies for FREE Shipping by Choosing this option at checkout. See details....</p>
            </div>
            <p className='flex items-center justify-between font-semibold '>Total:
                <span className='font-bold text-xl'><FormatedPrice amount={totalAmount} /></span>
            </p>
            {userInfo ? <div
                className='flex items-center flex-col'>
                <button onClick={handleCheckout} className='w-full h-10 text-sm font-semibold bg-amazon_blue hover:bg-amazon_yellow hover:text-amazon_blue text-white rounded-lg '>Proceed to Buy</button>
            </div> : <div className='flex items-center flex-col'>
                <button className='w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed'>Proceed to Buy</button>
                <p className='text-xs mt-1 text-red-500 font-semibold animate-bounce '>Please login to continue</p>
            </div>}
        </div>
    )
}

export default CartPayment
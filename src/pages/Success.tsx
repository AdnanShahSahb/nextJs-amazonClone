import { resetCart } from '@/store/slicing'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Success = () => {
  const dispatching = useDispatch()
  useEffect(() => {
    dispatching(resetCart())
  }, [])
  return (
    <div className='flex flex-col gap-2 items-center justify-center py-20'>
      <h1 className='  font-extrabold'>Thanks for shopping in amazon clone</h1>
      <Link href={'/'}>
        <p className=' underline text-blue-600'>
          Continue Shopping
        </p>
      </Link>
    </div>
  )
}

export default Success
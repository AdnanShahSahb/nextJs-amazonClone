import { resetCart } from '@/store/slicing'
import React from 'react'
import { useDispatch } from 'react-redux'

const ResetCart = () => {
  const dispatching = useDispatch()

  return (
    <button onClick={() => {
      const confirming = window.confirm("Are you sure you want to reset the cart?")
      if (confirming)
        dispatching(resetCart())
    }} className='w-full sm:w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'>Reset Cart</button>
  )
}

export default ResetCart
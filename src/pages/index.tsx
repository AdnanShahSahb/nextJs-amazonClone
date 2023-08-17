import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import Products from '@/components/Products'
import { ProdProp, StateProps } from "../../types"
import { useSelector } from 'react-redux'

interface Props {
  prods: ProdProp
}


export default function Home({ prods }: Props) {
  return (
    <main>
      <div className='max-w-screen-2xl mx-auto '>
        <Banner />
        <div className='relative md:-mt-20 lgl:-mt-32 xl:-mt-60'>
          <Products prods={prods} />
        </div>
      </div>

    </main>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const prods = await res.json()
  // console.log(prods);
  return { props: { prods } }
}
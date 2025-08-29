import React from 'react'
import notFound from "./../../../assets/images/notFound.jpg"
const NotFound = () => {
  return (
    <>
    <section className='flex justify-center items-center min-h-dvh bg-[#2E1B3B]'>
      <img className='w-[500px] object-cover ' src={notFound} alt="not foud page " />
    </section>
    </>
  )
}

export default NotFound

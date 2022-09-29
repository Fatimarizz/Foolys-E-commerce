import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Errorpage(){
  return (
    <div className='bg-gray-300 h-[40rem] text-center pt-[15rem]'>
        <h1 className='text-9xl'> 404 Error </h1>
        <h3 className='text-3xl'>Sorry this page is not found!</h3>
        <button className='bg-pink-500 rounded-full text-white mt-5 p-3 '> <NavLink to='/'> Back to home page</NavLink> </button>
    </div>
  )
}

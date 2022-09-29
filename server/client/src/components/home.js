import React from 'react';
import Catalogue from './Catalogue';

export default function Home() {
  return (
    <>
    <div className='flex h-[33rem] relative'>
      <div className='h-full w-1/2 bg-gray-300  '>
      </div>
      <div className='h-full w-1/2 bg-[#f6bac5]'>

      </div>
      <div className=' content-center'>
        <h1 className=' ml-[9rem] text-4xl font-bold text-gray-600 '>
          Fooly's Collection
        </h1>
        <p className="ml-[9rem] text-md text-gray-600 mt-3" >
          World's Top Class Collection of Accessories With High Quality  and Perfection.
        </p>
      </div>
</div>
<Catalogue/>
</>
  )
}


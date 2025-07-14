import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center py-2 w-full'>
    <div className="logo font-bold text-2xl ">
           
            <span className= 'text-green-500'>&lt;</span>
            PasST
            <span className='text-green-500'>OR/&gt;</span>
            
            </div>
    <div className='flex justify-center items-center gap-2'>
        Created by <img className='invert' width={20}src="images/heart.png" alt="img" />aanand
    </div>
    </div>
  )
}

export default Footer
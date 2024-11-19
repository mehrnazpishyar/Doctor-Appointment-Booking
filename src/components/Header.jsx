import React from 'react'
import { assets } from '../assets//assets_data'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>

    {/* --------- Left side --------- */}
    <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br />  With Trusted Doctors
        </p>
      
        <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
    </div>

    {/* --------- Right side --------- */}
    <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.team} alt="" />
    </div>
</div>
  )
}

export default Header
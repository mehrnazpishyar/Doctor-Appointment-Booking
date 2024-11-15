
import {assets} from '../assets/assets_data'


const Navbar = () => {


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-5 font-medium hidden'>
     
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
    
     
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
     
     
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
     
     
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
      
      </ul>

      <div className='flex items-center gap-4 '>
             <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profilePic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p className='hover:text-black cursor-pointer'>My Profile</p>
                  <p className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
             <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
       
        <img className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className='md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all'>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img src={assets.close_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <p className='px-4 py-2 rounded full inline-block'>HOME</p>
         <p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p>
         <p className='px-4 py-2 rounded full inline-block'>ABOUT</p>
         <p className='px-4 py-2 rounded full inline-block'>CONTACT</p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
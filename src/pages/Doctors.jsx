import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { specialty } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (specialty) {
      setFilterDoc(doctors.filter(doc => doc.specialty === specialty))
    } else {
      setFilterDoc(doctors)
    }
  }

  
  useEffect(() => {
    applyFilter()
  }, [doctors, specialty])

  return (
    <div>
    <p className='text-gray-600'>Explore the specialties of our doctors:</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <div className='flex-col gap-4 text-sm text-gray-600 flex'>
        <p onClick={() => specialty === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'General physician' ? 'bg-indigo-100 text-black ' : ''}`}>General physician</p>
        <p onClick={() => specialty === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'Gynecologist' ? 'bg-indigo-100 text-black ' : ''}`}>Gynecologist</p>
        <p onClick={() => specialty === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'Dermatologist' ? 'bg-indigo-100 text-black ' : ''}`}>Dermatologist</p>
        <p onClick={() => specialty === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'Pediatricians' ? 'bg-indigo-100 text-black ' : ''}`}>Pediatricians</p>
        <p onClick={() => specialty === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'Neurologist' ? 'bg-indigo-100 text-black ' : ''}`}>Neurologist</p>
        <p onClick={() => specialty === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-blue-200 ${specialty === 'Gastroenterologist' ? 'bg-indigo-100 text-black ' : ''}`}>Gastroenterologist</p>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {filterDoc.map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-gray-100' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
              </div>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-blue-500 text-sm'>{item.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Doctors
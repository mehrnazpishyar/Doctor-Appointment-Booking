import type { Doctor } from "../types";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from "../context/useAppContext"
import DoctorDataStatus from "./DoctorDataStatus";


const RelatedDoctors = ({ specialty, docId }: { specialty: string; docId?: string }) => {

    const navigate = useNavigate()
    const { doctors, doctorsLoading, doctorsError, } = useAppContext()

    const [relDoc, setRelDoc] = useState<Doctor[]>([])

    useEffect(() => {
        if (doctors.length > 0 && specialty) {
            const doctorsData = doctors.filter((doc) => doc.specialty === specialty && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, specialty, docId])

    if (doctorsLoading || doctorsError) {
        return <DoctorDataStatus />;
    }

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>Explore our wide range of trusted doctors at your convenience.</p>
            <div className='w-full flex flex-wrap justify-center gap-4 pt-5 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-gray-100' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"
                                }`}>
                                <span
                                    className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                />
                                <p>{item.available ? "Available" : "Unavailable"}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors
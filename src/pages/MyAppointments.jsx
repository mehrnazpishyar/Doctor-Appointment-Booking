import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { appointments,removeAppointment  } = useContext(AppContext)
  return (
    <div>
       <p className="pb-3 mt-12 font-medium text-blue-600">
                My appointments
            </p>
            <div>
                {appointments.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                    >
                        <div>
                            <img
                                className="w-32 bg-gray-100 rounded-md"
                                src={item.doctor.image}
                                alt=""
                            />
                        </div>
                        <div className="flex-1 text-sm text-zinc-600">
                            <p className="text-neutral-800 font-semibold">
                                {item.doctor.name}
                            </p>
                            <p>{item.doctor.specialty}</p>
                            <p className="text-zinc-700 font-medium mt-1">
                                Address:
                            </p>
                            <p className="text-xs">{item.doctor.address.line1}</p>
                            <p className="text-xs">{item.doctor.address.line2}</p>
                            <p className="text-xs mt-1">
                                <span className="text-sm text-neutral-700 font-medium">
                                    Date & Time:
                                </span>{" "}
                                {item.date} | {item.time}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                                Pay Online
                            </button>
                            <button onClick={() => removeAppointment(index)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                                Cancel appointment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default MyAppointments
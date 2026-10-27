import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction, } from "react";
import { doctors } from "../assets/data";
import type { Appointment, Doctor } from "../types";

interface AppContextValue {
    doctors: Doctor[];
    currencySymbol: string;
    appointments: Appointment[];
    setAppointments: Dispatch<SetStateAction<Appointment[]>>;
    removeAppointment: (index: number) => void;
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<
    AppContextValue | undefined>(undefined)


const AppContextProvider = ({children}: { children: ReactNode }) => {

    const currencySymbol = '$';
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [token, setToken] = useState<string | null >(()=>localStorage.getItem('token'))

    const removeAppointment = (index: number) => {
        setAppointments((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <AppContext.Provider value={{ doctors, currencySymbol, appointments, setAppointments, removeAppointment, token, setToken }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
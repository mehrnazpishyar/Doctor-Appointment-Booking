import { createContext, useState, useCallback, useEffect } from "react";
import type { Dispatch, ReactNode, SetStateAction, } from "react";
import type { Appointment, Doctor } from "../types";
import { fetchDoctors } from "../lib/doctors";

interface AppContextValue {
    doctors: Doctor[];
    doctorsLoading: boolean;
    doctorsError: string;
    reloadDoctors: () => void;
    currencySymbol: string;
    appointments: Appointment[];
    setAppointments: Dispatch<SetStateAction<Appointment[]>>;
    removeAppointment: (index: number) => void;
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<
    AppContextValue | undefined>(undefined)


const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const currencySymbol = '$';
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorsLoading, setDoctorsLoading] = useState(true);
    const [doctorsError, setDoctorsError] = useState("");
    const [doctorsVersion, setDoctorsVersion] = useState(0);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

    const reloadDoctors = useCallback(() => {
        setDoctorsVersion((version) => version + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let active = true;

        setDoctorsLoading(true);
        setDoctorsError("");

        fetchDoctors(controller.signal)
            .then((data) => {
                if (active) {
                    setDoctors(data);
                }
            })
            .catch(() => {
                if (!active) return;

                setDoctors([]);
                setDoctorsError(
                    "Could not load doctors. Please try again."
                );
            })
            .finally(() => {
                if (active) {
                    setDoctorsLoading(false);
                }
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [doctorsVersion]);

    const removeAppointment = (index: number) => {
        setAppointments((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <AppContext.Provider value={{
            doctors, doctorsLoading,
            doctorsError,
            reloadDoctors, currencySymbol, appointments, setAppointments, removeAppointment, token, setToken
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
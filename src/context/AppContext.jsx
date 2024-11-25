import { createContext, useState } from "react";
import { doctors } from "../assets/data";

export const AppContext = createContext()

const AppContextProvider = (props) => {

        const currencySymbol = '$';
        const [appointments, setAppointments] = useState([]);

        const removeAppointment = (index) => {
            setAppointments((prev) => prev.filter((_, i) => i !== index));
        };

    const value = {
        doctors,
        currencySymbol,
        appointments,
        setAppointments,
        removeAppointment
    }

   

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
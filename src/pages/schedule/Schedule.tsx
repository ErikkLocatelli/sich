import { useContext } from "react"

import { userContext } from "../../services/userContext"
import useHead from "../../hooks/useHead"

import ScheduleCustomer from "./ScheduleCustomer"
import ScheduleProvider from "./ScheduleProvider"

const Schedule = () => {
    useHead("Agenda")
    const { data } = useContext(userContext)
    const { userType } = data || {}

    if(!data) return null

    if (userType === "CUSTOMER") {
        return <ScheduleCustomer />
    } else {
        return <ScheduleProvider />
    }
}

export default Schedule

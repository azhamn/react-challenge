import React, { useEffect, useState } from "react"
import moment from "moment"
import Table from "./Table";

function LeaseDetailView(props) {

    const [lease, setLease] = useState([])
    const { start_date, end_date, rent, frequency, payment_day } = lease
    const DAYS = { "SUNDAY": 0, "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6 }
    const FREQUENCY = { MONTHLY: 28, WEEKLY: 7, FORTNIGHTLY: 14 }

    useEffect(() => {
        if (props.leaseId) {
            fetch("https://hiring-task-api.herokuapp.com/v1/leases/" + props.leaseId)
                .then(response => response.json())
                .then(responseData => setLease(responseData))
            console.log("Loaded lease details for lease-id: " + props.leaseId)
        }
    }, [props.leaseId])

    /**
     * Generates the payment schedule as per the required format based on the provided parameters
     * @param {string} startDate 
     * @param {string} endDate 
     * @param {int paymentDay 
     * @param {int} frequency 
     * @param {int} rent 
     */
    function generatetPaymentSchedule(startDate, endDate, paymentDay, frequency, rent) {
        let paymentSchedule = []
        let from = moment(startDate)
        endDate = moment(endDate)

        let to = from.clone()
        to = to.day() <= (paymentDay - 1) ? to.day(paymentDay - 1) : to.add(1, 'week').day(paymentDay - 1)

        paymentSchedule.push({
            "From": from.format("MMMM, Do YYYY"),
            "To": to.format("MMMM, Do YYYY"),
            "days": to.diff(from, 'days') + 1,
            "Amount": "$" + Math.round((to.diff(from, 'days') + 1) * rent / 7 * 10) / 10
        })

        while (to.clone().add(frequency, 'day') < endDate) {
            from = to.clone().add(1, 'day')
            to.add(frequency, 'day')

            paymentSchedule.push({
                "From": from.format("MMMM, Do YYYY"),
                "To": to.format("MMMM, Do YYYY"),
                "days": to.diff(from, 'days') + 1,
                "Amount": "$" + Math.round((to.diff(from, 'days') + 1) * rent / 7 * 10) / 10
            })
        }

        from = to.clone().add(1, 'day')
        to = endDate

        paymentSchedule.push({
            "From": from.format("MMMM, Do YYYY"),
            "To": to.format("MMMM, Do YYYY"),
            "days": to.diff(from, 'days') + 1,
            "Amount": "$" + Math.round((to.diff(from, 'days') + 1) * rent / 7 * 10) / 10
        })

        //uncomment to see populated payment schedule array
        //console.log(paymentSchedule)

        return paymentSchedule
    }

    let data = []

    if (lease.length !== 0) {
        data = generatetPaymentSchedule(start_date, end_date, DAYS[payment_day.toUpperCase()], FREQUENCY[frequency.toUpperCase()], rent)
    }

    //uncomment to mock data from example
    //data = generatetPaymentSchedule("2018-08-09", "2018-12-28", DAYS.TUESDAY, FREQUENCY.FORTNIGHTLY, 510)
    return (
        <>
            <h1>Lease Details</h1>
            <Table content={data} />
            <button onClick={props.onCloseClick}>Close</button>
        </>)

}

export default LeaseDetailView
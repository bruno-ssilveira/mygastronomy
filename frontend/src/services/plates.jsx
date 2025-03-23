import { useState } from "react"

export default function platesServices() {
    const [platesLoading, setPlatesLoading] = useState(false)
    const [refetchPlates, setRefetchPlates] = useState(true)
    const [platesList, setPlatesList] = useState([])

    const url = 'https://mygastronomy-6gwt.onrender.com/plates'

    const getAvailablePlates = (userId) => {
        setPlatesLoading(true)

        fetch(`${url}/availables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success) {
                setPlatesList(result.body)
            } else {
                console.log(result)
            }
        })
        .catch((error) => {

        })
        .finally(() => {
            setPlatesLoading(false)
            setRefetchPlates(false)
        })
    }

    return { getAvailablePlates, platesLoading, refetchPlates, platesList }
}

import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = <T,>(url: string) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T |null>(null)
    const [error, setError] = useState<unknown>(null)
    

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:8000${url}`)
                setData(res.data)
                console.log(res.data)
                //setLoading(false)

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            }
            setLoading(false)
        }
        fetch()
    }, [url])

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000${url}`);
            setData(res.data);
            setLoading(false)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    return { loading, data, error, reFetch }

}

export default useFetch
import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:8000${url}`)
                setData(res.data)
            } catch (error: unknown) {
                setError(error)
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
        } catch (error) {
            setLoading(false)
        }
    }

    return { loading, data, error, reFetch }

}

export default useFetch
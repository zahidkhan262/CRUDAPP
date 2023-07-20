import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            (async function () {
                let response = await fetch(url)
                response = await response.json()
                setDatas(response)
                setLoading(false)
            })()

        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }, [url])

    return { datas, error, loading }
}

export default useFetch
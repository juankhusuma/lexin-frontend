import { useEffect, useState } from "react";
import { EndpointObject } from "./endpoint-base";
import { getCookie } from "cookies-next";


export default function useRequest<T>(endpoint : EndpointObject) : {
    data : T | undefined, 
    loading : boolean, 
    error : boolean,
    refetch : () => Promise<void>
} {
    const [data, setData] = useState<T | undefined>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    
    function isMethodAllowsBody() {
        return (
            endpoint.options?.method === "POST" || 
            endpoint.options?.method === "PUT" || 
            endpoint.options?.method === "PATCH"
        )
    }

    async function refetch() {
        setLoading(true)
        setError(false)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}${endpoint.url}`, {
                method: endpoint.options?.method,
                headers: {
                    'Authorization': endpoint.options?.requireAuth && getCookie('access_token')
                        ? `${getCookie('access_token')?.valueOf()}`
                        : '',
                    'Content-Type': 'application/json',
                },
                body: (isMethodAllowsBody() && endpoint.options?.body) ? JSON.stringify(endpoint.options.body) : undefined,
            })
            if (res.ok) {
                const asyncRes = res.json() as Promise<T>
                const data = await asyncRes
                setData(data)
            }
        } catch (err) {
            console.error("use request error: ", err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refetch()
    }, [endpoint])

    return { data, loading, error, refetch }
}
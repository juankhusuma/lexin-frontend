import { useEffect, useState } from "react";
import { EndpointObject } from "./endpoint-base";
import { getCookie } from "cookies-next";

interface UseRequestOptions<T> {
    onSuccess?: (data: T) => void
    onError?: () => void
    body?: {[a: string]: any}
    contentType?: 'application/json' | 'application/x-www-form-urlencoded'
}

export default function useRequest<T>(endpoint : EndpointObject, options?: UseRequestOptions<T>) : {
    data : T | undefined, 
    loading : boolean, 
    error : boolean,
    fetchCallback : () => Promise<T | undefined>
} {
    const [data, setData] = useState<T | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const getContentType = options?.contentType ?? 'application/json'
    const getBody = (getContentType === 'application/json') ? JSON.stringify(options?.body ?? {}) : new URLSearchParams(options?.body ?? {})

    function isMethodAllowsBody() {
        return (
            endpoint.options?.method === "POST" || 
            endpoint.options?.method === "PUT" || 
            endpoint.options?.method === "PATCH"
        )
    }

    async function fetchCallback() {
        setLoading(true)
        setError(false)
        try {
            const res = await fetch(endpoint.url, {
                method: endpoint.options?.method ?? "GET",
                headers: {
                    'Authorization': endpoint.options?.requireAuth && getCookie('access_token')
                        ? `${getCookie('access_token')?.valueOf()}`
                        : '',
                    'Content-Type': getContentType,
                },
                body: (isMethodAllowsBody() && options?.body) ? getBody : null,
            })
            if (res.ok) {
                const asyncRes = res.json() as Promise<T>
                const data = await asyncRes
                setData(data)
                options?.onSuccess && options.onSuccess(data)
                return data
            } else {
                throw new Error(`Failed to make a request to ${endpoint.url}`)
            }
        } catch (err) {
            console.error("use request error: ", err)
            setError(true)
            options?.onError && options.onError()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAutoFetch = endpoint.options?.autoFetch ?? true 
        
        if (getAutoFetch) {
            fetchCallback()
        }
    }, [])

    return { data, loading, error, fetchCallback }
}

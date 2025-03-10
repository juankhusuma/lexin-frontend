import { useEffect, useState } from "react";
import { EndpointObject } from "./endpoint-base";
import { getCookie } from "cookies-next";

function encodeKeyOrValue(value: any) {
    return encodeURIComponent(value).replace(/ /g, '%20'); // Replace spaces with '+' for better URL compatibility
}
  

function buildQueryString(params : {[k: string] : any}) {
    if (!params || typeof params !== 'object') {
      throw new Error("Input must be an object");
    }
  
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null) // Exclude undefined or null values
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // Convert arrays into multiple key=value pairs
          return value.map(item => `${encodeKeyOrValue(key)}=${encodeKeyOrValue(item)}`).join('&');
        }
        return `${encodeKeyOrValue(key)}=${encodeKeyOrValue(value)}`;
      })
      .join('&');
  
    return queryString ? `?${queryString}` : '';
  }
  

interface UseRequestOptions<T> {
    onSuccess?: (data: T) => void
    onError?: () => void
    body?: {[a: string]: any}
    contentType?: 'application/json' | 'application/x-www-form-urlencoded'
    params?: {[key: string] : any}
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

    const paramStr = options?.params ? buildQueryString(options.params) : ""

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
            const res = await fetch(`${endpoint.url}${paramStr}`, {
                method: endpoint.options?.method ?? "GET",
                headers: {
                    'Authorization': getCookie('access_token') ? `${getCookie('access_token')?.valueOf()}` : '',
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

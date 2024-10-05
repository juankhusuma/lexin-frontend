interface EndpointOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" // request method, "GET" by default
    requireAuth?: boolean // if true, use authorization header
    body?: {[key: string] : any} // method body for post put etc
    autoFetch?: boolean // true by default, if true => auto fetch when useRequest object is called
}

export interface EndpointObject {
    url: string
    options?: EndpointOptions
}


export function createEndpoint(
    url: string, 
    options?: EndpointOptions
) : EndpointObject {

    const returnUrlString = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}${url}`

    return {
        url: returnUrlString,
        options
    }
}
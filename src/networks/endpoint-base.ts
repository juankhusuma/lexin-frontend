interface EndpointOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"
    requireAuth?: boolean
    body?: {[key: string] : any}
}

export interface EndpointObject {
    url: string
    options?: EndpointOptions
}


export function createEndpoint(
    url: string, 
    options?: EndpointOptions
) : EndpointObject {

    const returnUrlString = `${process.env.NEXT_PUBLIC_GATEWAY_URL}${url}`

    return {
        url: returnUrlString,
        options
    }
}
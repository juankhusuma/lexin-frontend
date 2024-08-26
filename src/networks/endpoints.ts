import { createEndpoint } from "./endpoint-base";

const AUTH_ENDPOINTS = {
    GET: {
        checkToken: createEndpoint(`/api/v1/auth`, { method: 'GET', requireAuth: true }),
    },
    POST: {
        login: (username: string, password: string) => createEndpoint(
            `/api/v1/auth/token`, 
            { method:'POST', body: { username, password } }
        )
    }
}

const LAW_DOCUMENT_ENDPOINTS = {
    GET: {
        getLawDocumentByIdEndpoint: (lawId : any) => createEndpoint(`/api/v1/law-document/${lawId}`),
    }
}

export default { AUTH_ENDPOINTS, LAW_DOCUMENT_ENDPOINTS } 
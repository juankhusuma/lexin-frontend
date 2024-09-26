import { createEndpoint } from "./endpoint-base";

const AUTH_ENDPOINTS = {
    GET: {
        checkToken: createEndpoint(`/api/v1/user/me`, { requireAuth: true }),
    },
    POST: {
        login: (username: string, password: string) => createEndpoint(
            `/api/v1/user/token`, 
            { method:'POST', body: { username, password } },
        ),
        register: (email: string, fullname: string, password: string) => createEndpoint(
            `/api/v1/user/register`,
            { method: 'POST', body: {email, fullname, password}}
        ),
    }
}

const LEGAL_DOCUMENT_ENDPOINTS = {
    GET: {
        getLawDocumentById: (lawId : any) => createEndpoint(`/api/v1/legal-document/detail-full/${lawId}`),
        searchLegalDocument: (query : string) => createEndpoint(`/api/v1/legal-document/search?query=${encodeURIComponent(query)}`)
    }
}

const MISC_ENDPOINTS = {
    GET: {
        healthCheck: createEndpoint(`/api/v1/health-check`)
    }
}

export { AUTH_ENDPOINTS, LEGAL_DOCUMENT_ENDPOINTS, MISC_ENDPOINTS } 
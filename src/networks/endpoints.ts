import { createEndpoint } from "./endpoint-base";

const AUTH_ENDPOINTS = {
    GET: {
        checkToken: createEndpoint(`/api/v1/user/me`, { requireAuth: true }),
    },
    POST: {
        login:  createEndpoint(
            `/api/v1/user/token`, 
            { 
                method: 'POST', 
                autoFetch: false 
            },
        ),
        register:  createEndpoint(
            `/api/v1/user/register`,
            { 
                method: 'POST', 
                autoFetch: false 
            }
        ),
    }
}

const LEGAL_DOCUMENT_ENDPOINTS = {
    GET: {
        getLawDocumentById: (lawId : any) => createEndpoint(`/api/v1/legal-document/detail/${lawId}`),
        searchLegalDocument: (query : string) => createEndpoint(`/api/v1/legal-document/search?query=${encodeURIComponent(query)}`),
        getLawDocumentContents: (lawId : any) => createEndpoint(`/api/v1/legal-document/detail-content/${lawId}`, {
            method: 'GET',
            autoFetch: false
        })
    }
}

const MISC_ENDPOINTS = {
    GET: {
        healthCheck: createEndpoint(`/api/v1/health-check`)
    }
}

export { AUTH_ENDPOINTS, LEGAL_DOCUMENT_ENDPOINTS, MISC_ENDPOINTS } 
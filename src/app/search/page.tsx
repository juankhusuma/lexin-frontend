"use client"

import SearchFormPage from "@/components/search-page/SearchFormPage"
import SearchResultPage from "@/components/search-page/SearchResultPage"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import useRequest from "@/networks/useRequest"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function SearchPage() {

    const params = useSearchParams()
    const searchQuery = params.get('q')

    const {data} = useRequest<any>(LEGAL_DOCUMENT_ENDPOINTS.GET.searchLegalDocument(searchQuery as string))

    useEffect(() => {
        console.log("search results")
        console.log(data)
    }, [data])

    return (
        <div className="">
        {
            (searchQuery === null) 
            ? 
            <SearchFormPage /> 
            : 
            <SearchResultPage searchQuery={searchQuery}/>
        }
        </div>
    )
}
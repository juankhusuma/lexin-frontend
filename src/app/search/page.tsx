"use client"

import SearchFormPage from "@/components/search-page/SearchFormPage"
import SearchResultPage from "@/components/search-page/SearchResultPage"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function SearchPage() {

    const params = useSearchParams()
    const searchQuery = params.get('q')

    useEffect(() => {
        console.log("search query")
        console.log(searchQuery)
    }, [searchQuery])

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
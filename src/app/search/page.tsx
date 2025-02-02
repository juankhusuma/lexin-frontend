"use client"

import SearchFormPage from "@/components/search-page/SearchFormPage"
import SearchResultPage from "@/components/search-page/SearchResultPage"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, createContext } from "react"
import { SearchResult } from "@/components/search-page/DatabaseSearchResultSection"

interface SearchDocumentContextType {
    searchResults: SearchResult[]
    setSearchResults: (results: SearchResult[]) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

export const SearchDocumentContext = createContext<SearchDocumentContextType>({
    searchResults: [],
    setSearchResults: (results: SearchResult[]) => { },
    loading: true,
    setLoading: (loading: boolean) => { }
})

export default function SearchPage() {

    const params = useSearchParams()
    const searchQuery = params.get('q')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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
                    (<SearchDocumentContext.Provider value={{ searchResults, setSearchResults, loading, setLoading }}>
                        <SearchResultPage searchQuery={searchQuery} />
                    </SearchDocumentContext.Provider>)
            }
        </div>
    )
}
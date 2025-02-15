import { useState } from "react"
import { createContext } from "react"
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

export default function SearchDocumentProvider({ children }: { children: React.ReactNode }) {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <SearchDocumentContext.Provider value={{ searchResults, setSearchResults, loading, setLoading }}>
            {children}
        </SearchDocumentContext.Provider>
    )
}
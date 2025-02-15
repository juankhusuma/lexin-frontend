"use client"

import SearchFormPage from "@/components/search-page/SearchFormPage"
import SearchResultPage from "@/components/search-page/SearchResultPage"
import { useSearchParams } from "next/navigation"
import SearchDocumentProvider from "@/hoc/SearchDocumentProvider"


export default function SearchPage() {

    const params = useSearchParams()
    const searchQuery = params.get('q')

    return (
        <div className="">
            {
                (searchQuery === null)
                    ?
                    <SearchFormPage />
                    :
                    (<SearchDocumentProvider>
                        <SearchResultPage searchQuery={searchQuery} />
                    </SearchDocumentProvider>)
            }
        </div>
    )
}
"use client";


import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"
// import SearchResultResponseType, { SearchResult } from "@/networks/response-type/SearchResultResponseType"
import { Loader } from "@mantine/core"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import { useContext, useEffect, useState } from "react"
import { SearchDocumentContext } from "@/app/search/page";

export interface SearchResult {
    text:        string;
    page_number: number;
    doc_title:   string;
    source:      string;
    similiarity: number;
    metadata:    Metadata;
}

export interface Metadata {
    last_modified:             Date;
    type:                      string;
    initiator:                 string;
    number:                    string;
    year:                      number;
    about:                     string;
    place_of_establisment:     string;
    date_of_establishment:     null;
    official_of_establishment: string;
    doc_id:                    string;
    status:                    string;
    chunk_id:                  string;
}


export default function DatabaseSearchResultSection({ searchQuery } : { searchQuery: string }) {
    const { searchResults, setSearchResults, loading, setLoading } = useContext(SearchDocumentContext)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: searchQuery, history: [] })
        }).then(response => response.json())
        .then((response: SearchResult[]) => {
            setSearchResults(response)
            setLoading(false)
        })
    }, [])


    const toLocaleDate = (date: Date | null) => {
        if (!date) return 'Tidak diketahui'
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="flex flex-col gap-5">
            <ResultCount count={searchResults.length} />
            {loading ? <Loader /> : (searchResults ?? []).map(result => (
                <SearchResultCard 
                    key={result.metadata.doc_id}
                    number={result.metadata.number}
                    year={result.metadata.year}
                    id={result.metadata.doc_id}
                    title={result.doc_title}
                    subtitle={result.metadata.about}
                    description={result.metadata.initiator}
                    releaseDate={toLocaleDate(result.metadata.date_of_establishment)}
                    type={result.metadata.type}
                    status={result.metadata.status}
                />
            ))}
        </div>

    )
}
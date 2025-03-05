"use client";


import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"
// import SearchResultResponseType, { SearchResult } from "@/networks/response-type/SearchResultResponseType"
import { Loader } from "@mantine/core"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import { createContext, useContext, useEffect, useState } from "react"
import { SearchDocumentContext } from "@/hoc/SearchDocumentProvider";

export interface SearchResult {
    document_id:                           string;
    title:                                 string;
    jenis_bentuk_peraturan:                string;
    pemrakarsa:                            string;
    nomor:                                 string;
    tahun:                                 number;
    tentang:                               string;
    tempat_penetapan:                      string;
    ditetapkan_tanggal:                    string | null;
    pejabat_yang_menetapkan:               string;
    status:                                string;
    url:                                   string;
    dasar_hukum:                           DocRef[] | null;
    mengubah:                              DocRef[] | null;
    diubah_oleh:                           DocRef[] | null;
    mencabut:                              DocRef[] | null;
    dicabut_oleh:                          DocRef[] | null;
    melaksanakan_amanat_peraturan:         DocRef[] | null;
    dilaksanakan_oleh_peraturan_pelaksana: DocRef[] | null;
    page_number:                           number;
    combined_body:                         string;
}

export interface DocRef {
    ref:  null | string;
    url:  null | string;
    text: string;
}



export default function DatabaseSearchResultSection({ searchQuery } : { searchQuery: string }) {
    const { searchResults, setSearchResults, loading, setLoading, setStatus } = useContext(SearchDocumentContext)

      useEffect(() => {
        
      }, [])

    const toLocaleDate = (date: string | null) => {
        if (!date) return 'Tidak diketahui'
        return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="flex flex-col gap-5">
            <ResultCount count={searchResults.length} />
            {loading ? <Loader /> : (searchResults ?? []).map(result => (
                <SearchResultCard 
                    key={result.document_id}
                    number={result.nomor}
                    year={result.tahun}
                    id={result.document_id}
                    title={result.title}
                    subtitle={result.pemrakarsa}
                    description={result.pejabat_yang_menetapkan}
                    releaseDate={toLocaleDate(result.ditetapkan_tanggal!)}
                    type={result.jenis_bentuk_peraturan}
                    status={result.status}
                />
            ))}
        </div>

    )
}
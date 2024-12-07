import EXAMPLE_SEARCH_RESULTS from "@/constants/exampleSearchResults"
import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"
import SearchResultResponseType, { SearchResult } from "@/networks/response-type/SearchResultResponseType"
import { Loader, Select } from "@mantine/core"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import { useEffect, useState } from "react"
import LegalDocumentFilters from "./LegalDocumentFilters"


type FilterMapType = {[key: string]: number}

export default function DatabaseSearchResultSection({ searchQuery } : { searchQuery: string }) {

    const [docTypeValue, setDocTypeValue] = useState<string[]>([])
    const [statusValue, setStatusValue] = useState<string>('')

    const [sortBy, setSortBy] = useState<string>("RELEVANCE")

    const [filtersDocTypeCountMap, setFiltersDocTypeCountMap] = useState<FilterMapType>({})
    const [filtersStatusCountMap, setFiltersStatusCountMap] = useState<FilterMapType>({})

    useEffect(() => {   
        console.log("doc type")
        console.log(filtersDocTypeCountMap)

        console.log("status")
        console.log(filtersStatusCountMap)

    }, [filtersDocTypeCountMap, filtersStatusCountMap])

    useEffect(() => {
        console.log("doc type value")
        console.log(docTypeValue)

        console.log("status value")
        console.log(statusValue)
        
    }, [docTypeValue, statusValue])

    const { data, loading, fetchCallback } = useRequest<SearchResultResponseType>(
        LEGAL_DOCUMENT_ENDPOINTS.GET.searchLegalDocument(searchQuery as string),
        {
            params: {
                jenis_bentuk_peraturan: docTypeValue,
                status: statusValue,
                sort: (sortBy === "NEWEST") ? "tahun" : ""
            },

            onSuccess(data) {
                
                if ((docTypeValue.length === 0) && (statusValue === "")) {
                    const newFiltersDocTypeCountMap : FilterMapType = {}
                    const newFiltersStatusCountMap : FilterMapType = {}
    
                    for (const bucket of data?.aggregations.jenis_bentuk_peraturan_uniques.buckets) {
                        newFiltersDocTypeCountMap[bucket.key] = bucket.doc_count
                    }
                    for (const bucket of data?.aggregations.status_uniques.buckets) {
                        newFiltersStatusCountMap[bucket.key] = bucket.doc_count
                    }
                    setFiltersDocTypeCountMap(newFiltersDocTypeCountMap)
                    setFiltersStatusCountMap(newFiltersStatusCountMap)
                }

            },
        }
    )

    useEffect(() => {
        fetchCallback()
    }, [docTypeValue, statusValue, sortBy])

    const COUNT_RESULT = data?.total_hits ?? 0
    const SORT_BY_FILTERS = [
        {
            label: "Terbaru",
            value: "NEWEST"
        },
        {
            label: "Relevansi",
            value: "RELEVANCE"
        }
    ]

    return (
        // data?.aggregations?.jenis_bentuk_peraturan_uniques
        <div className="flex flex-row items-start">
            <LegalDocumentFilters
                filtersDocTypeCountMap={filtersDocTypeCountMap}
                filtersStatusCountMap={filtersStatusCountMap}
                // docTypeFiltersList={data?.aggregations.jenis_bentuk_peraturan_uniques.buckets}
                // statusFiltersList={data?.aggregations.status_uniques.buckets}
                setDocTypeValue={setDocTypeValue}
                setStatusValue={setStatusValue}
                disabled={loading}
            />
            <div className="flex flex-col">
                <ResultCount count={COUNT_RESULT} />
                <div className="flex flex-row justify-end">
                    <Select 
                        size="xs"
                        data={SORT_BY_FILTERS}
                        className="mt-8 mr-4"
                        value={sortBy}
                        onChange={e => setSortBy(e ? e : "RELEVANCE")}
                    />
                </div>
                {loading ? <Loader /> : (data?.hits ?? []).map(result => (
                    <SearchResultCard 
                        key={result._id}
                        id={result._id}
                        title={result._source.title}
                        subtitle={result._source.tentang}
                        description={result._source.pemrakarsa}
                        releaseDate={result._source.ditetapkan_tanggal}
                        type={result._source.jenis_bentuk_peraturan}
                        status={result._source.status}
                    />
                ))}
            </div>
        </div>

    )
}
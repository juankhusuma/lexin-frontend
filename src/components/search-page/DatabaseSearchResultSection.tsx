import EXAMPLE_SEARCH_RESULTS from "@/constants/exampleSearchResults"
import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"
import SearchResultResponseType, { SearchResult } from "@/networks/response-type/SearchResultResponseType"
import { Loader } from "@mantine/core"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"

export default function DatabaseSearchResultSection({ searchQuery } : { searchQuery: string }) {

    const { data, loading } = useRequest<SearchResultResponseType>(LEGAL_DOCUMENT_ENDPOINTS.GET.searchLegalDocument(searchQuery as string))

    const COUNT_RESULT = data?.total_hits ?? 0

    return (
        <div className="flex flex-col">
            <ResultCount count={COUNT_RESULT} />
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
    )
}
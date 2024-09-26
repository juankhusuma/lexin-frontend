import EXAMPLE_SEARCH_RESULTS from "@/constants/exampleSearchResults"
import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"
import { SearchResult } from "@/networks/response-type/SearchResultResponseType"

interface DatabaseSearchResultSectionProps {
    searchResults?: SearchResult[]
}
export default function DatabaseSearchResultSection({ searchResults = [] } : DatabaseSearchResultSectionProps) {

    const COUNT_RESULT = 10
    return (
        <div className="flex flex-col">
            <ResultCount count={COUNT_RESULT} />
            {(searchResults ?? []).map(result => (
                <SearchResultCard 
                    key={result._id}
                    id={result._id}
                    title={result._source.title}
                    subtitle={result._source.tentang}
                    description={result._source.pemrakarsa}
                    releaseDate={result._source.ditetapkan_tanggal}
                    type={result._source.status}
                />
            ))}
        </div>
    )
}
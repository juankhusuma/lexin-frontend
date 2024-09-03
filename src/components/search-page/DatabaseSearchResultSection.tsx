import EXAMPLE_SEARCH_RESULTS from "@/constants/exampleSearchResults"
import SearchResultCard from "./SearchResultCard"
import ResultCount from "./ResultCount"

export default function DatabaseSearchResultSection() {

    const COUNT_RESULT = 10
    return (
        <div className="flex flex-col">
            <ResultCount count={COUNT_RESULT} />
            {EXAMPLE_SEARCH_RESULTS.map(result => (
                <SearchResultCard 
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    subtitle={result.subtitle}
                    description={result.description}
                    releaseDate={result.release_date}
                    enactedDate={result.enacted_date}
                    type={result.type}
                />
            ))}
        </div>
    )
}
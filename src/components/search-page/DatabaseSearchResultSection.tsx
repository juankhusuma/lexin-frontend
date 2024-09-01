import EXAMPLE_SEARCH_RESULTS from "@/constants/exampleSearchResults"
import SearchResultCard from "./SearchResultCard"

export default function DatabaseSearchResultSection() {

    return (
        <div>
            {EXAMPLE_SEARCH_RESULTS.map(result => (
                <SearchResultCard 
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
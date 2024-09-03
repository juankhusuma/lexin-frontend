import { useEffect } from "react"
import AIAnswerSection from "./AIAnswerSection"
import DatabaseSearchResultSection from "./DatabaseSearchResultSection"

interface SearchResultPageProps {
    searchQuery: string
}
export default function SearchResultPage({searchQuery} : SearchResultPageProps) {

    useEffect(() => {
        console.log(searchQuery)
    }, [searchQuery])

    return (
        <div>
            <AIAnswerSection />
            <DatabaseSearchResultSection />
        </div>
    )    
}
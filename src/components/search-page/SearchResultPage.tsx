import { useContext } from "react"
import AIAnswerSection from "./AIAnswerSection"
import DatabaseSearchResultSection from "./DatabaseSearchResultSection"
import { Divider } from "@mantine/core"
import { SearchDocumentContext } from "@/app/search/page"

interface SearchResultPageProps {
    searchQuery: string
}
export default function SearchResultPage({searchQuery} : SearchResultPageProps) { 
    const { searchResults } = useContext(SearchDocumentContext)
    return (
        <div>
            <AIAnswerSection searchQuery={searchQuery} relatedDocs={searchResults} />
            <DatabaseSearchResultSection searchQuery={searchQuery}/>
        </div>
    )    
}
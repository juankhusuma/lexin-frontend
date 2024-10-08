import AIAnswerSection from "./AIAnswerSection"
import DatabaseSearchResultSection from "./DatabaseSearchResultSection"
import { Divider } from "@mantine/core"

interface SearchResultPageProps {
    searchQuery: string
}
export default function SearchResultPage({searchQuery} : SearchResultPageProps) { 
    return (
        <div>
            <AIAnswerSection searchQuery={searchQuery} />
            <DatabaseSearchResultSection searchQuery={searchQuery}/>
        </div>
    )    
}
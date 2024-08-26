import { useEffect } from "react"

interface SearchResultPageProps {
    searchQuery: string
}
export default function SearchResultPage({searchQuery} : SearchResultPageProps) {
    useEffect(() => {
        
    }, [searchQuery])

    return (
        <div>

        </div>
    )    
}
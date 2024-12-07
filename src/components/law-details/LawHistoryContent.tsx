import LawDocumentLinkType from "@/types/LawDocumentLinkType"
import LawHistoryLinkType from "@/types/LawHistoryLinkType"
import Link from "next/link"

interface HistoryCardProps {
    documentId: string
    historyType: string
    title: string
    description: string
}
function HistoryCard({
    documentId,
    historyType,
    title,
    description
}: HistoryCardProps) {
    return (
        <article className="flex flex-col items-start mb-8">
            <div className="mb-2 text-sm text-bright-blue font-semibold rounded-lg bg-light-gray py-1 pl-3 pr-1 border-l-4 border-solid border-bright-blue">
                {historyType}
            </div>
            <Link 
                href={`/legal-doc/${documentId}`} 
                className="text-dark-navy-blue font-bold text-lg mb-1"
            >
                {title}
            </Link>
            <div className="text-sm text-darkGrayText">
                {description}
            </div>
        </article>
    )
} 

interface LawHistoryContentProps {
    histories?: LawHistoryLinkType[]
}
export default function LawHistoryContent({histories = []} : LawHistoryContentProps) {
    return (
        <div className="">
            <div className="pl-8 pt-10">
                {histories.map(h => (
                    <HistoryCard 
                        documentId={h.id}
                        historyType={h.historyType}
                        title={h.title}
                        description={''}
                    />
                ))}
            </div>
        </div>
    )
}
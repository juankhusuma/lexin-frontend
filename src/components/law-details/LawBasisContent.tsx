import LawDocumentLinkType from "@/types/LawDocumentLinkType"
import Link from "next/link"

interface BasisCardProps {
    no: number
    documentId: string
    title: string
    description: string
} 
function BasisCard({
    no,
    documentId,
    title,
    description,
}: BasisCardProps) {
    return (
        <article className="flex flex-row items-start mb-10">
            <div className='text-white bg-dark-navy-blue rounded-full w-8 h-8 flex justify-center items-center'>
                {no}
            </div>
            <div className="flex flex-col ml-2 translate-y-1">
                <Link 
                    href={`/legal-docs/${documentId}`} 
                    className="text-dark-navy-blue font-bold text-lg mb-1"
                >
                    {title}
                </Link>

                <div className="text-sm text-darkGrayText">
                    {description}
                </div>

            </div>

        </article>
    )
} 

interface LawBasisContentProps {
    bases: LawDocumentLinkType[]
}
export default function LawBasisContent({bases} : LawBasisContentProps) {
    return (
        <div className="pl-8 pt-8">
            {bases.map((b, idx) => (
                <BasisCard 
                    no={idx+1}
                    documentId={b.id}
                    title={b.title}
                    description=""
                />
            ))}
        </div>
    )
}
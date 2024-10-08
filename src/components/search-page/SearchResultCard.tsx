import { LawTypeBadge } from "../law-type-badges"
import { LawStatusBadge } from "../law-status-badges"
import formatDate from "@/app/utils/formatDate"

interface SearchResultCardProps {
    id: string,
    title: string,
    subtitle: string,
    description: string,
    releaseDate: string
    type: string,
    status?: string
}
export default function SearchResultCard({id, title, subtitle, description, releaseDate, type, status}: SearchResultCardProps) {
    
    return (
        <div className="my-7 mx-3">
            <a href={`/legal-doc/${id}`} className="text-lg text-dark-navy-blue font-bold">
                {title}
            </a>
            <h3 className="">
                {subtitle}
            </h3>
            <p className="text-[#4C4D53]">
                {description}
            </p>
            <div className="text-sm flex flex-row items-center">
                <LawTypeBadge lawType={type} />
                <LawStatusBadge status={status ?? "Berlaku"} />
                <div className="flex flex-row mx-1">
                    <div>
                        Ditetapkan:
                    </div>
                    <div className="ml-1 text-dark-navy-blue font-semibold">
                        {releaseDate}
                    </div>
                </div>
            </div>
        </div>
    )
}
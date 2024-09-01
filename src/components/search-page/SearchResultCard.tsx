import { LawTypeBadge } from "../law-type-badges"
import { LawStatusBadge } from "../law-status-badges"
import formatDate from "@/app/utils/formatDate"

interface SearchResultCardProps {
    title: string,
    subtitle: string,
    description: string,
    releaseDate: Date,
    enactedDate: Date,
    type: string,
    status?: "no-change" | "changed" | "no-effect"
}
export default function SearchResultCard({title, subtitle, description, releaseDate, enactedDate, type, status}: SearchResultCardProps) {
    
    return (
        <div className="my-7 mx-3">
            <a href="" className="text-lg text-dark-navy-blue font-bold">
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
                <LawStatusBadge status={status ?? "no-change"} />
                <div className="flex flex-row mx-1">
                    <div>
                        Ditetapkan:
                    </div>
                    <div className="ml-1 text-dark-navy-blue font-semibold">
                        {formatDate(releaseDate)}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        Diberlakukan:
                    </div>
                    <div className="ml-2 text-dark-navy-blue font-semibold">
                        {formatDate(enactedDate)}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
import { LawTypeBadge } from "../law-type-badges"
import { LawStatusBadge } from "../law-status-badges"
import Link from "next/link"

interface SearchResultCardProps {
    id: string,
    title: string,
    subtitle: string,
    description: string,
    releaseDate: string
    type: string,
    status?: string,
    number: string,
    year: number
}
export default function SearchResultCard({id, title, subtitle, description, releaseDate, type, status, number, year}: SearchResultCardProps) {
    
    return (
        <div className="py-7 px-5 rounded-md shadow-sm border">
            <Link href={`/legal-doc/${type.toLocaleLowerCase()}-nomor-${number}-tahun-${year}`} className="text-lg text-dark-navy-blue font-bold">
                {title}
            </Link>
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
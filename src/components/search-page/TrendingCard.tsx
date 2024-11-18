import { useRouter } from "next/navigation"

interface TrendingCardProps {
    label: string
}
export default function TrendingCard({label} : TrendingCardProps) {

    const r = useRouter()

    return (
        <div 
            className="bg-light-blue p-3 rounded-2xl cursor-pointer" 
            onClick={() => r.push(`/search?q=${encodeURIComponent(label)}`)}
        >
            <div className="flex items-center">
                <img src="/chart-line-up.svg" width={20}/>
                <span className="ml-2 translate-y-[-2px]">
                    {label}
                </span>
            </div>
        </div>
    )
}
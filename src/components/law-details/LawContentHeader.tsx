import { LawDetailMetadataType } from "@/types/LawDetailType"
import { ChangedBadge, NoChangesBadge, NoEffectBadge } from "../law-status-badges"

interface LawContentHeaderProps {
    activeTab: string
    metadata: LawDetailMetadataType
}
export default function LawContentHeader({activeTab, metadata} : LawContentHeaderProps) {
    return (
        <div className="h-fit w-full bg-light-blue -mt-8 flex flex-col items-center pt-4 pb-10 z-20">
            <span className="font-bold text-xl text-center">
                {metadata.title}
            </span>
            <span className="font-semibold text-lg mt-2 text-center">
                {activeTab === "history" ?
                <p>
                    Perubahan atas <span className="underline">{metadata.title}</span>{' '}{metadata.subtitle}
                </p> 
                :
                <p>
                    {metadata.subtitle}
                </p> 
                }
            </span>
            <span className="my-4">
                {metadata.change_status === 'no-change' && <NoChangesBadge />}
                {metadata.change_status === 'changed' && <ChangedBadge /> }
                {metadata.change_status === 'no-effect' && <NoEffectBadge />}
            </span>
            <div className="flex flex-row text-sm">
                <span className="mr-1">
                    Ditetapkan: 
                </span>
                <span className="font-bold text-dark-navy-blue">
                    {metadata.enacted_date ?? "-"}
                </span>
            </div>
        </div>
    )
}
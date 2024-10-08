import { LawDetailMetadataType } from "@/types/LawDetailType"
import { NoChangesBadge, NoEffectBadge } from "../law-status-badges"
import { Icon } from "@iconify/react/dist/iconify.js"

interface LawContentHeaderProps {
    activeTab: string
    metadata: LawDetailMetadataType
}
export default function LawContentHeader({activeTab, metadata} : LawContentHeaderProps) {
    return (
        <div className="h-fit w-full bg-light-blue -mt-8 flex flex-col items-center px-16 pt-4 pb-10 z-20">
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
                {metadata.change_status === 'Berlaku' && <NoChangesBadge />}
                {metadata.change_status === 'Tidak Berlaku' && <NoEffectBadge />}
                {/* {metadata.change_status === 'changed' && <ChangedBadge /> } */}
            </span>
            <div className="flex flex-row text-sm">
                <span className="mr-1">
                    Berlaku: 
                </span>
                <span className="font-bold text-dark-navy-blue">
                    {metadata.enacted_date ?? "-"}
                </span>
            </div>
            <div className="mt-4 flex">
                <div className="cursor-pointer flex items-center mr-3">
                    <Icon icon="mdi:bookmark-outline" style={{fontSize: '25px'}}/>
                    <p className="font-semibold text-sm ml-1">
                        Simpan
                    </p>
                </div>
                <a 
                    target="_blank" 
                    href={`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}/api/v1/legal-document/download/${metadata.document_id}`} 
                    className="cursor-pointer flex items-center ml-3"
                >
                    <Icon icon="mdi:download-box" style={{ fontSize: '25px' }} />
                    <p className="font-semibold text-sm ml-1">
                        Unduh
                    </p>
                </a>
            </div>
        </div>
    )
}
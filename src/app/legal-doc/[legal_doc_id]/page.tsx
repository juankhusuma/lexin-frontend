"use client"

import { Sidebar } from "@/components/law-details/Sidebar"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { SidebarMenuType } from "@/components/law-details/Sidebar"
import LawDetailsContent from "@/components/law-details/LawDetailsContent"
import LawHistoryContent from "@/components/law-details/LawHistoryContent"
import LawContentHeader from "@/components/law-details/LawContentHeader"
import LawConsolidationContent from "@/components/law-details/LawConsolidationContent"
import LawBasisContent from "@/components/law-details/LawBasisContent"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import { DocumentFullDetailType } from "@/networks/response-type/DocumentFullDetailResponse"
import LawDocumentLinkType from "@/types/LawDocumentLinkType"
import LawHistoryLinkType from "@/types/LawHistoryLinkType"


export default function LawDetailPage() {
    const { legal_doc_id } = useParams()
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState<SidebarMenuType>('details')
    const { data } = useRequest<DocumentFullDetailType>(LEGAL_DOCUMENT_ENDPOINTS.GET.getLawDocumentById(legal_doc_id))

    useEffect(() => {
        if (searchParams.get('tab') === 'details') {
            setActiveTab('details')
        } else if (searchParams.get('tab') === 'consolidation') {
            setActiveTab('consolidation')
        } else if (searchParams.get('tab') === 'history') {
            setActiveTab('history')
        } else if (searchParams.get('tab') === 'law-basis') {
            setActiveTab('law-basis')
        } else {
            setActiveTab('details')
        }
    }, [searchParams])

    useEffect(() => {
        console.log("test data")
        console.log(data)
    }, [data])

    const histories = useMemo<LawHistoryLinkType[]>(() => {
        const result : LawHistoryLinkType[] = []

        if (data && data.dicabut_oleh) {
            for (const link of data.mencabut) {
                const newObject : LawHistoryLinkType = {
                    historyType: "Mencabut",
                    ...link
                }
                result.push(newObject)
            }
        }

        if (data && data.dicabut_oleh) {
            for (const link of data.dicabut_oleh) {
                const newObject : LawHistoryLinkType = {
                    historyType: "Dicabut oleh",
                    ...link
                }
                result.push(newObject)
            }
        }

        if (data && data.dicabut_oleh) {
            for (const link of data.mengubah) {
                const newObject : LawHistoryLinkType = {
                    historyType: "Mengubah",
                    ...link
                }
                result.push(newObject)
            }
        }

        if (data && data.dicabut_oleh) {
            for (const link of data.diubah_oleh) {
                const newObject : LawHistoryLinkType = {
                    historyType: "Diubah oleh",
                    ...link
                }
                result.push(newObject)
            }
        }

        return result

    }, [data])


    return (
        <div className="flex flex-row">
            <Sidebar tab={activeTab} setTab={setActiveTab} lawId={legal_doc_id as string} />
            <div className="w-4/5 flex flex-col translate-x-[20vw]">
                <LawContentHeader activeTab={activeTab} metadata={{
                    title: data?.title ?? '',
                    subtitle: data?.tentang ?? '',
                    enacted_date: data?.ditetapkan_tanggal ?? '',
                    change_status: data?.status ?? 'Berlaku',
                    document_id: legal_doc_id as string
                }}/>
                {activeTab === 'details' && <LawDetailsContent pdfLink={data?.resource_urls[0]} />}
                {activeTab === 'consolidation' && <LawConsolidationContent />}
                {activeTab === 'history' && <LawHistoryContent histories={histories} />}
                {activeTab === 'law-basis' && <LawBasisContent bases={data?.dasar_hukum ?? []} />}
            </div>
        </div>
    )
}
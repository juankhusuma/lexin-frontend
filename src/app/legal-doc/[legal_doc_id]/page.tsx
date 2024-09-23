"use client"

import { Sidebar } from "@/components/law-details/Sidebar"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarMenuType } from "@/components/law-details/Sidebar"
import LawDetailsContent from "@/components/law-details/LawDetailsContent"
import LawHistoryContent from "@/components/law-details/LawHistoryContent"
import LawContentHeader from "@/components/law-details/LawContentHeader"
import { LawDetailMetadataType, LawDetailType } from "@/types/LawDetailType"
import EXAMPLE_LAW_DETAIL from "@/constants/exampleLawDetail"
import LawConsolidationContent from "@/components/law-details/LawConsolidationContent"
import LawBasisContent from "@/components/law-details/LawBasisContent"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"

export default function LawDetailPage() {
    const { legal_doc_id } = useParams()
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState<SidebarMenuType>('details')
    const { data } = useRequest<any>(LEGAL_DOCUMENT_ENDPOINTS.GET.getLawDocumentById(legal_doc_id))

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

    const [lawDetails, _setLawDetails] = useState<LawDetailType | undefined>(EXAMPLE_LAW_DETAIL) 

    return (
        <div className="flex flex-row">
            <Sidebar tab={activeTab} setTab={setActiveTab} lawId={legal_doc_id as string} />
            <div className="w-4/5 flex flex-col">
                <LawContentHeader activeTab={activeTab} metadata={lawDetails?.metadata as LawDetailMetadataType}/>
                {activeTab === 'details' && <LawDetailsContent lawId={legal_doc_id as string} />}
                {activeTab === 'consolidation' && <LawConsolidationContent />}
                {activeTab === 'history' && <LawHistoryContent />}
                {activeTab === 'law-basis' && <LawBasisContent />}
            </div>
        </div>
    )
}
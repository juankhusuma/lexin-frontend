"use client"

import { Sidebar } from "@/components/law-details/Sidebar"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarMenuType } from "@/components/law-details/Sidebar"
import LawDetailsContent from "@/components/law-details/LawDetailsContent"

export default function LawDetailPage() {
    const { law_id } = useParams()
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState<SidebarMenuType>('details')

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

    return (
        <div className="flex flex-row">
            <Sidebar tab={activeTab} setTab={setActiveTab} lawId={law_id as string} />
            <div className="w-4/5">
                {activeTab === 'details' && <LawDetailsContent lawId={law_id as string} />}
            </div>
        </div>
    )
}
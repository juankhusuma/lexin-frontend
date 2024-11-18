"use client"

import { useEffect, useState } from "react"
import { LawDetailType } from "@/types/LawDetailType"
import { NoChangesBadge, ChangedBadge, NoEffectBadge } from "../law-status-badges"
import formatDate from "@/utils/formatDate"
import ContentNode from "./ContentNode"
import LawTextNodeType from "@/types/LawTextNodeType"
import { useParams, usePathname } from "next/navigation"
import useRequest from "@/networks/useRequest"
import { LEGAL_DOCUMENT_ENDPOINTS } from "@/networks/endpoints"
import DocumentContentsDetailResponseType from "@/networks/response-type/DocumentContentsDetailResponse"
import ReactLoading from "react-loading"
import { Box, Tabs } from "@mantine/core"
import { useInViewport } from '@mantine/hooks';
import classes from './tab.module.css'
import LawDetailParsedView from "./LawDetailParsedView"
import LawDetailPDFView from "./LawDetailPDFView"



export default function LawDetailsContent() {
    const { legal_doc_id } = useParams()

    const [pageToFetch, setPageToFetch] = useState<number>(1)

    const {ref, inViewport} = useInViewport()

    const [isLoadingMoreNodes, setIsLoadingMoreNodes] = useState<boolean>(false)
    const [allNodes, setAllNodes] = useState<LawTextNodeType[]>([])

    async function fetchMoreNodes() {
        setIsLoadingMoreNodes(true)
        const res = await fetch(`${LEGAL_DOCUMENT_ENDPOINTS.GET.getLawDocumentContents(legal_doc_id).url}?page_number=${pageToFetch}`)
        
        if (res.ok) {
            const data = await res.json() as DocumentContentsDetailResponseType
            setAllNodes(prev => {
                const newArray = prev.slice()
                for (const node of data) {
                    newArray.push(node)
                }
                return newArray
            })
            setPageToFetch(prev => prev + 1)
        }
        setIsLoadingMoreNodes(false)
    }

    useEffect(() => {
        
    }, [])
    

    useEffect(() => {
        if (inViewport && !isLoadingMoreNodes) {
            setIsLoadingMoreNodes(true)
            fetchMoreNodes()
        }
    }, [inViewport])


    const [tab, setTab] = useState<string | null>('pdf')

    return (
        <div className="flex flex-col py-7 px-20">
            <Tabs 
                // variant="none" 
                color="#192E59"
                value={tab} 
                onChange={setTab} 
            >
                <Tabs.List>
                    <Tabs.Tab value="pdf">
                        PDF View
                    </Tabs.Tab>
                    <Tabs.Tab value="parsed">
                        Parsed View
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pdf">
                    <LawDetailPDFView />
                </Tabs.Panel>
                <Tabs.Panel value="parsed">
                    <LawDetailParsedView />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}
"use client"

import EXAMPLE_LAW_DETAIL from "@/constants/exampleLawDetail"
import { useState } from "react"
import { LawDetailType } from "@/types/LawDetailType"
import { NoChangesBadge, ChangedBadge, NoEffectBadge } from "../law-status-badges"
import formatDate from "@/utils/formatDate"
import ContentNode from "./ContentNode"


export default function LawDetailsContent({lawId} : {lawId : number | string}) {

    const [lawDetails, _setLawDetails] = useState<LawDetailType | undefined>(EXAMPLE_LAW_DETAIL) 

    return (
        <div className="h-screen">
            <div className="h-1/4 w-full bg-light-blue -mt-8 flex flex-col items-center pt-4 pb-10">
                <span className="font-bold text-xl">
                    {lawDetails?.metadata.title}
                </span>
                <span className="font-semibold text-lg mt-2">
                    {lawDetails?.metadata.subtitle}
                </span>
                <span className="my-4">
                    {lawDetails?.metadata.change_status === 'no-change' && <NoChangesBadge />}
                    {lawDetails?.metadata.change_status === 'changed' && <ChangedBadge /> }
                    {lawDetails?.metadata.change_status === 'no-effect' && <NoEffectBadge />}
                </span>
                <div className="flex flex-row text-sm">
                    <span className="mr-1 font-semibold">
                        Ditetapkan: 
                    </span>
                    <span className="font-bold text-dark-navy-blue">
                        {lawDetails && formatDate(lawDetails.metadata.enacted_date)}
                    </span>
                </div>
            </div>
            <div className="h-3/4 flex flex-col py-7 px-20 overflow-y-scroll overflow-hidden">
                {lawDetails?.content.map((node) => (
                    <ContentNode node={node} />
                ))}
            </div>
        </div>
    )
}
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
        <div className="h-2/3 flex flex-col py-7 px-20 overflow-y-scroll">
            {lawDetails?.content.map((node) => (
                <ContentNode node={node} />
            ))}
        </div>
    )
}
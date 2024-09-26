"use client"

import EXAMPLE_LAW_DETAIL from "@/constants/exampleLawDetail"
import { useState } from "react"
import { LawDetailType } from "@/types/LawDetailType"
import { NoChangesBadge, ChangedBadge, NoEffectBadge } from "../law-status-badges"
import formatDate from "@/utils/formatDate"
import ContentNode from "./ContentNode"
import LawTextNodeType from "@/types/LawTextNodeType"


export default function LawDetailsContent({content = []} : {content : LawTextNodeType[]}) {

    return (
        <div className="h-2/3 flex flex-col py-7 px-20 overflow-y-scroll">
            {content.map((node) => (
                <ContentNode node={node} />
            ))}
        </div>
    )
}
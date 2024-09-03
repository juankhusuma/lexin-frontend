import LawTextNodeType from "@/types/LawTextNodeType"

interface ContentNodeProps {
    node: LawTextNodeType
}
export default function ContentNode({node} : ContentNodeProps) {
    const isExplanation : boolean = node.type === "explanation"
    const isCentered : boolean = node.type === "title" || node.type === "header" || node.type === "subheader"
    const isBold : boolean = node.type === "title" || node.type === "header"
    const isSemibold: boolean = node.type === "subheader"

    return (
        isExplanation 
        ?
        <></>
        : 
        <div 
            className={`my-1 ${isCentered && "self-center"} ${isBold && "font-bold"} ${isSemibold && "font-semibold"}`} 
            dangerouslySetInnerHTML={{__html: node.content}} 
        />
    )
}
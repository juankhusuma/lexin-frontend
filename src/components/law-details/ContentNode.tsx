import LawTextNodeType from "@/types/LawTextNodeType"

interface ContentNodeProps {
    node: LawTextNodeType
}
export default function ContentNode({node} : ContentNodeProps) {
    const isExplanation : boolean = node.type === "explanation"
    const isCentered = true
    // const isCentered : boolean = node.type === "title" || node.type === "header" || node.type === "subheader"
    const isBold : boolean = node.type === "title" || node.type === "header"
    const isSemibold: boolean = node.type === "subheader"

    // Replace all newline characters with <br />
    const formattedContent = node.content.replace(/\n/g, '<br />')

    return (
        isExplanation 
        ?
        <></>
        : 
        <div 
            className={`my-1 ${isCentered && "text-center"} ${isBold && "font-bold"} ${isSemibold && "font-semibold"}`} 
            dangerouslySetInnerHTML={{__html: formattedContent}} 
        />
    )
}

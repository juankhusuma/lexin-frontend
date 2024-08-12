import LawTextNodeType from "./LawTextNodeType"

interface LawDetailMetadataType {
    title: string
    subtitle: string
    enacted_date: string
    change_status: "no-change" | "changed" | "no-effect"
}

interface LawDetailType {
    metadata : LawDetailMetadataType
    content : LawTextNodeType[]
}

export type { LawDetailMetadataType, LawDetailType }
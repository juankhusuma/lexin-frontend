import LawDocumentLinkType from "@/types/LawDocumentLinkType"


export interface DocumentFullDetailType {
    title: string
    jenis_bentuk_peraturan: string
    pemrakarsa: string
    nomor: string
    tahun: string
    tentang: string
    tempat_penetapan: string
    ditetapkan_tanggal: string
    status: string
    resource_urls: string[]
    reference_urls: string[]
    filename: string
    dasar_hukum: LawDocumentLinkType[]
    mengubah: LawDocumentLinkType[]
    diubah_oleh: LawDocumentLinkType[]
    mencabut: LawDocumentLinkType[]
    dicabut_oleh: LawDocumentLinkType[]
    melaksanakan_amanat_peraturan: LawDocumentLinkType[],
    dilaksanakan_oleh_peraturan_pelaksana: LawDocumentLinkType[],
}

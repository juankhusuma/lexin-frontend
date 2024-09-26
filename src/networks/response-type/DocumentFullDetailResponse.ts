interface DocumentFullSourceType {
    title: string
    jenis_bentuk_peraturan: string
    pemrakarsa: string
    nomor: string
    tahun: string
    tentang: string
    tempat_penetapan: string
    ditetapkan_tanggal: string
    status: string
    content: string
    resource_url: string
    reference_url: string
    filename: string
}

export interface DocumentFullDetailType {
    _index: string,
    _id: string,
    _score: number,
    _source: DocumentFullSourceType
}

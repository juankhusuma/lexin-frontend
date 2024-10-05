export interface SourceType {
    title: string
    jenis_bentuk_peraturan: string
    pemrakarsa: string
    nomor: string
    tahun: string
    tentang: string
    tempat_penetapan: string
    ditetapkan_tanggal: string
    status: string
}

export interface SearchResult {
    _index: string,
    _id: string,
    _score: number,
    _source: SourceType
}

export interface SearchResultResponseType {
    page: number
    size: number
    total_hits: number
    total_pages: number
    hits: SearchResult[]
}

export default SearchResultResponseType
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

type SearchResultResponseType = SearchResult[]

export default SearchResultResponseType
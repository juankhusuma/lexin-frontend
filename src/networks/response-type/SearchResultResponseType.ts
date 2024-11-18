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

export interface AggregationBucketObject {
    key: string
    doc_count: number
}

export interface AggregationUniquesObject {
    doc_count_error_upper_bound: number
    sum_other_doc_count: number
    buckets: AggregationBucketObject[]
}

export interface AggregationObjectSearchResult {
    jenis_bentuk_peraturan_uniques: AggregationUniquesObject
    status_uniques: AggregationUniquesObject
    buckets: AggregationBucketObject[]
}

export interface SearchResultResponseType {
    page: number
    size: number
    total_hits: number
    total_pages: number
    hits: SearchResult[]
    aggregations: AggregationObjectSearchResult
}

export default SearchResultResponseType
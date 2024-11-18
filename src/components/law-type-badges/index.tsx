function UndangUndangTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-pale-orange border-pale-orange bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Undang-Undang
        </div>
    )
}

function PeraturanMenteriTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-pale-yellow border-pale-yellow bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Peraturan Menteri
        </div>
    )
}

function PeraturanPemerintahTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-pale-green-600 border-pale-green-600 bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Peraturan Pemerintah
        </div>
    )
}

function UnknownTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-dark-red border-dark-red bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Lainnya
        </div>
    )
}

function LawTypeBadge({lawType} : {lawType : string}) {
    if (lawType === "UNDANG-UNDANG") return <UndangUndangTypeBadge />
    if (lawType === "PERATURAN PEMERINTAH") return <PeraturanPemerintahTypeBadge />
    if (lawType === "PERATURAN MENTERI") return <PeraturanMenteriTypeBadge />
    // "PERATURAN PEMERINTAH PENGGANTI UNDANG-UNDANG": "pale-yellow",
    // "PERATURAN PRESIDEN": "pale-green-300",
    // "KEPUTUSAN PRESIDEN": "pale-green-300",
    // "KEPUTUSAN BERSAMA": "pale-green-400",
    // "KEPUTUSAN MENTERI": "pale-green-600",
    // "INSTRUKSI MENTERI": "pale-green-600", 
    return <UnknownTypeBadge />
}



export {
    UndangUndangTypeBadge,
    PeraturanPemerintahTypeBadge,
    LawTypeBadge
}
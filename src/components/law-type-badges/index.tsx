function UndangUndangTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-pale-orange border-pale-orange bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Undang-Undang
        </div>
    )
}

function PeraturanPemerintahTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-pale-yellow border-pale-yellow bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Peraturan Pemerintah
        </div>
    )
}

function UnknownTypeBadge() {
    return (
        <div className={`border-l-4 border-solid text-sm text-dark-red border-dark-red bg-[#E8EAEE] px-2 py-1 rounded-r-lg`}>
            Unknown
        </div>
    )
}

function LawTypeBadge({lawType} : {lawType : string}) {
    if (lawType === "UNDANG-UNDANG") return <UndangUndangTypeBadge />
    if (lawType === "Peraturan Pemerintah") return <PeraturanPemerintahTypeBadge />
    // "Peraturan Pemerintah Pengganti Undang-Undang": "pale-yellow",
    // "Peraturan Presiden": "pale-green-300",
    // "Keputusan Presiden": "pale-green-300",
    // "Keputusan Bersama": "pale-green-400",
    // "Keputusan Menteri": "pale-green-600",
    // "Peraturan Menteri": "pale-green-600",
    // "Instruksi Menteri": "pale-green-600", 
    return <UnknownTypeBadge />
}



export {
    UndangUndangTypeBadge,
    PeraturanPemerintahTypeBadge,
    LawTypeBadge
}
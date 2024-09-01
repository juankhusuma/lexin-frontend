function NoChangesBadge() {
    return (
        <div className="p-1 mx-2 border-2 border-solid rounded-lg text-green-500 border-green-500 bg-green-100">
            Belum dihapus/diubah
        </div>
    )
}

function ChangedBadge() {
    return (
        <div className="p-1 mx-2 border-2 border-solid rounded-lg text-dark-red border-dark-red">
            Diubah{' & '}Dicabut Sebagian
        </div>
    )
}

function NoEffectBadge() {
    return (
        <div className="p-1 mx-2 border-2 border-solid rounded-lg text-dark-red border-dark-red bg-red-200">
            Tidak Berlaku
        </div>
    )
}

function LawStatusBadge({ status }: { status: "no-change" | "changed" | "no-effect" } ) {
    if (status === "no-change") return <NoChangesBadge />
    if (status === "changed") return <ChangedBadge />
    if (status === "no-effect") return <NoEffectBadge />
    return <></>
}


export {
    NoChangesBadge,
    ChangedBadge,
    NoEffectBadge,
    LawStatusBadge
}
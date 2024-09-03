function NoChangesBadge() {
    return (
        <div className="flex justify-center items-center py-1 px-3 mx-2 border-[1px] border-solid rounded-lg text-green-500 border-green-500 bg-green-100">
            Belum dihapus/diubah
        </div>
    )
}

function ChangedBadge() {
    return (
        <div className="flex justify-center items-center py-1 px-3 mx-2 border-[1px] border-solid rounded-lg text-yellow-400 border-yellow-400 bg-yellow-100">
            Diubah{' & '}Dicabut Sebagian
        </div>
    )
}

function NoEffectBadge() {
    return (
        <div className="flex justify-center items-center py-1 px-3 mx-2 border-[1px] border-solid rounded-lg text-dark-red border-dark-red bg-red-200">
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
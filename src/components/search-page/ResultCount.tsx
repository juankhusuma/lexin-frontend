export default function ResultCount({count} : {count: number}) {
    return (
        <div className="font-bold text-sm italic bg-light-blue w-fit px-3 py-1 rounded-lg drop-shadow-lg ml-3">
            Menampilkan {count}{' '}<span className="text-blue-400">Hasil Pencarian</span>
        </div>
    )
}
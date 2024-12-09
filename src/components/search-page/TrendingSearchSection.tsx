import TrendingCard from "./TrendingCard"

export default function TrendingSearchSection() {

    const data = [
        {
            value: "undang-undang transaksi elektronik"
        },
        {
            value: "undang-undang perlindungan data pribadi"
        },
        {
            value: "apa itu undang-undang 1000 hari pertama"
        },
        {
            value: "apa saja hak karyawan pkwt"
        }
    ]

    return (
        <div className="mx-36 mt-5">
            <h1 className="font-semibold mb-3">
                Saran pencarian:
            </h1>
            <div className="grid grid-cols-2 gap-x-14 gap-y-5">
                {data?.map(d => <TrendingCard label={d.value} />)}
            </div>
        </div>
    )
}
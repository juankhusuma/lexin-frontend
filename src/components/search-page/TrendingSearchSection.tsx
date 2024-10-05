import TrendingCard from "./TrendingCard"

export default function TrendingSearchSection() {

    const data = [
        {
            value: "apa itu uu ite"
        },
        {
            value: "keputusan uu pilkada"
        },
        {
            value: "apa itu undang undang dasar 1945"
        },
        {
            value: "apakah presiden boleh ikut kampanye"
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
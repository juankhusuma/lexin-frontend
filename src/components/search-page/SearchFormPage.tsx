import { useState } from "react";
import BigTextField from "../inputs/BigTextField";
import { useRouter } from "next/navigation";
import TrendingSearchSection from "./TrendingSearchSection";


export default function SearchFormPage() {

    const [searchInput, changeSearchInput] = useState<string>("")
    const router = useRouter()

    function onSubmit() {
        if (searchInput) {
            router.push(`/search?q=${encodeURIComponent(searchInput)}`)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center self-center mb-12 mt-44">
                <img src="/lexin-logo.svg" width={60} />
                <h1 className="text-5xl ml-2 font-bold text-dark-navy-blue tracking-wide">
                    Lexin
                </h1>
            </div>
            <form onSubmit={onSubmit} className="mx-36">
                <BigTextField 
                    placeholder="Cari disini" 
                    controlValue={searchInput} 
                    controlOnChange={changeSearchInput} 
                />
            </form>
            <TrendingSearchSection />
        </div>
    )
}
import { useState } from "react";
import BigTextField from "../inputs/BigTextField";
import { useRouter } from "next/navigation";
import TrendingSearchSection from "./TrendingSearchSection";


export default function SearchFormPage() {

    const [searchInput, changeSearchInput] = useState<string>("")
    const router = useRouter()

    function onSubmit() {
        if (searchInput) {
            const params = new URLSearchParams({ q: searchInput }).toString();
            const url = `/search?${params}`
            console.log(`da url: ${url}`)
            router.push(url);
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
            <div 
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        onSubmit()
                    }
                }} 
                className="mx-36"
            >
                <BigTextField 
                    placeholder="Cari disini" 
                    controlValue={searchInput} 
                    controlOnChange={changeSearchInput} 
                />
            </div>
            <TrendingSearchSection />
        </div>
    )
}
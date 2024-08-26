import { useState } from "react";
import BigTextField from "../inputs/BigTextField";
import { useRouter } from "next/navigation";
import PrimaryButton from "../button/PrimaryButton";


export default function SearchFormPage() {

    const [searchInput, changeSearchInput] = useState<string>("")
    const router = useRouter()

    function onSubmit() {
        if (searchInput) {
            router.push(`/search?q=${encodeURIComponent(searchInput)}`)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="mx-36">
                <BigTextField 
                    placeholder="Cari disini" 
                    controlValue={searchInput} 
                    controlOnChange={changeSearchInput} 
                />
                <PrimaryButton label="Cari" type="submit"/>
            </form>
        </div>
    )
}
import Image from "next/image";

export default function LexinLogo() {
    return (
        <div className="flex items-center self-center">
            <Image src="/lexin-logo.svg" width={40} height={40} alt="logo" />
            <h1 className="text-xl ml-2 font-bold text-white tracking-wide">
                Lexin
            </h1>
        </div>
    )
}
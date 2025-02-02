import Image from "next/image";

export default function Footer() {
    return (
        <footer className="z-[100] relative overflow-hidden">
            <div className="bg-[#181818] py-20 px-32 flex justify-center gap-10">
                <div>
                    <Image src="/logo-lexin-white.png" alt="lexin" width={400} height={113} />
                </div>
                <div className="flex flex-1 gap-10">
                    <div className="flex-1">
                        <h1 className="text-white font-bold">Work</h1>
                        <div className="bg-[#d61b23] w-full h-[2px] rounded-full mb-5 mt-2" />
                        <ul className="flex flex-col gap-2">
                            <li className="text-[#6b6b6b]  hover:text-white transition-colors cursor-pointer">Research</li>
                            <li className="text-[#6b6b6b]  hover:text-white transition-colors cursor-pointer">Products</li>
                            <li className="text-[#6b6b6b]  hover:text-white transition-colors cursor-pointer">Publication</li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-white font-bold">Connect</h1>
                        <div className="bg-[#d61b23] w-full h-[2px] rounded-full mb-5 mt-2" />
                        <ul className="flex flex-col gap-2">
                            <li className="text-[#6b6b6b]  hover:text-white transition-colors cursor-pointer">People</li>
                            <li className="text-[#6b6b6b]  hover:text-white transition-colors cursor-pointer">Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-[#202020] px-32 pt-10 pb-11">
                <p className="text-[#6b6b6b]">Copyright All Rights Reserved 2024 - Lexin</p>
            </div>
        </footer>
    )
}
import Image from "next/image"
import { useRouter } from "next/navigation"

export type SidebarMenuType = 'details' | 'consolidation' | 'history' | 'law-basis' 


function LawDetailsIcon() {
    return (
        <Image alt="logo" src="/folder-icon.svg" height={23} width={23}/>
    )
}

function ConsolidationIcon() {
    return (
        <Image alt="logo" src="/consolidation-folder.svg" height={23} width={23}/>
    )
}

function HistoryIcon() {
    return (
        <Image alt="logo" src="/history.svg" height={23} width={23}/>
    )
}

function LawBasisIcon() {
    return (
        <Image alt="logo" src="/law-basis.svg" height={23} width={23}/>
    )
}

interface SidebarItemProps {
    name: string
    active: boolean
    leftIcon?: JSX.Element
    onClick: () => void
}
function SidebarItem({name, active, onClick, leftIcon} : SidebarItemProps) {
    return (
        <div onClick={onClick} className={`font-semibold flex flex-row items-center mx-4 my-4 p-3 rounded-lg ${active ? "bg-light-blue" : "cursor-pointer hover:bg-light-blue hover:opacity-70"}`}>
            <div>
                {leftIcon}
            </div>
            <span className="text-darkGrayText ml-2">
                {name}
            </span>
        </div>
    )
}

interface SidebarProps {
    tab: SidebarMenuType
    setTab: (arg0: SidebarMenuType) => void
    lawId: number | string
}
export function Sidebar({tab, setTab, lawId} : SidebarProps) {
    const router = useRouter()

    return (
        <div className="w-1/5 border-r-[0.7px] -translate-y-8 border-solid border-gray-300 h-screen absolute z-0]">
            <SidebarItem 
                name="Peraturan" 
                active={tab === "details"} 
                onClick={() => {
                    setTab('details')
                    router.push(`/legal-doc/${lawId}?tab=details`)
                }}
                leftIcon={<LawDetailsIcon />} 
            />
            {/* <SidebarItem 
                name="Peraturan Konsolidasi" 
                active={tab === "consolidation"} 
                onClick={() => {
                    setTab('consolidation')
                    router.push(`/legal-doc/${lawId}?tab=consolidation`)
                }}
                leftIcon={<ConsolidationIcon />} 
            /> */}
            <SidebarItem 
                name="Sejarah" 
                active={tab === "history"} 
                onClick={() => {
                    setTab('history')
                    router.push(`/legal-doc/${lawId}?tab=history`)
                }}
                leftIcon={<HistoryIcon />} 
            />
            <SidebarItem 
                name="Dasar Hukum" 
                active={tab === "law-basis"} 
                onClick={() => {
                    setTab('law-basis')
                    router.push(`/legal-doc/${lawId}?tab=law-basis`)
                }}
                leftIcon={<LawBasisIcon />} 
            />
        </div>
    )
}
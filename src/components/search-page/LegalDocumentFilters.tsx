import { Button, Checkbox, Divider, Radio } from "@mantine/core"
import { useState } from "react"


const LEGAL_DOC_TYPES = [
    { 
        value: "UNDANG-UNDANG", 
        color: "#F98B60",
        label: "Undang-Undang"
    },
    { 
        value: "PERATURAN PEMERINTAH", 
        color: "#FFA800",
        label: "Peraturan Pemerintah"
    },
    { 
        value: "PERATURAN MENTERI", 
        color: "#E7FDE8",
        label: "Peraturan Menteri"
    },
    { 
        value: "PERATURAN PEMERINTAH PENGGANTI UNDANG-UNDANG", 
        color: "#55A98A",
        label: "Peraturan Pemerintah Pengganti Undang-Undang"
    },
    { 
        value: "PERATURAN PRESIDEN", 
        color: "#2F513D",
        label: "Peraturan Presiden"
    },
    { 
        value: "KEPUTUSAN PRESIDEN", 
        color: "#07620C",
        label: "Keputusan Presiden"
    },
    { 
        value: "KEPUTUSAN BERSAMA", 
        color: "#103AA5",
        label: "Keputusan Bersama"
    },
    { 
        value: "KEPUTUSAN MENTERI", 
        color: "#FCF9E8",
        label: "Keputusan Menteri"
    },
    { 
        value: "INSTRUKSI MENTERI",  
        color: "#9F880F",
        label: "Instruksi Menteri"
    },
]


interface LegalDocumentFiltersProps {
    setDocTypeValue: (sl: string[]) => void
    setStatusValue: (s: string) => void
    disabled: boolean
}
export default function LegalDocumentFilters({
    setDocTypeValue,
    setStatusValue,
    disabled
} : LegalDocumentFiltersProps) {

    const [tempDocTypes, setTempDocTypes] = useState<string[]>([])
    const [tempStatus, setTempStatus] = useState<string>('')

    function applyFilter() {
        setDocTypeValue(tempDocTypes)
        setStatusValue(tempStatus)
    }

    function clearFilter() {
        setDocTypeValue(tempDocTypes)
        setStatusValue(tempStatus)
        setTempDocTypes([])
        setTempStatus('')
    }

    return (
        <div className="p-4 mx-8 bg-light-blue rounded-xl">
            <div className="flex flex-row justify-between items-center">
                <div className="text-lg font-bold">
                    Filter
                </div>
                <Button
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={clearFilter}
                >
                    Clear
                </Button>
            </div>
            <Divider orientation="horizontal" className="my-3 border-black" color="black"/>
            {/* START OF DOC TYPE FILTER SECTION */}
            <div className="font-semibold">
                Peraturan
            </div>
            <Checkbox.Group
                value={tempDocTypes}
                onChange={setTempDocTypes}
                className="w-[400px]"
            >
                {LEGAL_DOC_TYPES.map(ld => (
                    <div className="flex flex-row justify-between w-full items-center">
                        <div className="flex flex-row items-center">
                            <Checkbox 
                                disabled={disabled}
                                className="my-2 ml-2"
                                value={ld.value} 
                                labelPosition="left"
                                color="#192E59"
                                iconColor="white"
                            />
                            <div className="ml-2 flex flex-row items-center">
                                <div
                                    style={{
                                        color: ld.color
                                    }} 
                                    className={`text-3xl rounded-full mr-1`} 
                                >
                                    &bull; 
                                </div>
                                <span className="text-sm line-clamp-1">
                                    {ld.label}
                                </span>
                            </div>
                        </div>
                        <div className="bg-blue-200 px-3 py-1 rounded-full font-semibold text-xs text-dark-navy-blue">
                            99
                        </div>
                    </div>
                ))}
            </Checkbox.Group>
            {/* START OF DOC TYPE FILTER SECTION */}

            <Divider orientation="horizontal" className="my-8 border-black" color="black"/>
            {/* START OF DOC TYPE FILTER SECTION */}
            <div className="text-lg font-bold mt-5">
                Status
            </div>
            <Radio.Group
                value={tempStatus}
                onChange={setTempStatus}
            >
                {["Berlaku", "Telah Diubah", "Tidak Berlaku"].map(e => (
                    <Radio
                        disabled={disabled}
                        className="my-2 ml-2"
                        color="#192navyE59"
                        value={e}
                        label={e}
                    />
                ))}
            </Radio.Group>
            {/* END OF DOC TYPE FILTER SECTION */}
            <Button
                fullWidth
                color="#192E59"
                onClick={applyFilter}
                className="mt-8"
            >
                Simpan
            </Button>
        </div>
    )
}
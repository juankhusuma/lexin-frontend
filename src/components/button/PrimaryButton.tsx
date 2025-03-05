import ButtonProps from "./ButtonProps"
import {Loader} from "@mantine/core"


export default function PrimaryButton({label, onClick = () => {}, type = "button", className, disabled, loading, fullWidth} : ButtonProps) {
    return (
        <button 
            className={`flex flex-row items-center bg-[#d61b23] font-semibold text-white text-md py-3 px-6 rounded-sm ${fullWidth ? 'w-full' : 'min-w-14'} ${className}`} 
            type={type} 
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? <Loader size="xs" color="red" className="mr-3"/> : <></>}{label}
        </button>
    )
}
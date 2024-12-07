import ButtonProps from "./ButtonProps"
import {Loader} from "@mantine/core"


export default function PrimaryButton({label, onClick = () => {}, type = "button", className, disabled, loading, fullWidth} : ButtonProps) {
    return (
        <button 
            className={`flex flex-row items-center bg-dark-navy-blue text-white text-md py-2 px-6 rounded-xl ${fullWidth ? 'w-full' : 'min-w-14'} ${className}`} 
            type={type} 
            onClick={onClick}
            disabled={disabled}
        >
            {loading && <Loader size="xs" color="red" className="mr-3"/>}{' '}{label}
        </button>
    )
}
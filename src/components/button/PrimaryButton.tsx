import ButtonProps from "./ButtonProps"


export default function PrimaryButton({label, onClick = () => {}, type = "button", className} : ButtonProps) {
    return (
        <button className={`bg-dark-navy-blue text-white text-md py-2 px-6 rounded-xl w-full ${className}`} type={type} onClick={onClick}>
            {label}
        </button>
    )
}
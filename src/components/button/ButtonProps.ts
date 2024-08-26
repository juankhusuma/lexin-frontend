interface ButtonProps {
    label: string
    type: "button" | "reset" | "submit"
    onClick?: () => void
    className?: string
    disabled?: boolean
    loading?: boolean
}

export default ButtonProps
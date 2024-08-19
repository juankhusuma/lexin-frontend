interface ButtonProps {
    label: string
    onClick: () => void
    type: "button" | "reset" | "submit"
    className?: string
    disabled?: boolean
    loading?: boolean
}

export default ButtonProps
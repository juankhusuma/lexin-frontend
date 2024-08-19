interface ButtonProps {
    label: string
    onClick: () => void
    type: "button" | "reset" | "submit"
    className?: string
}

export default ButtonProps
interface BigTextFieldProps {
    controlValue: string
    controlOnChange: (s: string) => void
    placeholder: string
}
export default function BigTextField({controlValue, controlOnChange, placeholder} : BigTextFieldProps) {
    
    const placeholderString = placeholder ?? "Enter text here"
    
    return (
        <div className={`flex flex-col my-2`}>
            <input
                type="text"
                placeholder={placeholderString}
                value={controlValue}
                onChange={e => controlOnChange(e.target.value)}
                className={"p-2 rounded-xl border-[1px] border-gray border-solid w-full text-md"}
            />
        </div>
    )
}
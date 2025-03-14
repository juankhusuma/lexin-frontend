import InputFieldProps from "./InputFieldProps"

export default function LexinFormTextField({label, controlValue, controlOnChange, placeholder} : InputFieldProps) {
    
    const placeholderString = placeholder ?? "Enter text here"
    
    return (
        <div className={`flex flex-col my-2`}>
            <span className="mb-1 font-semibold">{label}</span>
            <div className="">
                <input
                    type="text"
                    placeholder={placeholderString}
                    value={controlValue}
                    onChange={e => controlOnChange(e.target.value)}
                    className={"p-2 rounded-xl text-sm border-[1px] border-gray border-solid w-full"}
                />
            </div>
        </div>
    )
}
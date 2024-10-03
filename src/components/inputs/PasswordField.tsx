import { useState } from "react"
import InputFieldProps from "./InputFieldProps"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function LexinFormPasswordField({label, controlValue, controlOnChange, placeholder} : InputFieldProps) {    
    const placeholderString = placeholder ?? "Enter text here"
    const [reveal, setReveal] = useState<boolean>(false)
    
    return (
        <div className={`flex flex-col my-2`}>
            <span className="mb-1 font-semibold"> {label} </span>
            <div className="relative">
                <input
                    type={reveal ? "text" : "password"}
                    placeholder={placeholderString}
                    value={controlValue}
                    onChange={e => controlOnChange(e.target.value)}
                    className={"p-2 rounded-xl text-sm border-[1px] border-gray border-solid w-full"}
                />
                <div 
                    className="cursor-pointer absolute right-3 top-2" 
                    onClick={() => {
                        setReveal(prev => !prev)
                    }}
                >
                    <Icon 
                        icon={reveal ? "mdi:eye-off" : "mdi:eye"}
                        style={{ fontSize: '20px' }}
                    />
                </div>
            </div>
        </div>
    )
}
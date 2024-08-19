"use client"

import PrimaryButton from "@/components/button/PrimaryButton";
import LexinFormPasswordField from "@/components/inputs/PasswordField";
import LexinFormTextField from "@/components/inputs/TextField";
import { useState } from "react";

export default function LoginPage() {

    const [nameInput, changeNameInput] = useState<string>("")
    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")


    function onLoginFormSubmit() {
        console.log(`Registering with email: ${emailInput}`)
        console.log(`Registering with name: ${nameInput}`)
        console.log(`Registering with password: ${passwordInput}`)
    }

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-[#FFFFFF] py-5 px-6 flex flex-col items-center rounded-xl shadow-xl w-[300px] translate-y-12">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        Daftar
                    </h1>
                    <h1 className="mb-6 text-sm">
                        Sudah memiliki akun? <a className="text-blue-600 underline font-semibold" href="/login">Masuk</a> 
                    </h1>
                </div>
                <form onSubmit={onLoginFormSubmit} className="w-full">
                    <LexinFormTextField 
                        label="Nama"
                        placeholder="Masukkan nama"
                        controlValue={nameInput}
                        controlOnChange={changeNameInput}
                    />
                    <LexinFormTextField 
                        label="Email"
                        placeholder="Masukkan email"
                        controlValue={emailInput}
                        controlOnChange={changeEmailInput}
                    />
                    <LexinFormPasswordField 
                        label="Password"
                        placeholder="Masukkan Password"
                        controlValue={passwordInput}
                        controlOnChange={changePasswordInput}
                    />
                    <PrimaryButton label="Daftar" onClick={() => console.log("on submit")} type="submit" className="mt-5" loading={true} /> 
                </form>
            </div>
        </div>
    )
}
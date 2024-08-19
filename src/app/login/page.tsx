"use client"

import PrimaryButton from "@/components/button/PrimaryButton";
import LexinFormPasswordField from "@/components/inputs/PasswordField";
import LexinFormTextField from "@/components/inputs/TextField";
import { useState } from "react";

export default function LoginPage() {

    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")


    function onLoginFormSubmit() {
        console.log(`Logging in with email: ${emailInput}`)
        console.log(`Logging in with password: ${passwordInput}`)
    }

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-[#FFFFFF] py-5 px-6 flex flex-col items-center rounded-xl shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        Masuk
                    </h1>
                    <h1 className="mb-6 text-sm">
                        Belum memiliki akun? <a href="/register">Daftar</a> 
                    </h1>
                </div>
                <form onSubmit={onLoginFormSubmit}>
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
                    <PrimaryButton label="Masuk" onClick={() => console.log("on submit")} type="submit" /> 
                </form>
            </div>
        </div>
    )
}
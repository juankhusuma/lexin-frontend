"use client"

import PrimaryButton from "@/components/button/PrimaryButton";
import LexinFormPasswordField from "@/components/inputs/PasswordField";
import LexinFormTextField from "@/components/inputs/TextField";
import { AUTH_ENDPOINTS } from "@/networks/endpoints";
import LoginResponseType from "@/networks/response-type/LoginResponseType";
import useRequest from "@/networks/useRequest";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()

    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")

    const { loading, error: loginError, fetchCallback: fetchLogin } = useRequest<LoginResponseType>(
        AUTH_ENDPOINTS.POST.login, 
        {
            body: {
                username: emailInput, 
                password: passwordInput,
            },
            onSuccess(data) {
                setCookie('access_token', `${data.token_type} ${data.access_token}`)
                setCookie('refresh_token', `${data.token_type} ${data.refresh_token}`)
                router.push('/search')
            },
            contentType: 'application/x-www-form-urlencoded'
        }
    )


    async function onLoginFormSubmit() {
        fetchLogin()
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-[#FFFFFF] py-5 px-6 flex flex-col items-center rounded-xl shadow-xl w-[600px] translate-y-12">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        Masuk
                    </h1>
                    <h1 className="mb-6 text-sm">
                        Belum memiliki akun? <a className="text-blue-600 underline font-semibold" href="/register">Daftar</a> 
                    </h1>
                </div>
                <div className="w-full">
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
                    {loading && <p className="text-xs my-3">Logging In...</p>}
                    {loginError && <p className="text-red-500 text-xs my-3">Terdapat kesalahan pada proses login. Silahkan coba lagi</p>}
                    <PrimaryButton 
                        disabled={loading} 
                        loading={true} 
                        label="Masuk" 
                        onClick={onLoginFormSubmit} 
                        type="button" 
                        className="mt-5"
                    /> 
                </div>
            </div>
        </div>
    )
}
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
import { useAuth } from "@/contexts/authContext";

export default function LoginPage() {
    const auth = useAuth()
    const router = useRouter()

    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)

    
    async function fetchLogin() {
        setLoadingLogin(true)
        setLoginError(false) 

        const res = await fetch(
            AUTH_ENDPOINTS.POST.login.url,
            {
                method: "POST",
                headers: {
                    'Application-Type' : 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: emailInput, 
                    password: passwordInput,
                })
            }
        )

        if (res.ok) {
            const data = await res.json()
            setCookie('access_token', `${data.token_type} ${data.access_token}`)
            setCookie('refresh_token', `${data.token_type} ${data.refresh_token}`)
            auth.setAccessToken(`${data.token_type} ${data.access_token}`)
            router.push('/after-login')
        } else {
            setLoginError(true)
        }
        setLoadingLogin(false)
    }


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
                    {loadingLogin && <p className="text-xs my-3">Logging In...</p>}
                    {loginError && <p className="text-red-500 text-xs my-3">Terdapat kesalahan pada proses login. Silahkan coba lagi</p>}
                    <PrimaryButton 
                        disabled={loadingLogin} 
                        loading={loadingLogin} 
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
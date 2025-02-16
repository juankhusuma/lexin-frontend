"use client"

import PrimaryButton from "@/components/button/PrimaryButton";
import LexinFormPasswordField from "@/components/inputs/PasswordField";
import LexinFormTextField from "@/components/inputs/TextField";
import { AUTH_ENDPOINTS } from "@/networks/endpoints";
import RegisterResponseType from "@/networks/response-type/RegisterResponseType";
import useRequest from "@/networks/useRequest";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
    const router = useRouter()

    const [nameInput, changeNameInput] = useState<string>("")
    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false)

    const { error, fetchCallback } = useRequest<RegisterResponseType>(
        AUTH_ENDPOINTS.POST.register,
        {
            body: {
                fullname: nameInput,
                email: emailInput,
                password: passwordInput
            },
            onSuccess(_data) {
                router.push('/login')
            }
        }
    )

    async function handleOnPressRegister() {
        setLoadingRegister(true)

        fetchCallback().then(_d => {
            setLoadingRegister(false)
        }).catch(_e => {
            setLoadingRegister(false)
        })
    }
    

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-[#FFFFFF] py-5 px-6 flex flex-col items-center rounded-xl shadow-xl w-[600px] translate-y-12">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        Daftar
                    </h1>
                    <h1 className="mb-6 text-sm">
                        Sudah memiliki akun? <Link className="text-blue-600 underline font-semibold" href="/login">Masuk</Link> 
                    </h1>
                </div>
                <div className="w-full">
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
                    {loadingRegister && <p className="text-xs my-3">Mendaftarkan akun anda...</p>}
                    {error && <p className="text-xs my-3 text-red-500">Gagal mendaftarkan akun anda. Silahkan coba lagi.</p>}
                    <PrimaryButton label="Daftar" onClick={handleOnPressRegister} type="button" className="mt-5" loading={loadingRegister} /> 
                </div>
            </div>
        </div>
    )
}
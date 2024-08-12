"use client"

import LexinFormTextField from "@/components/inputs/TextField";
import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {

    const [emailInput, changeEmailInput] = useState<string>("")
    const [passwordInput, changePasswordInput] = useState<string>("")


    return (
        <Box className="flex justify-center items-center h-full w-full">
            <Box className="bg-[#FFFFFF] py-5 px-12 flex flex-col items-center rounded-xl shadow-xl">
                <Typography variant="h5" className="font-bold">
                    Masuk
                </Typography>
                <Typography variant="subtitle1" className="mb-6">
                    Belum memiliki akun? <Link href="/register">Daftar</Link> 
                </Typography>
                <LexinFormTextField 
                    label="Email"
                    controlValue={emailInput}
                    controlOnChange={changeEmailInput}
                />
                <LexinFormTextField 
                    label="Password"
                    controlValue={emailInput}
                    controlOnChange={changeEmailInput}
                />
            </Box>
        </Box>
    )
}
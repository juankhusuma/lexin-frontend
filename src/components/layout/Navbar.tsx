import { Box, Typography } from "@mui/material"
import Image from "next/image"

export default function Navbar() {

    return (
        <Box className="w-screen bg-dark-navy-blue h-[70px] flex flex-row items-center p-4 fixed">


            <Box className="flex flex-row items-center ml-8">
                <Image src="/lexin-logo.svg" alt="" width={30} height={30} />
                <Typography className="ml-3 text-xl text-white font-bold">
                    Lexin
                </Typography>
            </Box>



        </Box>
    )
}
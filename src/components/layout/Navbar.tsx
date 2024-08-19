"use client"

import Image from "next/image"
import { useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const router = useRouter()

    // const pages = ['Sumber', 'Layanan Tersedia', 'Kontak Kami'];
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


    useEffect(() => {

    }, [router])

    return (
      <nav className="w-screen bg-dark-navy-blue h-16 fixed z-100">
        <div>

        </div>
      </nav>
    )
}
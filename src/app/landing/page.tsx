"use client"

import PrimaryButton from '@/components/button/PrimaryButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="px-10 flex flex-row items-center justify-center h-full">
      <div className="mt-32 w-1/2">
        <h4 className="font-bold text-4xl">
          Lexin: Kecerdasan Hukum dengan Generative AI Terdepan
        </h4>
        <p className="mt-5">
          Buka wawasan hukum yang tak tertandingi dengan basis data hukum berbasis Generative-AI Search, di mana kecerdasan buatan modern bertemu dengan basis data hukum yang lengkap untuk merevolusi pengalaman riset hukum Anda.
        </p>
        <PrimaryButton 
          label="Coba sekarang" 
          onClick={() => {router.push('/search')}} 
          type='button'
          className='mt-8' 
        />
      </div>
      <div className="mt-32 flex items-center justify-center w-1/2">
        <Image src="/hero-landing-page.png" alt="" width={750} height={550}/>
      </div>

    </div>
  );
}

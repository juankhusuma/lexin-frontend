import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="px-10 flex flex-row items-center justify-center h-screen">
      <div className="w-1/2">
        <h4 className="font-bold text-4xl">
          Legal Generative-AI Search
        </h4>
        <p className="mt-5">
          Unlock unparalleled legal insights with Legal Generative-AI Search, where cutting-edge artificial intelligence 
          meets exhaustive legal databases to revolutionize your research experience.
        </p>
        <button className="mt-8">
          Coba Sekarang
        </button>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <Image src="/hero-landing-page.png" alt="" width={750} height={550}/>
      </div>

    </div>
  );
}

import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image';

export default function LandingPage() {
  return (
    <Box className="px-10 flex flex-row items-center justify-center h-screen">
      <Box className="w-1/2">
        <Typography variant="h4" className="font-bold">
          Legal Generative-AI Search
        </Typography>
        <Typography className="mt-5">
          Unlock unparalleled legal insights with Legal Generative-AI Search, where cutting-edge artificial intelligence 
          meets exhaustive legal databases to revolutionize your research experience.
        </Typography>
        <Button variant="contained" className="mt-8">
          Coba Sekarang
        </Button>
      </Box>
      <Box className="flex items-center justify-center w-1/2">
        <Image src="/hero-landing-page.png" alt="" width={750} height={550}/>
      </Box>

    </Box>
  );
}

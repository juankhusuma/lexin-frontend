import { useParams } from 'next/navigation'
import PDFViewer  from 'pdf-viewer-reactjs'
import { useEffect, useMemo, useState } from 'react'

interface LawDetailPDFViewProps {
    pdfLink?: string
}
export default function LawDetailPDFView({ pdfLink } : LawDetailPDFViewProps) {
    const [pdfBlobUrl, setPdfBlobUrl] = useState<string>("")

    async function createPdfBlob() {
        if (!pdfLink) {
            setPdfBlobUrl("")
        }

        try {
            // Fetch the PDF from the Google Cloud Storage link
            const response = await fetch(
                // temporary solution for using the wrong base url for fetching
                (pdfLink as string).replace("https://storage.cloud.google.com", "https://storage.googleapis.com")
            );
    
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
    
            // Get the binary data
            const arrayBuffer = await response.arrayBuffer();
    
            // Create a Blob from the binary data
            const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
            const blobUrl = URL.createObjectURL(pdfBlob);
            setPdfBlobUrl(blobUrl)
        } catch (error) {
            console.error("Error creating blob:", error);
            setPdfBlobUrl("");
        }
    }

    useEffect(() => {
        createPdfBlob()
    }, [pdfLink])

    useEffect(() => {
        console.log("pdf link")
        console.log(pdfLink)
    }, [pdfLink])

    return (
        <div>
            <iframe
                src={pdfBlobUrl}
                width="100%"
                height="800px"
                style={{ border: 'none' }}
            />
        </div>
    )
}
import { useParams } from 'next/navigation'
import PDFViewer from 'pdf-viewer-reactjs'
import { useEffect } from 'react'

export default function LawDetailPDFView() {
    const { legal_doc_id } = useParams()

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}/api/v1/legal-document/view/${legal_doc_id}`
        console.log(`opening ${url}`)
    }, [])

    return (
        <div>
            <PDFViewer 
                document={{
                    url: "https://peraturan.go.id/files/uu4-1998.pdf"
                }}
            />
        </div>
    )
}
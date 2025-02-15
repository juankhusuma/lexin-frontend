import { number, z } from 'zod';

export const answerSchema = z.object({
    answer: z.string().describe("Jawaban dari pertanyaan, berikan <cite>{i}</cite> untuk hasil sitasi dengan i adalah id dari dokumen yang relevan"),
    source: z.array(z.object({
        title: z.string().describe("Judul dari sumber"),
        text: z.string().describe("Konten dari sitasi, pastikan untuk memperbaiki seluruh kesalahan ketik, error dari hasil ekstraksi teks dan kesalahan tanda baca lainya"),
        page_number: z.number().describe("Halaman dari sumber (harus berasal dari <konteks>...<page_number>...</page_number></konteks>)"),
        chunk_id: z.string().describe("ID dari sumber yang anda gunakan (harus berasal dari <konteks>...<chunk_id>...</chunk_id></konteks>)"),
        number: z.string().describe("Nomor dari sumber (harus berasal dari <konteks>...<number>...</number></konteks>)"),
        year: z.string().describe("Tahun dari sumber (harus berasal dari <konteks>...<year>...</year></konteks>)"),
    })).describe("Array dari sitasi yang relevan dengan jawaban"),
});

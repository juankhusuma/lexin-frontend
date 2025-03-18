import { z } from 'zod';

export const answerSchema = z.object({
  answer: z.string().nonempty().describe('Jawaban dari pertanyaan pengguna.'),
  documents: z.array(z.object({
    document_title: z.string().nonempty().describe('Judul dokumen yang dijadikan referensi.'),
    document_id: z.string().nonempty().describe('ID dokumen yang dijadikan referensi.'),
    page_number: z.number().int().positive().describe('Nomor halaman dokumen yang dijadikan referensi.'),
    excerpt: z.string().nonempty().describe('Kutipan dari dokumen yang dijadikan referensi.'),
  })).nonempty().describe('Referensi dokumen yang digunakan dalam jawaban.'),
});
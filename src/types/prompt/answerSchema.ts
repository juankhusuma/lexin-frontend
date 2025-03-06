import { z } from 'zod';

export const answerSchema = z.object({
    answer: z.array(z.object({
      document_id: z.string().describe("ID dari dokumen yang diambil. satu jawaban hanya boleh memiliki satu document_id"),
      answer: z.string().describe("Jawaban dari pertanyaan"),
      page_number: z.number().describe("Halaman dari dokumen yang diambil"),
      document_title: z.string().describe("Judul dari dokumen yang diambil, yang lengkap dengan format {jenis} Nomor {nomor} Tahun {tahun} Tentang {tentang}. Satu jawaban hanya boleh memiliki satu document_title"),
    })).describe("Jawaban dari pertanyaan"),
  });
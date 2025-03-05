import { z } from 'zod';

export const answerSchema = z.object({
    answer: z.array(z.object({
      document_id: z.string(),
      answer: z.string(),
      page_number: z.number(),
      document_title: z.string().describe("Judul dari dokumen yang diambil"),
    })),
  });

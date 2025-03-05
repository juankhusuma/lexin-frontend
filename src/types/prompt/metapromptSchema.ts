import { z } from "zod";

export const metapromptSchema = z.object({
    vector_query: z.string().describe("Query baru yang digunakan untuk mencari dokumen"),
    fts_query: z.string().describe("Query baru yang digunakan untuk mencari dokumen"),
    berlaku_only: z.boolean().describe("Apakah query hanya boleh dijawab dengan uu yang masih berlaku?"),
    tidak_berlaku_only: z.boolean().describe("Apakah query hanya boleh dijawab dengan uu yang sudah tidak berlaku?"),
    need_retrieval: z.boolean().describe("Apakah query memerlukan informasi yang harus diambil dari dokumen? Jika konteks sudah cukup, maka jawaban tidak perlu diambil dari dokumen"),
  });
import { SearchResult } from '@/components/search-page/DatabaseSearchResultSection'; 
import { answerSchema } from '@/types/prompt/answerSchema';
import { google } from '@ai-sdk/google';
import { generateObject, streamObject } from "ai";
import { text } from 'stream/consumers';



const model = google('gemini-2.0-flash-exp', {
    structuredOutputs: true,
});

export const maxDuration = 60;

export async function POST(req: Request) {
    const context = await req.json();
  
    const result = streamObject({
      model,
      temperature: 0.7,
      schema: answerSchema,
      system: `
      Anda adalah sebuah asisten virtual dalam search engine undang-undang.
      Tugas Anda adalah sebagai berikut:
        - Anda akan diberikan sebuah pertanyaan
        - Anda akan diberikan konteks undang-undang apa saja yang berhubungan dengan pertanyaan tersebut
        - Anda akan menjawab berdasarkan konteks tersebut, jangan mengarang jawaban
        - Jawaban Anda harus berupa teks yang relevan dengan pertanyaan
        - Hasil jawaban harus sesuai dengan schema yang diberikan
        - Anda akan memberikan informasi dan sitasi dari sumber yang relevan

        berikan <cite>{i}</cite> untuk hasil sitasi dengan i adalah id dari dokumen yang relevan
        PASTIKAN ID ADA DARI KONTEKS YANG DIBERIKAN JIKA ANDA MENGGUNAKAN SITASI YANG SALAH MAKA SAYA BISA DIKENAI SANKSI
        misal anda memiliki structured_outputs sebagai berikut:
        structured_outputs: [
            {
                title: "Judul Sumber 1",
                text: "Konten Sumber 1",
                page_number: 1,
                chunk_id: "id_sumber 1",
                number: "1",
                year: 2021
            },
            {
                title: "Judul Sumber 2",
                text: "Konten Sumber 2",
                page_number: 2,
                chunk_id: "id_sumber 2",
                number: "1",
                year: 2021
            },
            {
                title: "Judul Sumber 3",
                text: "Konten Sumber 3",
                page_number: 3,
                chunk_id: "id_sumber 3",
                number: "1",
                year: 2021
            }
        ]
        Maka jika jawaban menggunakan sitasi dari sumber 2, maka jawaban yang benar adalah <cite>1</cite>,

        <konteks>
        ${(context.relevant_docs as SearchResult[]).map(doc => `
            <sumber>
              <chunk_id>${doc.metadata.chunk_id}</chunk_id>
              <title>${doc.doc_title}</title>
              <text>${doc.text}</text>
              <page_number>${doc.page_number}</page_number>
              <number>${doc.metadata.number}</number>
              <year>${doc.metadata.year}</year>
            </sumber>    
        `)}
        </konteks>
        Berdasarkan konteks di atas, jawablah pertanyaan dari pengguna.
        
        JANGAN MENGARANG PAGE NUMBER, SAYA BISA DIKENAI SANKSI JIKA ANDA MENGARANG PAGE NUMBER
      `
      ,
      prompt: `
      Saya ingin mengetahui informasi relevan mengenai
      <pertaanyaan>
        ${context.question}
      </pertanyaan>
      JANGAN MENGARANG PAGE NUMBER, SAYA BISA DIKENAI SANKSI JIKA ANDA MENGARANG PAGE NUMBER
      `,
    });
  
    return result.toTextStreamResponse();
  }
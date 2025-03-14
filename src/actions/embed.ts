"use server"
import axios from 'axios'

export async function embedQuery(text: string): Promise<number[]> {
    const response = await axios.post<number[]>(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_SERVER}/embed_question`, {
        text,
        api_key: process.env.API_KEY
    })
    return response.data
}
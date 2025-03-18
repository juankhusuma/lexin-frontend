"use client";

import { createContext, useContext, useEffect, useState } from "react";
import QuestionAnswerSection from "../gen-ai/QuestionAnswerSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLoading from "react-loading";
import { useAuth } from "@/contexts/authContext";

import { experimental_useObject as useObject } from 'ai/react';
import { answerSchema } from "@/types/prompt/answerSchema";
import { SearchResult } from "./DatabaseSearchResultSection";
import { SearchDocumentContext } from "@/hoc/SearchDocumentProvider";
import { metapromptSchema } from "@/types/prompt/metapromptSchema";
import { TooltipProvider } from "../ui/tooltip";

export interface AnswerResponse {
    answer?: string
    documents?: {
        document_title?: string
        document_id?: string
        page_number?: number
        excerpt?: string
    }[]
    question?: string
    status?: string
}

export const AnswerResponseContext = createContext<AnswerResponse[]>([]);

export default function AIAnswerSection({ searchQuery }: { searchQuery: string, relatedDocs: SearchResult[] }) {
    const [followUpInput, setFollowUpInput] = useState("");
    const [isClient, setIsClient] = useState(false); // Ensure client-only rendering
    const [isFirstQuestionSubmitted, setIsFirstQuestionSubmitted] = useState<boolean>(false)
    const [chat, setChat] = useState<AnswerResponse[]>([]);
    const [chatIndex, setChatIndex] = useState<number>(-1);
    const [question, setQuestion] = useState<string>(searchQuery);
    const { searchResults, loading: retrievalLoading, setSearchResults, setLoading: setRetrievalLoading } = useContext(SearchDocumentContext)
    const { object: reply, submit, isLoading } = useObject({
        api: `${process.env.NEXT_PUBLIC_LLM_API_PATH!}/ask`,
        schema: answerSchema,
    });
    const { object: metaprompt, submit: submitMetaprompt, isLoading: isMetapromptLoading } = useObject({
        api: `${process.env.NEXT_PUBLIC_LLM_API_PATH!}/metaquery`,
        schema: metapromptSchema,
    });

    const authContext = useAuth();
    const isLoggedIn = !!authContext.accessToken;
    const [state, setState] = useState<string>("");

    useEffect(() => {
        setIsClient(true); // Mark the component as client-rendered
    }, []);

    useEffect(() => {
        // modify the chat array to include the new response at the index
        setChat(prev => {
            const newChat = [...prev];
            newChat[chatIndex] = {
                question: chat[chatIndex]?.question ?? "",
                status: state,
                answer: reply?.answer ?? "",
                documents: reply?.documents?.filter(doc => doc !== undefined) ?? [],
            };
            return newChat;
        })
    }, [reply, chatIndex, state])

    useEffect(() => {
        if (!retrievalLoading && !isMetapromptLoading) {
            const conversation = chat.map(({ question, answer }) => ({
                question,
                answer,
            }));

            submit({
                question,
                relevant_docs: searchResults,
                conversation,
            });
            setIsFirstQuestionSubmitted(true)
            console.log(question)
            setChatIndex(chatIndex + 1)
            setIsFirstQuestionSubmitted(true)
        }
    }, [retrievalLoading, isMetapromptLoading, question])

    useEffect(() => {
        (async () => {
            if (!isMetapromptLoading) {
                setRetrievalLoading(true)
                if (!metaprompt?.need_retrieval && !isMetapromptLoading) {
                    setRetrievalLoading(false)
                    setState("Proses pencarian selesai, mulai menjawab pertanyaan")
                    setSearchResults([])
                    return;
                }
                setState("Memahami pertanyaan Anda...")
                const embedResponse = await fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/embed`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: metaprompt?.vector_query,
                    })
                });
                setState("Menggali informasi...")
                const results = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/semantic`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            query: await embedResponse.json(),
                            berlaku_only: metaprompt?.berlaku_only,
                            tidak_berlaku_only: metaprompt?.tidak_berlaku_only,
                        })
                    }),
                    fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/fulltext`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            query: await metaprompt?.fts_query,
                            berlaku_only: metaprompt?.berlaku_only,
                            tidak_berlaku_only: metaprompt?.tidak_berlaku_only,
                        })
                    }),
                ])
                const pagesData = await Promise.all(results.map(async res => res.json()))
                const pages = pagesData.flat()
                var docPageSet = new Set()
                const uniquePages = pages.filter((page) => {
                    if (docPageSet.has(`${page.document_id}-${page.page_number}`)) {
                        return false
                    }
                    docPageSet.add(`${page.document_id}-${page.page_number}`)
                    return true
                })
                setState(`${pagesData.flat().length} informasi ditemukan, menggali informasi lebih lanjut...`)

                const expandedPages = (await Promise.all(uniquePages.map(async page => {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/page/${page.document_id}/${page.page_number}`)
                    return res.json()
                }))).flat()
                console.log(expandedPages)

                // deduplicate
                docPageSet = new Set()
                const uniqueExpandedPages = expandedPages.filter((page) => {
                    if (docPageSet.has(`${page.document_id}-${page.page_number}`)) {
                        return false
                    }
                    docPageSet.add(`${page.document_id}-${page.page_number}`)
                    return true
                })

                const rerankedPagesResponse = await fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/rerank`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: metaprompt?.vector_query,
                        passages: uniqueExpandedPages.flat(),
                    })
                })
                const rerankedPages = await rerankedPagesResponse.json()
                console.log(rerankedPages)
                setState(`${rerankedPages.flat().length} informasi ditemukan, pencarian selesai`)
                console.log(uniqueExpandedPages)
                setSearchResults(rerankedPages)
                setRetrievalLoading(false)
                setQuestion(question)
            }
        })();
    }, [isMetapromptLoading])

    function sendQuestion(question: string) {
        setQuestion(question)
        setChat([...chat, { question, status: "", answer: "", documents: [] }])
        submitMetaprompt({
            query: `
            **Question**
            ${question}

            **Previous Questions**
            ${chat.map((qna, index) => (
            `
            - **Question ${index+1}**
                - **q**: ${qna.question}
                - **a**: ${qna.answer}
            `
            ))}
            
            **Latest Search Result**
            ${searchResults.map((doc, i) => (
            `
            - **Sumber: ${i+1}**
                - **ID:** ${doc.document_id}
                - **Jenis Peraturan:** ${doc.jenis_bentuk_peraturan}
                - **Pemrakarsa:** ${doc.pemrakarsa}
                - **Nomor:** ${doc.nomor}
                - **Tahun:** ${doc.tahun}
                - **Tentang:** ${doc.tentang}
                - **Tempat Penetapan:** ${doc.tempat_penetapan}
                - **Tanggal Ditetapkan:** ${doc.ditetapkan_tanggal}
                - **Pejabat:** ${doc.pejabat_yang_menetapkan}
                - **Status:** ${doc.status}
                - **URL:** ${doc.url}
                - **Dasar Hukum:** ${doc.dasar_hukum ? JSON.stringify(doc.dasar_hukum) : ''}
                - **Mengubah:** ${doc.mengubah ? JSON.stringify(doc.mengubah) : ''}
                - **Diubah Oleh:** ${doc.diubah_oleh ? JSON.stringify(doc.diubah_oleh) : ''}
                - **Mencabut:** ${doc.mencabut ? JSON.stringify(doc.mencabut) : ''}
                - **Dicabut Oleh:** ${doc.dicabut_oleh ? JSON.stringify(doc.dicabut_oleh) : ''}
                - **Melaksanakan Amanat:** ${doc.melaksanakan_amanat_peraturan ? JSON.stringify(doc.melaksanakan_amanat_peraturan) : ''}
                - **Dilaksanakan Oleh:** ${doc.dilaksanakan_oleh_peraturan_pelaksana ? JSON.stringify(doc.dilaksanakan_oleh_peraturan_pelaksana) : ''}
                - **Page Number:** ${doc.page_number}
                - **Isi Dokumen:** ${doc.combined_body}
            `
            ))}
            `,
        })
    }

    useEffect(() => {
        setRetrievalLoading(true)
        if (isFirstQuestionSubmitted) return;
        setChat([...chat, { question, status: "", answer: "", documents: [] }])
        setState("")
        if (!isFirstQuestionSubmitted) {
            submitMetaprompt({
                query: question,
            })
        }
    }, [])

    function onSubmitFollowUpQuestion() {
        if (isLoading || !followUpInput.trim() || isMetapromptLoading) return;
        setRetrievalLoading(true)
        sendQuestion(followUpInput.trim());
        setFollowUpInput("");
    }

    if (!isClient) return null; // Avoid mismatches by not rendering on the server

    return (
        <div className="flex flex-col items-start mx-4 mt-4 mb-12 p-4 bg-light-blue rounded-xl">
            {/* {isLoggedIn ? ( */}
            <AnswerResponseContext.Provider value={chat}>
                <TooltipProvider>
                    {chat.map((qna, index) => (
                        <>
                        <div className="text-xs flex flex-row mt-5">
                            <div className="font-semibold mr-2">
                                Lexin Chat:
                            </div>
                            <div>
                                {qna.status === "" ? "Loading..." : qna.status}
                            </div>
                        </div>
                        <QuestionAnswerSection key={index} index={index} />
                        </>
                    ))}
                </TooltipProvider>
                {(retrievalLoading || isLoading || isMetapromptLoading) && <ReactLoading type="bubbles" color="#192E59" />}
                <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl mt-5 w-full flex justify-between items-center">
                    <input
                        value={followUpInput}
                        onChange={(e) => setFollowUpInput(e.target.value)}
                        placeholder="Tanyakan pertanyaan lanjutan"
                        className="text-md bg-dark-navy-blue w-[80%] focus:outline-none"
                        type="text"
                        disabled={isLoading || retrievalLoading || !isFirstQuestionSubmitted || isMetapromptLoading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSubmitFollowUpQuestion();
                        }}
                    />
                    <div
                        className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
                        onClick={onSubmitFollowUpQuestion}
                    >
                        <Icon icon="mdi:search" style={{ fontSize: "20px" }} />
                    </div>
                </div>
            </AnswerResponseContext.Provider>
            {/* )  */}
            {/* : (
                <div className="flex flex-col justify-center items-center w-full py-6">
                    <Icon icon="icomoon-free:lab" width="50" height="50" />
                    <p className="mt-3">
                        Anda harus login untuk menggunakan AI chatbot Lexin. Klik{" "}
                        <Link className="font-semibold underline" href="/login">
                            disini
                        </Link>{" "}
                        untuk login.
                    </p>
                </div>
            )} */}
        </div>
    );
}

"use client";

import { useContext, useEffect, useRef, useState } from "react";
import QuestionAnswerSection, { RelevantDocs } from "../gen-ai/QuestionAnswerSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLoading from "react-loading";
import { useAuth } from "@/contexts/authContext";

import { experimental_useObject as useObject } from 'ai/react';
import { answerSchema } from "@/types/prompt/answerSchema";
import { SearchResult } from "./DatabaseSearchResultSection";
import { SearchDocumentContext } from "@/hoc/SearchDocumentProvider";
import { object, set } from "zod";
import Link from "next/link";
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import { metapromptSchema } from "@/types/prompt/metapromptSchema";
import { TooltipProvider } from "../ui/tooltip";

interface AnswerResponse {
    question: string;
    answer: {
        document_id: string;
        answer: string;
        page_number: number;
        document_title: string;
    }[]
}

export default function AIAnswerSection({ searchQuery }: { searchQuery: string, relatedDocs: SearchResult[] }) {
    const [followUpInput, setFollowUpInput] = useState("");
    const [isClient, setIsClient] = useState(false); // Ensure client-only rendering
    const [isFirstQuestionSubmitted, setIsFirstQuestionSubmitted] = useState<boolean>(false)
    const [chat, setChat] = useState<AnswerResponse[]>([]);
    const [chatIndex, setChatIndex] = useState<number>(-1);
    const [question, setQuestion] = useState<string>(searchQuery);
    const { searchResults, loading: retrievalLoading, setSearchResults, status, setStatus, setLoading: setRetrievalLoading } = useContext(SearchDocumentContext)
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

    useEffect(() => {
        setIsClient(true); // Mark the component as client-rendered
    }, []);

    useEffect(() => {
        // modify the chat array to include the new response at the index
        setChat(prev => {
            const newChat = [...prev];
            newChat[chatIndex] = {
                question: chat[chatIndex]?.question ?? "",
                answer: (reply?.answer ?? []).filter((ans): ans is { document_id: string; answer: string; page_number: number; document_title: string } => ans !== undefined),
            };
            return newChat;
        })
    }, [reply, chatIndex])

    useEffect(() => {
        if (!retrievalLoading && !isMetapromptLoading) {
            submit({
                question,
                relevant_docs: searchResults,
                conversation: chat.map(qna => ({ question: qna.question, answer: qna.answer.map(ans => ans.answer).join("\n") })),
            })
            setIsFirstQuestionSubmitted(true)
            console.log(question)
            setChatIndex(chatIndex + 1)
            setIsFirstQuestionSubmitted(true)
        }
    }, [retrievalLoading, isMetapromptLoading, question])

    useEffect(() => {
        if (!isMetapromptLoading) {
            setRetrievalLoading(true)
            if (!metaprompt?.need_retrieval && !isMetapromptLoading) {
                setRetrievalLoading(false)
                setStatus("Proses pencarian selesai, mulai menjawab pertanyaan")
                setSearchResults([])
                return;
            }
            fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vsm_query: metaprompt?.vector_query,
                    fts_query: metaprompt?.fts_query,
                    berlaku_only: metaprompt?.berlaku_only,
                    tidak_berlaku_only: metaprompt?.tidak_berlaku_only,
                })
            })
                .then(response => {
                    const reader = response!.body!.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
    
                    function read() {
                        reader.read().then(({ done, value }) => {
                            if (done) return;
                            buffer += decoder.decode(value, { stream: true });
                            const lines = buffer.split('\n');
                            buffer = lines.pop()!; // Keep incomplete line
                            lines.forEach(line => {
                                const lineSplit = line.split(';');
                                if (lineSplit.length > 2 && lineSplit[0] === "done") {
                                    // join all data from the 2nd index up to the last index
                                    const data = lineSplit.slice(2).join(';')
                                    setRetrievalLoading(false)
                                    setStatus("Proses pencarian selesai, mulai menjawab pertanyaan")
                                    setSearchResults(JSON.parse(data))
                                } else {
                                    setStatus(lineSplit[1])
                                }
                            });
                            read();
                        });
                    }
                    read();
                });
            setQuestion(question)
        }
    }, [isMetapromptLoading])

    function sendQuestion(question: string) {
        setQuestion(question)
        setChat([...chat, { question, answer: [] }])
        submitMetaprompt({
            query: `
            ${question}

            <previous_question>
            ${chat.map((qna, index) => (
                `
                    <question>${qna.question}</question>
                    <answer>${qna.answer.map(ans => ans.answer).join("\n")}</answer>
                `
                ))}
            </previous_question>
            <latestsearch>
            ${searchResults.map(doc => (
                `
                <sumber>
                    <id>${doc.document_id}</id>
                    <jenis_bentuk_peraturan>${doc.jenis_bentuk_peraturan}</jenis_bentuk_peraturan>
                    <pemrakarsa>${doc.pemrakarsa}</pemrakarsa>
                    <nomor>${doc.nomor}</nomor>
                    <tahun>${doc.tahun}</tahun>
                    <tentang>${doc.tentang}</tentang>
                    <tempat_penetapan>${doc.tempat_penetapan}</tempat_penetapan>
                    <ditetapkan_tanggal>${doc.ditetapkan_tanggal}</ditetapkan_tanggal>
                    <pejabat_yang_menetapkan>${doc.pejabat_yang_menetapkan}</pejabat_yang_menetapkan>
                    <status>${doc.status}</status>
                    <url>${doc.url}</url>
                    ${doc.dasar_hukum ? `<dasar_hukum>${doc.dasar_hukum.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</dasar_hukum>` : ''}
                    ${doc.mengubah ? `<mengubah>${doc.mengubah.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</mengubah>` : ''}
                    ${doc.diubah_oleh ? `<diubah_oleh>${doc.diubah_oleh.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</diubah_oleh>` : ''}
                    ${doc.mencabut ? `<mencabut>${doc.mencabut.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</mencabut>` : ''}
                    ${doc.dicabut_oleh ? `<dicabut_oleh>${doc.dicabut_oleh.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</dicabut_oleh>` : ''}
                    ${doc.melaksanakan_amanat_peraturan ? `<melaksanakan_amanat_peraturan>${doc.melaksanakan_amanat_peraturan.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</melaksanakan_amanat_peraturan>` : ''}
                    ${doc.dilaksanakan_oleh_peraturan_pelaksana ? `<dilaksanakan_oleh_peraturan_pelaksana>${doc.dilaksanakan_oleh_peraturan_pelaksana.map(dasar => `<ref>${dasar.ref}</ref><url>${dasar.url}</url><text>${dasar.text}</text>`).join('')}</dilaksanakan_oleh_peraturan_pelaksana>` : ''}
                    <page_number>${doc.page_number}</page_number>
                    <combined_body>${doc.combined_body}</combined_body>
                </sumber>    
                `
            ))}
            </latestsearch>
            `,
        })
    }

    useEffect(() => {
        setRetrievalLoading(true)
        if (isFirstQuestionSubmitted) return;
        setChat([...chat, { question, answer: [] }])
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
            <>
                <TooltipProvider>
                    {chat.map((qna, index) => (
                        <>
                        <div className="text-xs flex flex-row mt-5">
                            <div className="font-semibold mr-2">
                                Lexin Chat:
                            </div>
                            <div>
                                {status === "" ? "Loading..." : status}
                            </div>
                        </div>
                        <QuestionAnswerSection key={index} question={qna.question} answer={qna?.answer ?? []} />
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
            </>
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

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

interface AnswerResponse {
    question: string;
    answer: string;
    relevant_docs: RelevantDocs[];
}

export default function AIAnswerSection({ searchQuery }: { searchQuery: string, relatedDocs: SearchResult[] }) {
    const [followUpInput, setFollowUpInput] = useState("");
    const [isClient, setIsClient] = useState(false); // Ensure client-only rendering
    const [isFirstQuestionSubmitted, setIsFirstQuestionSubmitted] = useState<boolean>(false)
    const [chat, setChat] = useState<AnswerResponse[]>([]);
    const [chatIndex, setChatIndex] = useState<number>(-1);

    const { searchResults, loading, setSearchResults } = useContext(SearchDocumentContext)
    const { object: reply, submit, isLoading } = useObject({
        api: '/api/v1/ask',
        schema: answerSchema,
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
                answer: reply?.answer ?? "",
                relevant_docs: reply?.source as any ?? []
            };
            return newChat;
        })
    }, [reply, chatIndex])

    function sendQuestion(question: string) {
        if (isFirstQuestionSubmitted) {
            fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/query`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: question, history: chat.map(qna => `user: ${qna.question}\nsystem: ${qna.answer}`) })
            }).then(response => response.json())
                .then((response: SearchResult[]) => {
                    setSearchResults(response)
                })
        }
        submit({
            question,
            relevant_docs: searchResults
        })
        setChat([...chat, { question, answer: reply?.answer ?? "", relevant_docs: reply?.source as any ?? [] }])
        setChatIndex(chatIndex + 1)
        setIsFirstQuestionSubmitted(true)
    }



    useEffect(() => {
        if (!loading && !isFirstQuestionSubmitted) {
            sendQuestion(searchQuery)
            setIsFirstQuestionSubmitted(true)
        }
    }, [loading])

    function onSubmitFollowUpQuestion() {
        if (isLoading || !followUpInput.trim()) return;
        sendQuestion(followUpInput.trim());
        setFollowUpInput("");
    }



    if (!isClient) return null; // Avoid mismatches by not rendering on the server

    return (
        <div className="flex flex-col items-start mx-4 mt-4 mb-12 p-4 bg-light-blue rounded-xl">
            {isLoggedIn ? (
                <>
                    <div className="text-xs flex flex-row">
                        <div className="font-semibold mr-2">
                            Connection to AI Chatbot status:
                        </div>
                        <div>
                            {loading ? "Mencari dokumen yang relevan..." : (isLoading ? "Sedang Menjawab." : "Selesai Menjawab.")}
                        </div>
                    </div>
                    {chat.map((qna, index) => (
                        <QuestionAnswerSection question={qna.question} answer={qna?.answer ?? ""} relevant_docs={qna?.relevant_docs?.filter((doc): doc is RelevantDocs => doc?.title !== undefined) ?? []} />
                    ))}
                    {(loading || isLoading) && <ReactLoading type="bubbles" color="#192E59" />}
                    <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl mt-5 w-full flex justify-between items-center">
                        <input
                            value={followUpInput}
                            onChange={(e) => setFollowUpInput(e.target.value)}
                            placeholder="Tanyakan pertanyaan lanjutan"
                            className="text-md bg-dark-navy-blue w-[80%] focus:outline-none"
                            type="text"
                            disabled={isLoading || loading || !isFirstQuestionSubmitted}
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
            ) : (
                <div className="flex flex-col justify-center items-center w-full py-6">
                    <Icon icon="icomoon-free:lab" width="50" height="50" />
                    <p className="mt-3">
                        Anda harus login untuk menggunakan AI chatbot Lexin. Klik{" "}
                        <a className="font-semibold underline" href="/login">
                            disini
                        </a>{" "}
                        untuk login.
                    </p>
                </div>
            )}
        </div>
    );
}

"use client";

import { useContext, useEffect, useRef, useState } from "react";
// import QuestionAnswerSection, { RelevantDocs } from "../gen-ai/QuestionAnswerSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLoading from "react-loading";
import { useAuth } from "@/contexts/authContext";

import { experimental_useObject as useObject, useChat } from 'ai/react';
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
    const { searchResults, loading: retrievalLoading, setSearchResults, status, setStatus, setLoading: setRetrievalLoading } = useContext(SearchDocumentContext)
    const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
        api: `${process.env.NEXT_PUBLIC_LLM_API_PATH!}/ask`,
    });

    useEffect(() => {
        if (searchQuery) {
            setInput(searchQuery);
            handleSubmit()
        }
    }, [])

    const authContext = useAuth();
    const isLoggedIn = !!authContext.accessToken;

    return (
        <div className="flex flex-col items-start mx-4 mt-4 mb-12 p-4 bg-light-blue rounded-xl">
            {/* {isLoggedIn ? ( */}
            <>
                <TooltipProvider>
                    {messages.map((qna, index) => (
                        <>
                        <div className="text-xs flex flex-row mt-5">
                            <div className="font-semibold mr-2">
                                Lexin Chat:
                            </div>
                            <div>
                                {status === "" ? "Loading..." : status}
                            </div>
                        </div>
                        {/* <QuestionAnswerSection key={index} question={qna.question} answer={qna?.answer ?? []} /> */}
                        {
                            qna.role === "user" ? (
                                <div className="flex flex-row items-center mt-3">
                                    <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl max-w-[80%]">
                                        {qna.content}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row items-center mt-3">
                                    <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl max-w-[80%]">
                                        {qna.content}
                                    </div>
                                </div>
                            )
                        }
                        </>
                    ))}
                </TooltipProvider>
                {(isLoading) && <ReactLoading type="bubbles" color="#192E59" />}
                <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl mt-5 w-full flex justify-between items-center">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Tanyakan pertanyaan lanjutan"
                        className="text-md bg-dark-navy-blue w-[80%] focus:outline-none"
                        type="text"
                        disabled={isLoading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                        }}
                    />
                    <div
                        className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
                        onClick={handleSubmit}
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

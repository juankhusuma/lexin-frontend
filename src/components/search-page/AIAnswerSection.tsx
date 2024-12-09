import { useEffect, useRef, useState } from "react";
import QuestionAnswerSection from "../gen-ai/QuestionAnswerSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLoading from "react-loading";
import { useAuth } from "@/contexts/authContext";

interface QuestionAnswerObject {
    question: string;
    answer: string;
}

interface AnswerServerResponse {
    answer: string;
}

export default function AIAnswerSection({ searchQuery }: { searchQuery: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    const [followUpInput, setFollowUpInput] = useState("");
    const [questionAnswerInteractions, setQuestionAnswerInteractions] = useState<QuestionAnswerObject[]>([]);
    const latestSubmittedQuestion = useRef(searchQuery);
    const [isClient, setIsClient] = useState(false); // Ensure client-only rendering
    const [isFirstQuestionSubmitted, setIsFirstQuestionSubmitted] = useState<boolean>(false)
    const [chatBotConnectionStatus, setChatBotConnectionStatus] = useState<string>("Connecting...")

    const chatRoomId = 1;
    const authContext = useAuth();
    const isLoggedIn = !!authContext.accessToken;

    useEffect(() => {
        setIsClient(true); // Mark the component as client-rendered
    }, []);

    function getBackendUrlWithoutHttp() {
        const originalUrl = process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL || "";
        return originalUrl.replace(/^https?:\/\//, "");
    }

    function connectToChatRoom() {
        if (!isClient || !isLoggedIn) return;

        const baseUrl = getBackendUrlWithoutHttp();
        const accessToken = authContext.accessToken?.split(" ")[1];
        const ws = new WebSocket(`wss://${baseUrl}/api/v1/chat/ws?token=${accessToken}&chat_room_id=${chatRoomId}`);

        ws.onopen = () => {
            console.log("WebSocket connection established.");
            setChatBotConnectionStatus("Connected.")
            setSocket(ws)
        };

        ws.onmessage = (event) => {
            const getLatestSubmittedQuestion = latestSubmittedQuestion.current 
            const answer = JSON.parse(event.data) as AnswerServerResponse;
            console.log("Message received:", event.data);
            appendNewInteraction(getLatestSubmittedQuestion, answer.answer);
            setLoadingAnswer(false);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setChatBotConnectionStatus("Failed to connect.")
        };

        return () => ws.close(); // Cleanup WebSocket connection on unmount
    }

    useEffect(() => {
        if (isClient && isLoggedIn) {
            connectToChatRoom();
        }
    }, [isClient, isLoggedIn]);

    function appendNewInteraction(question: string, answer: string) {
        const newInteraction: QuestionAnswerObject = { question, answer };
        setQuestionAnswerInteractions((prev) => [...prev, newInteraction]);
    }

    function sendQuestion(question: string) {
        latestSubmittedQuestion.current = question
        if (socket) {
            console.log(`sending question: ${question}`)
            socket.send(JSON.stringify({ question }));
            setLoadingAnswer(true);
        }
    }

    useEffect(() => {
        if (socket && !isFirstQuestionSubmitted) {
            sendQuestion(searchQuery)
            setIsFirstQuestionSubmitted(true)
        }
    }, [socket])

    function onSubmitFollowUpQuestion() {
        if (loadingAnswer || !followUpInput.trim()) return;
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
                            {chatBotConnectionStatus}
                        </div>
                    </div>
                    {questionAnswerInteractions.map((qna, index) => (
                        <QuestionAnswerSection key={index} question={qna.question} answer={qna.answer} />
                    ))}
                    {loadingAnswer && <ReactLoading type="bubbles" color="#192E59" />}
                    <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl mt-5 w-full flex justify-between items-center">
                        <input
                            value={followUpInput}
                            onChange={(e) => setFollowUpInput(e.target.value)}
                            placeholder="Tanyakan pertanyaan lanjutan"
                            className="text-md bg-dark-navy-blue w-[80%] focus:outline-none"
                            type="text"
                            disabled={loadingAnswer || socket === null}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSubmitFollowUpQuestion();
                            }}
                        />
                        <div
                            className={loadingAnswer ? "cursor-not-allowed" : "cursor-pointer"}
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

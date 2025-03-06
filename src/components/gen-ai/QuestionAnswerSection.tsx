import { Icon } from "@iconify/react/dist/iconify.js"
import AIAnswer from "./AIAnswer"
import UserChatBox from "./UserChatBox"
import { useState } from "react"
import copyToClipboard from "@/utils/copyToClipboard"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

function FeedbackButtons({ answer, context }: { answer: string, context: {
    document_id: string;
    answer: string;
    page_number: number;
    document_title: string;
}[] }) {
    const [liked, setLiked] = useState<boolean>(false)
    const [disliked, setDisliked] = useState<boolean>(false)
    const [bookmarked, setBookmarked] = useState<boolean>(false)
    const [likedText, setLikedText] = useState<string>("")
    const [dislikedText, setDislikedText] = useState<string>("")

    function onCopy() {
        copyToClipboard(answer)
    }

    function onLike() {
        setLiked(prev => !prev)
        if (disliked) {
            setDisliked(false)
        }
    }

    function onDislike() {
        setDisliked(prev => !prev)
        if (liked) {
            setLiked(false)
        }
    }

    function onBookmark() {
        setBookmarked(prev => !prev)
    }

    return (
        <div className="flex items-center ml-5">
            <div onClick={onCopy} className="cursor-pointer">
                <Icon icon="iconamoon:copy-duotone" style={{ fontSize: '20px' }} />
            </div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <div onClick={onLike} className="ml-2 cursor-pointer">
                        <Icon icon={liked ? "mdi:like" : "mdi:like-outline"} style={{ fontSize: '20px' }} />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="min-w-[50vw]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center leading-snug mb-5">Berikan Feedback</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form action="">
                                <label htmlFor="like" className="text-sm inline-block">Mengapa Anda menyukai jawaban ini?</label>
                                <textarea 
                                onChange={(e) => setLikedText(e.target.value)}
                               name="" id="like" cols={30} rows={10} className="w-full border border-gray-300 p-3 rounded-md mt-2"></textarea>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={(e) => {
                            fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/like`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    metadata: JSON.stringify({
                                        reason: likedText,
                                        context: context
                                    })
                                })
                            })
                            setLikedText("")
                        }}>Kirim</AlertDialogAction>
                        <AlertDialogCancel onClick={onLike}>Tutup</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger>
                    <div onClick={onDislike} className="ml-2 cursor-pointer">
                        <Icon icon={disliked ? "mdi:dislike" : "mdi:dislike-outline"} style={{ fontSize: '20px' }} />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="min-w-[50vw]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center leading-snug mb-5">Berikan Feedback</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form action="">
                                <label htmlFor="dislike" className="text-sm inline-block">Mengapa Anda tidak menyukai jawaban ini?</label>
                                <textarea 
                                onChange={(e) => setDislikedText(e.target.value)}
                                name="" id="dislike" cols={30} rows={10} className="w-full border border-gray-300 p-3 rounded-md mt-2"></textarea>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={(e) => {
                            fetch(`${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST}/dislike`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    metadata: JSON.stringify({
                                        reason: dislikedText,
                                        context: context
                                    })
                                })
                            })
                            setDislikedText("")
                        }}>Kirim</AlertDialogAction>
                        <AlertDialogCancel onClick={onDislike}>Tutup</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* <div onClick={onBookmark} className="ml-2 cursor-pointer">
                <Icon icon={bookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"} style={{fontSize: '20px'}} />
            </div> */}
        </div>
    )
}

interface QuestionAnswerSectionProps {
    question: string
    answer: {
        document_id: string;
        answer: string;
        page_number: number;
        document_title: string;
    }[]
    showUserFeedbackButtons?: boolean
}


export interface RelevantDocs {
    title: string
    text: string
    page_number: number
    chunk_id: string,
    number: string,
    year: string,
}


export default function QuestionAnswerSection({
    question,
    answer,
    showUserFeedbackButtons,
}: QuestionAnswerSectionProps) {

    const getShowUserFeedbackButtons = showUserFeedbackButtons ?? true


    return (
        <>
            <UserChatBox message={question} />
            <AIAnswer answer={answer} />
            {getShowUserFeedbackButtons && <FeedbackButtons answer={answer.map(a => a.answer).join("\n")} context={answer} />}
        </>
    )
}
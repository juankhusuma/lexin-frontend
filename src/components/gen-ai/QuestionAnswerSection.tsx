import { Icon } from "@iconify/react/dist/iconify.js"
import AIAnswer from "./AIAnswer"
import UserChatBox from "./UserChatBox"
import { useState } from "react"
import copyToClipboard from "@/utils/copyToClipboard"
import Link from "next/link"

function FeedbackButtons({ answer }: { answer: string }) {
    const [liked, setLiked] = useState<boolean>(false)
    const [disliked, setDisliked] = useState<boolean>(false)
    const [bookmarked, setBookmarked] = useState<boolean>(false)

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
            {/* <div onClick={onLike} className="ml-2 cursor-pointer">
                <Icon icon={liked ? "mdi:like" : "mdi:like-outline"} style={{fontSize: '20px'}} />
            </div>
            <div onClick={onDislike} className="ml-2 cursor-pointer">
                <Icon icon={disliked ? "mdi:dislike" : "mdi:dislike-outline"} style={{fontSize: '20px'}} />
            </div>
            <div onClick={onBookmark} className="ml-2 cursor-pointer">
                <Icon icon={bookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"} style={{fontSize: '20px'}} />
            </div> */}
        </div>
    )
}

interface QuestionAnswerSectionProps {
    question: string
    answer: string
    showUserFeedbackButtons?: boolean
    relevant_docs: RelevantDocs[]
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
    relevant_docs
}: QuestionAnswerSectionProps) {

    const getShowUserFeedbackButtons = showUserFeedbackButtons ?? true


    return (
        <>
            <UserChatBox message={question} />
            <AIAnswer message={answer} urls={relevant_docs.map(doc => `/legal-doc/undang-undang-nomor-${doc.number}-tahun-${doc.year}`)} />
            {getShowUserFeedbackButtons && <FeedbackButtons answer={answer} />}
            <div className="flex items-center gap-1 w-full mt-5 px-3">
                <p className="text-[#223d71] font-bold">Sumber Terkait</p>
                <div className="bg-[#d61b23] rounded-full flex-1 h-[2px]" />
            </div>
            <div className="flex overflow-auto max-w-full gap-5 py-3">
                {relevant_docs.map((doc, index) => (
                    <Link href={`/legal-doc/undang-undang-nomor-${doc.number}-tahun-${doc.year}`}>
                        <div key={index} className="flex-1 min-w-80 p-3 rounded-md border border-blue-100 shadow-sm">
                            <div className="font-semibold text-dark-navy-blue">
                                {doc.title.length > 50 ? `${doc.title.substring(0, 47)}...` : doc.title}
                            </div>
                            <div className="text-[#4C4D53] text-sm mt-2">
                                {doc.text.length > 100 ? `${doc.text.substring(0, 97)}...` : doc.text}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
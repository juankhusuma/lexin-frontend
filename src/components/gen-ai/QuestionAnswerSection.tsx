import { Icon } from "@iconify/react/dist/iconify.js"
import AIAnswer from "./AIAnswer"
import UserChatBox from "./UserChatBox"
import { useState } from "react"
import copyToClipboard from "@/utils/copyToClipboard"

function FeedbackButtons({ answer } : {answer: string}) {
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
        <div className="flex items-center">
            <div onClick={onCopy} className="cursor-pointer">
                <Icon icon="iconamoon:copy-duotone" style={{fontSize: '20px'}} />                
            </div>
            <div onClick={onLike} className="ml-2 cursor-pointer">
                <Icon icon={liked ? "mdi:like" : "mdi:like-outline"} style={{fontSize: '20px'}} />
            </div>
            <div onClick={onDislike} className="ml-2 cursor-pointer">
                <Icon icon={disliked ? "mdi:dislike" : "mdi:dislike-outline"} style={{fontSize: '20px'}} />
            </div>
            <div onClick={onBookmark} className="ml-2 cursor-pointer">
                <Icon icon={bookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"} style={{fontSize: '20px'}} />
            </div>
        </div>
    )
}

interface QuestionAnswerSectionProps {
    question: string
    answer: string
    showUserFeedbackButtons?: boolean
}
export default function QuestionAnswerSection({
    question, 
    answer, 
    showUserFeedbackButtons
} : QuestionAnswerSectionProps) {
    
    const getShowUserFeedbackButtons = showUserFeedbackButtons ?? true


    return (
        <div className="flex flex-col mb-6">
            <UserChatBox message={question} />
            <AIAnswer message={answer} />
            {getShowUserFeedbackButtons && <FeedbackButtons answer={answer}/>}
        </div>
    )
}
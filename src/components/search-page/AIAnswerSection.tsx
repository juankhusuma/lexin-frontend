import { useEffect, useState } from "react"
import QuestionAnswerSection from "../gen-ai/QuestionAnswerSection"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader } from "@mantine/core"

interface QuestionAnswerObject {
    question: string
    answer: string
}

export default function AIAnswerSection({searchQuery} : {searchQuery : string}) {
    const [loadingFollowUpAnswer, setLoadingFollowUpAnswer] = useState<boolean>(false)
    const [initialAnswer, _setInitialAnswer] = useState<string>("Loading...")
    const [followUpInput, setFollowUpInput] = useState<string>("")
    const [questionAnswerInteractions, setQuestionAnswerInteractions] = useState<QuestionAnswerObject[]>([
        {
            question: searchQuery,
            answer: initialAnswer
        }
    ])


    function appendNewInteraction(question: string, answer: string) {
        const newInteraction : QuestionAnswerObject = {question, answer}
        setQuestionAnswerInteractions(prev => {
            const newArr = prev.slice()
            newArr.push(newInteraction)
            return newArr
        })
    }


    function onSubmitFollowUpQuestion() {
        if (loadingFollowUpAnswer) {
            return
        }

        setLoadingFollowUpAnswer(true)

        setTimeout(() => {
            appendNewInteraction(followUpInput, "Example Answer")
            setLoadingFollowUpAnswer(false)
            setFollowUpInput("")
        }, 2000)
    }

    useEffect(() => {
        if (questionAnswerInteractions.length === 0) {
            appendNewInteraction(searchQuery, "Example Answer")
        }
    }, [])

    return (
        <div className="flex flex-col items-start m-4 p-4 bg-light-blue rounded-xl">
            {questionAnswerInteractions.map(qna => (
                <QuestionAnswerSection 
                    question={qna.question}
                    answer={qna.answer}
                />
            ))}
            {loadingFollowUpAnswer && <Loader />}

            <div className="text-white bg-dark-navy-blue px-6 py-3 rounded-xl mt-5 w-full flex justify-between items-center">
                <input
                    value={followUpInput}
                    onChange={e => {
                        setFollowUpInput(e.target.value)
                    }} 
                    placeholder="Tanyakan pertanyaan lanjutan" 
                    className="text-md bg-dark-navy-blue w-[80%] focus:outline-none" 
                    type="text"
                    disabled={loadingFollowUpAnswer}
                />
                <div className={loadingFollowUpAnswer ? "cursor-not-allowed" : "cursor-pointer"} onClick={onSubmitFollowUpQuestion}>
                    <Icon icon="mdi:search" style={{ fontSize: '20px' }} />
                </div>
            </div>
        </div>
    )
}
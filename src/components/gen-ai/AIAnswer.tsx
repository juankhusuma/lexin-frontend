import parse from "html-react-parser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface Result {
    [key: string]: {
        answer: string;
        page_number: number;
        document_title: string;
        document_id: string;
    };
}

export default function AIAnswer({ answer }: {
    answer: {
        document_id: string;
        answer: string;
        page_number: number;
        document_title: string;
    }[]
}) {
    const result: Result = {}
    answer.forEach((ans) => {
        if (!result[ans.document_id]) {
            result[ans.document_id] = {
                answer: ans.answer,
                page_number: ans.page_number,
                document_title: ans.document_title,
                document_id: ans.document_id
            }
        } else {
            result[ans.document_id] = {
                answer: result[ans.document_id].answer + "\n" + ans.answer,
                page_number: ans.page_number,
                document_title: ans.document_title,
                document_id: ans.document_id
            }
        }
    })

    return (
        <div
            className="text-dark-navy-blue mt-3 mb-1 ml-5 w-full pr-5 max-w-full prose"
        >
            {Object.keys(result).map((key, index) => (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Tooltip>
                            <TooltipTrigger key={index} className="hover:bg-gray-300 hover:bg-opacity-25 cursor-pointer px-3 py-[2px] rounded-md text-left">
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {result[key].answer}
                                </Markdown>
                                {result[key]?.document_title && (<TooltipContent className="text-wrap max-w-[800px]">
                                    <ol>
                                        {result[key].document_title.split(",").map((title, index) => (
                                            <li key={index}>{parse(title)}</li>
                                        ))}
                                    </ol>
                                </TooltipContent>)}
                            </TooltipTrigger>
                        </Tooltip>
                    </AlertDialogTrigger>
                    {
                        result[key]?.document_title && (
                            <AlertDialogContent className="min-w-[50vw]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-center leading-snug mb-5">{result[key]?.document_title}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <object className="relative w-full h-[800px]" type="application/pdf" data={`https://lexin.cs.ui.ac.id/chat/static/doc/${result[key]?.document_id}#page=${result[key]?.page_number}`}></object>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Tutup</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )
                    }
                </AlertDialog>
            ))}
        </div>
    )
}
import parse from "html-react-parser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function AIAnswer({ answer }: {
    answer: {
        document_id: string;
        answer: string;
        page_number: number;
    }[]
}) {
    // const re = /<cite>([0-9])+<\/cite>/g;
    // message = message.replace(re, (match, p1) => `[[${parseInt(p1) + 1}]](${urls[parseInt(p1)]})`);
    return (
        <div
            className="text-dark-navy-blue mt-3 mb-1 ml-5 w-full pr-5 max-w-full prose"
        >
            {/* <Markdown remarkPlugins={[remarkGfm]}>
                {message}
            </Markdown> */}
            {answer.map((ans, index) => (
                <div className="hover:bg-gray-300 hover:bg-opacity-25 cursor-pointer px-2 rounded-md" key={index}>
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {ans.answer + "\n\n" + ans.document_id}
                    </Markdown>
                </div>
            ))}
        </div>
    )
}
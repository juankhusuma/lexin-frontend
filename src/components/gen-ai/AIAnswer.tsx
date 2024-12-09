import parse from "html-react-parser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function AIAnswer({ message } : { message: string }) {
    return (
        <div
            className="text-dark-navy-blue mt-3 mb-6 ml-5"
        >
            <Markdown remarkPlugins={[remarkGfm]}>
                {message}
            </Markdown> 
        </div>
    )
}
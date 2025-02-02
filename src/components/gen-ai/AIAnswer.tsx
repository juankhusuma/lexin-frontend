import parse from "html-react-parser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function AIAnswer({ message, urls } : { message: string, urls: string[] }) {
    const re = /<cite>([0-9])+<\/cite>/g;
    message = message.replace(re, (match, p1) => `[[${parseInt(p1) + 1}]](${urls[parseInt(p1)]})`);
    return (
        <div
            className="text-dark-navy-blue mt-3 mb-1 ml-5 w-full pr-5 max-w-full prose"
        >
            <Markdown remarkPlugins={[remarkGfm]}>
                {message}
            </Markdown> 
        </div>
    )
}
import parse from "html-react-parser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { AnswerResponse } from "../search-page/AIAnswerSection";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { SearchDocumentContext } from "@/hoc/SearchDocumentProvider";

interface ReferenceProps {
    documents: AnswerResponse["documents"];
}

function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

function References({ documents }: ReferenceProps) {
    const { searchResults } = useContext(SearchDocumentContext)
    
    console.log(documents);
    if (!documents) return <></>;

    console.log(documents);

    // aggregate documents, collect pages by document_id
    const docMap = new Map<string, string[]>();
    documents!.forEach(doc => {
        if (docMap.has(doc.document_id!)) {
            docMap.get(doc.document_id!)!.push((doc.page_number ?? "").toString());
        } else {
            docMap.set(doc.document_id!, [(doc.page_number ?? "").toString()]);
        }
    });
    
    docMap.forEach((pages, docId) => {
        docMap.set(docId, Array.from(new Set(pages)));
    });

    docMap.forEach((pages, docId) => {
        docMap.set(docId, pages.sort((a, b) => parseInt(a) - parseInt(b)));
    });

    return (<Accordion type="single" collapsible className="w-full">
        {
            docMap.size > 0 && Array.from(docMap).map(([docId, pages], index) => (
                <AccordionItem className="!m-0 !p-0" value={`item-${index}`} key={docId}>
                    <AccordionTrigger className="text-dark-navy-blue text-sm !my-0 border-2 px-3 rounded-md border-dark-navy-blue bg-opacity-80">{toTitleCase(searchResults!.find(doc => doc.document_id === docId)?.title ?? "")}</AccordionTrigger>
                    <AccordionContent className="border-2 px-3 !m-0 border-dark-navy-blue rounded-md">
                        <div className="text-sm">
                            {
                                pages.map(page => (
                                    <div key={page} className="">
                                        <div className="mr-2 flex items-center">
                                            <p className="font-semibold">Halaman {page}</p>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="cursor-pointer">
                                                        <Icon icon="mdi:content-copy" onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.navigator.clipboard.writeText(`https://docs.google.com/document/d/${docId}/edit#heading=h.${page}`);
                                                        }}/>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" align="center" className="bg-dark-navy-blue text-white p-2 rounded-md">
                                                    Salin halaman {page}
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {documents!.find(doc => doc.document_id === docId && doc.page_number === parseInt(page))?.excerpt}
                                        </Markdown>
                                    </div>
                                ))
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))
        }
    </Accordion>)
}

export default function AIAnswer({ answer, documents }: AnswerResponse) {
    const [citations, setCitationMap] = useState<string[]>([]);
    const { searchResults } = useContext(SearchDocumentContext)
    return (
        <div
            className="text-dark-navy-blue mt-3 mb-1 ml-5 w-full pr-5 max-w-full prose"
        >
            <div className="px-3 py-[2px] rounded-md text-left">
                <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Parse citations and convert to tooltips
                        a: ({ href }) => {
                        if (!citations.includes(href ?? "")) {
                            setCitationMap([...citations, href ?? ""]);
                        }
                        if (!href) return <></>;
                        const citationNumber = citations.indexOf(href) + 1;
                        const doc = documents!.find(d =>
                            ((d.document_id)?.replace(".pdf", "") === (href ?? "").split('#')[0]?.replace(".pdf", "")) &&
                            (d.page_number === parseInt((href ?? "").split('#')[1]))
                        );
                        console.log(doc)
                        if (!doc) return <></>;
                        
                        return (
                            <CitationTooltip
                              index={citationNumber}
                              document_title={toTitleCase(searchResults.find((s) => s.document_id === doc.document_id)?.title ?? "")}
                              page_number={doc.page_number as any}
                              excerpt={doc.excerpt?.slice(0, 200) + '...'}
                            />
                        )}
                    }}
                >
                    {answer}
                </Markdown>
            </div>
            <References documents={documents} />
        </div>
    )
}

function CitationTooltip(props: {
    index: number;
    document_title: string;
    page_number: number;
    excerpt: string;
}) {
    if (!props) return null;
    return (
        <Tooltip>
          <TooltipTrigger className="bg-dark-navy-blue bg-opacity-75 h-[25px] text-white rounded-md text-xs p-1 !aspect-square tracking-tight leading-tight">
            {props.index}
          </TooltipTrigger>
          <TooltipContent className="max-w-[400px] bg-slate-100 border-dark-navy-blue border-2 rounded-md p-2">
            <h1 className="mb-3 font-bold text-center text-dark-navy-blue">{props.document_title}</h1>
            <p className="font-semibold text-xs mb-2 text-dark-navy-blue text-opacity-95">Halaman {props.page_number}</p>
            <p className="text-xs text-dark-navy-blue text-opacity-75">{props.excerpt}</p>
          </TooltipContent>
        </Tooltip>
    );
  }
  
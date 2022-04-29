import React from "react";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

export interface MarkdownProperty {
  markdownSrc: string,
}

const Markdown : React.FC<MarkdownProperty> = (props) => {

  return (
    <ReactMarkdown
      children={props.markdownSrc}
      remarkPlugins={[remarkGfm]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={dark}
              language={match[1]}
              PreTag={"div"}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default Markdown;

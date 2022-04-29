import React, {useState} from "react";
import ProCard from "@ant-design/pro-card";
import "react-mde/lib/styles/css/react-mde-all.css";
import Markdown from "@/pages/markdown/Markdown";


export interface EditMarkdownProperty {
  markdownSrc: string,
  loading: boolean,
}

const EditMarkdown : React.FC<EditMarkdownProperty> = (props) => {

  const [markdownSrc, setMarkdownSrc] = useState("");
  // const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

  const commands = () => {
    const defaultCommons = getDefaultToolbarCommands();
    console.log(defaultCommons);
    return defaultCommons;
  }

  return (
    <ProCard colSpan={24} layout={"center"} direction={'row'}>
      <ProCard colSpan={'50%'} bordered>
        {/*<TextArea*/}
        {/*  style={{height: 650}}*/}
        {/*  required*/}
        {/*  disabled={props.loading}*/}
        {/*  onInput={(e) => {*/}
        {/*    setMarkdownSrc(e.currentTarget.value);*/}
        {/*  }} />*/}
        {/*<Editor value={markdownSrc} onChange={(value) => {*/}
        {/*  setMarkdownSrc(value);*/}
        {/*}}/>*/}
        {/*<ReactMde value={markdownSrc} onChange={setMarkdownSrc} />*/}
      {/*  <div style={{width: '100%', height: '100%', position: "relative", padding: 16}}>*/}
      {/*    <ReactMde*/}
      {/*      toolbarCommands={getDefaultToolbarCommands()}*/}
      {/*      minEditorHeight={600}*/}
      {/*      maxEditorHeight={600}*/}
      {/*      value={markdownSrc}*/}
      {/*      onChange={setMarkdownSrc}*/}
      {/*      selectedTab={selectedTab}*/}
      {/*      onTabChange={setSelectedTab}*/}
      {/*      generateMarkdownPreview={(markdown) =>*/}
      {/*        Promise.resolve(<ReactMarkdown*/}
      {/*          children={markdownSrc}*/}
      {/*          remarkPlugins={[remarkGfm]}*/}
      {/*          components={{*/}
      {/*            code({node, inline, className, children, ...props}) {*/}
      {/*              const match = /language-(\w+)/.exec(className || '');*/}
      {/*              return !inline && match ? (*/}
      {/*                <SyntaxHighlighter*/}
      {/*                  children={String(children).replace(/\n$/, '')}*/}
      {/*                  style={dark}*/}
      {/*                  language={match[1]}*/}
      {/*                  PreTag={"div"}*/}
      {/*                  {...props}*/}
      {/*                />*/}
      {/*              ) : (*/}
      {/*                <code className={className} {...props}>*/}
      {/*                  {children}*/}
      {/*                </code>*/}
      {/*              )*/}
      {/*            },*/}
      {/*          }}*/}
      {/*        />)*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</ProCard>*/}
      {/*<ProCard colSpan={'50%'} bordered>*/}
      {/*  <div style={{height: 731}}>*/}
      {/*    <Markdown markdownSrc={markdownSrc}/>*/}
      {/*  </div>*/}
      {/*</ProCard>*/}
        <div style={{width: '100%', height: '100%', position: "relative", padding: 16}}>
          <ReactMde
            toolbarCommands={commands()}
            minEditorHeight={600}
            maxEditorHeight={600}
            value={markdownSrc}
            onChange={setMarkdownSrc}
          />
        </div>
      </ProCard>
      <ProCard colSpan={'50%'} bordered>
        <div style={{height: 731}}>
          <Markdown markdownSrc={markdownSrc}/>
        </div>
      </ProCard>
    </ProCard>
  )
}

export default EditMarkdown;

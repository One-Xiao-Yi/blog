import React from "react";
import ProCard from "@ant-design/pro-card";
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import {UploadFunc} from "react-markdown-editor-lite/cjs/share/var";

type change = (data: {
  text: string;
  html: string;
}, event?: React.ChangeEvent<HTMLTextAreaElement>) => void;

export interface EditMarkdownProperty {
  markdownSrc: string,
  readonly: boolean,
  onChange?: change,
  onImageUpload?: UploadFunc,
}

const EditMarkdown : React.FC<EditMarkdownProperty> = (props) => {

  const highLight = require('highlight.js');
  const md = require("markdown-it")({
    highlight: (str: string, lang: string) => {
      if (lang && highLight.getLanguage(lang)) {
        try {
          return highLight.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // 使用额外的默认转义
    }
  })
  md.linkify.set({ fuzzyEmail: false });

  return (
    <ProCard colSpan={24} layout={"center"} direction={'row'}>
      <ProCard colSpan={'100%'}>
        <MdEditor
          style={{ height: '500px', width: '100%' }}
          onChange={props.onChange}
          readOnly={props.readonly}
          view={{menu: !props.readonly, md: !props.readonly, html: true}}
          value={props.markdownSrc}
          onImageUpload={props.onImageUpload}
          renderHTML={(text) => md.render(text)}/>
      </ProCard>
    </ProCard>
  )
}

export default EditMarkdown;

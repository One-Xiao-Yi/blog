import React, {useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import ProCard from "@ant-design/pro-card";
import {Button, Input, message} from "antd";
import {fileUpload, saveBlog} from "@/services/ant-design-pro/api";
import EditMarkdown from "@/pages/markdown/EditMarkdown";

const Create : React.FC = () => {

  const [markdownSrc, setMarkdownSrc] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  const {initialState} = useModel('@@initialState');

  const save = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!description || description == "") {
      setDescription(markdownSrc.slice(0, 200));
    }
    if (initialState && initialState.currentUser && initialState.currentUser.id) {
      const blog: API.BlogModel = {
        id: blogId,
        title: title,
        description: description,
        createdBy: initialState.currentUser.id,
        src: markdownSrc,
        files: files,
      }
      try {
        const blogRes : API.BlogObjectResponse = await saveBlog(blog);
        if (blogRes.success) {
          setBlogId(blogRes.data?.id || "");
          message.success("保存成功");
        } else {
          message.error("保存失败：" + blogRes.msg);
        }
      } catch (e: any) {
        message.error("保存失败：" + e.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const imageUpload = async (file: any) => {
    return new Promise(resolve => {
      console.log(typeof file);
      console.log(file);
      fileUpload(file).then((fileRes) => {
        if (fileRes.success && fileRes.data && fileRes.data.id){
          resolve('/api/file/download/' + fileRes.data.id);
        }
      })
    });
  }

  return (
    <ProCard
      direction={'column'}
    >
      <ProCard colSpan={24} >
        <Input placeholder={"标题"} required onInput={(e) => {
          setTitle(e.currentTarget.value);
        }} style={{width: '100%', position: 'relative'}}/>
      </ProCard>
      <ProCard colSpan={24} >
        <Input placeholder={"描述"} onInput={(e) => {
          setDescription(e.currentTarget.value);
        }} style={{width: '100%', position: 'relative'}}/>
      </ProCard>
      <EditMarkdown markdownSrc={markdownSrc} readonly={loading} onChange={(value) => setMarkdownSrc(value.text)} onImageUpload={imageUpload}/>
      <ProCard colSpan={24} layout={"center"} direction={"row"}>
        <ProCard colSpan={1} layout={"center"}>
          <Button disabled={loading} type={'primary'} onClick={save}>保存</Button>
        </ProCard>
        <ProCard colSpan={1} layout={"center"}>
          <Button disabled={loading} onClick={() => {history.back();}}>返回</Button>
        </ProCard>
      </ProCard>
    </ProCard>
  )

}

export default Create;

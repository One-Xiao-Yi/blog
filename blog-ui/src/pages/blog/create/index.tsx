import React, {useEffect, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import ProCard from "@ant-design/pro-card";
import {Button, Input, message} from "antd";
import {fileUpload, getBlogDetail, saveBlog} from "@/services/ant-design-pro/api";
import EditMarkdown from "@/pages/markdown/EditMarkdown";
import ImageUpload from "@/pages/upload/image/ImageUpload";
import {UnAuthError} from "@/exceptions/UnAuthException";
import {history} from "umi";

const Create : React.FC = () => {

  const [markdownSrc, setMarkdownSrc] = useState('');
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [cover, setCover] = useState("");

  const {initialState, setInitialState} = useModel('@@initialState');

  useEffect(() => {
    const blogId = history.location.query?.blogId?.toString();
    if (blogId) {
      getBlogDetail(blogId).then((res: API.BlogObjectResponse) => {
        if (res.success && res.data) {
          setMarkdownSrc(res.data.src || '');
          setTitle(res.data.title);
          setBlogId(res.data.id || '');
          setCover(res.data.cover || '')
        }
      })
    }
  }, [])

  const save = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (initialState && initialState.currentUser && initialState.currentUser.id) {
      const blog: API.BlogModel = {
        id: blogId,
        title: title,
        createdBy: initialState.currentUser.id,
        src: markdownSrc,
        cover: cover,
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
        if (e instanceof UnAuthError) {
          setInitialState((prevInitialState: any) => ({
            ...prevInitialState,
            token: null,
            currentUser: null,
          }))
          message.error("保存失败：" + e.message);
        } else {
          message.error("保存失败：" + e);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  const imageUpload = async (file: any) => {
    return new Promise(resolve => {
      fileUpload(file).then((fileRes) => {
        if (fileRes.success && fileRes.data && fileRes.data.id){
          resolve('/api/file/download/' + fileRes.data.id);
        }
      })
    });
  }

  const handleChange = (fileId: string) => {
    setCover(fileId);
  }

  return (
    <ProCard
      direction={'column'}
    >
      <ProCard colSpan={24} >
        <ImageUpload handChange={handleChange} uploadText={'上传封面'} cover={cover} />
      </ProCard>
      <ProCard colSpan={24} >
        <Input placeholder={"标题"} required onInput={(e) => {
          setTitle(e.currentTarget.value);
        }} value={title} style={{width: '100%', position: 'relative'}}/>
      </ProCard>
      <EditMarkdown markdownSrc={markdownSrc} readonly={loading} onChange={(value) => setMarkdownSrc(value.text)} onImageUpload={imageUpload}/>
      <ProCard colSpan={24} layout={"center"} direction={"row"}>
        <ProCard colSpan={1} layout={"center"}>
          <Button disabled={loading} type={'primary'} onClick={save}>保存</Button>
        </ProCard>
        <ProCard colSpan={1} layout={"center"}>
          <Button disabled={loading} onClick={() => {history.goBack();}}>返回</Button>
        </ProCard>
      </ProCard>
    </ProCard>
  )

}

export default Create;

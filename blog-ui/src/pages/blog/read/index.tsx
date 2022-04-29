import React, {useEffect, useState} from "react";
import {history} from "umi";
import {getBlogDetail} from "@/services/ant-design-pro/api";
import ProCard from "@ant-design/pro-card";
import {Descriptions, PageHeader} from "antd";
import Markdown from "@/pages/markdown/Markdown";

const ReadBlog : React.FC = () => {

  const [blog, setBlog] = useState<API.BlogModel>({
    id: "",
    createdBy: "",
    description: "",
    path: "",
    src: "",
    title: ""
  });

  useEffect(() => {
    const blogId = history.location.query?.blogId?.toString();
    if (blogId) {
      getBlogDetail(blogId).then((res: API.BlogObjectResponse) => {
        if (res.success && res.data) {
          setBlog({
            ...res.data
          })
        }
      })
    }
  }, [])

  const back = () => {
    history.goBack();
  }

  return (
    <ProCard
      direction={'column'}
    >
      <PageHeader
        className="site-page-header"
        onBack={back}
        title=""
        subTitle="  "
      />
      <ProCard colSpan={24} >
        <Descriptions title={blog.title} />
      </ProCard>
      <ProCard colSpan={24} layout={"center"} direction={'row'}>
        <ProCard colSpan={24} bordered>
          <div style={{height: 650}}>
            <Markdown markdownSrc={blog.src || ""} />
          </div>
        </ProCard>
      </ProCard>
    </ProCard>
  )
}

export default ReadBlog;

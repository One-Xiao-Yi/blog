import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Button} from "antd";
import {getBlogList} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";
import BlogList from "@/pages/blog/list/BlogList";
import {useModel} from "@@/plugin-model/useModel";

const Center : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const {initialState} = useModel('@@initialState');

  const [blogList, setBlogList] = useState<API.BlogListResponse>({
    code: 0,
    total: 0,
    msg: "",
    success: false,
    current: 0,
    pageSize: 20,
    rows: []
  });

  const getBlogs = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let {current} = blogList;
    if (!current) {
      current = 0;
    }
    current += 1;
    const page : API.BlogQueryModel = {
      code: 0,
      createdBy: initialState?.currentUser?.id,
      msg: "",
      success: false,
      current: current,
      pageSize: blogList.pageSize,
      orderFields: 'whenCreated',
      orderType: 'desc',
    }
    try {
      getBlogList(page).then((res: API.BlogListResponse) => {
        if (res.success && res.rows) {
          setBlogList({
            code: 0,
            rows: [...blogList.rows || [], ...res.rows],
            msg: res.msg,
            success: res.success,
            total: res.total || 0,
            current: current,
            pageSize: blogList.pageSize
          })
        }
      });
    } finally {
      setLoading(false);
    }
    return;
  }

  const createBlog = () => {
    history.push('/blog/create');
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <ProCard ghost gutter={[16, 16]}>
        <ProCard colSpan={4} layout={'center'}>
          <Button type={'primary'} size={'large'} onClick={createBlog}>写博客</Button>
        </ProCard>
        <ProCard title={"推荐"} gutter={[16, 16]} colSpan={16}>
          <BlogList blogs={blogList} getBlogs={() => getBlogs()} editable={true}/>
        </ProCard>
      </ProCard>
    </>
  );

}

export default Center;

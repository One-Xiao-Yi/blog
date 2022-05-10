import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {getBlogList} from "@/services/ant-design-pro/api";
import BlogList from "@/pages/blog/list/BlogList";
import {List} from "antd";
import {history} from "@@/core/history";

const Home : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<API.BlogListResponse>({
    code: 0,
    rows: [],
    total: 0,
    msg: "",
    success: false,
    current: 0,
    pageSize: 18
  });
  const sortBlogQuery : API.BlogQueryModel = {
    code: 0,
    msg: "",
    success: false,
    current: 0,
    pageSize: 10,
    orderType: 'desc',
    orderFields: 'whenCreated'
  }
  const [sortBlogs, setSortBlogs] = useState<API.BlogModel[]>([]);

  const getBlogs = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let {current} = blogs;
    if (!current) {
      current = 0;
    }
    current += 1;
    const page : API.PageParams = {
      current: current,
      pageSize: blogs.pageSize,
    }
    try {
      getBlogList(page).then((res: API.BlogListResponse) => {
        if (res.success && res.rows) {
          setBlogs({
            code: 0,
            rows: [...blogs.rows || [], ...res.rows],
            msg: res.msg,
            success: res.success,
            total: res.total || 0,
            current: current,
            pageSize: blogs.pageSize
          })
        }
      });
    } finally {
      setLoading(false);
    }
    return;
  }

  const getSortBlog = () => {
    getBlogList(sortBlogQuery).then((res: API.BlogListResponse) => {
      if (res.success && res.rows) {
        setSortBlogs([
          ...res.rows
        ])
      }
    });
  }

  const toDetail = (toBlogId: string) => {
    history.push({
      pathname: "/blog/read",
      query: {
        blogId: toBlogId,
      }
    })
  }

  useEffect(() => {
    getBlogs();
    getSortBlog();
  }, []);

  return (
    <div style={{position: "absolute", height: "100%", width: "100%"}}>
      <ProCard ghost gutter={[16, 16]} style={{position: "absolute", height: "100%"}}>
        <ProCard colSpan={4} ghost/>
        <ProCard title={"推荐"} gutter={[16, 16]} colSpan={16} style={{position: "relative", height: "100%"}}>
          <BlogList blogs={blogs} getBlogs={() => getBlogs()} editable={false} />
        </ProCard>
        <ProCard title={"最近更新"} colSpan={4} bordered>
          <List
          size={'small'}
          dataSource={sortBlogs}
          renderItem={item => <List.Item onClick={() => toDetail(item.id || '')}><a>{item.title}</a></List.Item>}>
          </List>
        </ProCard>
      </ProCard>
    </div>
  );
}

export default Home;

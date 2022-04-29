import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {getBlogList} from "@/services/ant-design-pro/api";
import BlogList from "@/pages/blog/list/BlogList";

const Home : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<API.BlogListResponse>({
    msg: "",
    success: false,
    current: 0,
    pageSize: 18,
  });

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
            rows: [...blogs.rows || [], ...res.rows],
            msg: res.msg,
            success: res.success,
            total: res.total || 0,
            current: current,
            pageSize: blogs.pageSize,
          })
        }
      });
    } finally {
      setLoading(false);
    }
    return;
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div style={{position: "absolute", height: "100%", width: "100%"}}>
      <ProCard ghost gutter={[16, 16]} style={{position: "absolute", height: "100%"}}>
        <ProCard colSpan={4}/>
        <ProCard title={"推荐"} gutter={[16, 16]} ghost colSpan={16} style={{position: "relative", height: "100%"}}>
          <BlogList blogs={blogs} getBlogs={() => getBlogs()} />
        </ProCard>
        <ProCard colSpan={4} bordered/>
      </ProCard>
    </div>
  );
}

export default Home;

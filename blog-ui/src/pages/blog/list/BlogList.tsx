import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, List, Skeleton} from "antd";
import ProCard from "@ant-design/pro-card";
import React from "react";
import {history} from "@@/core/history";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {deleteBlog} from "@/services/ant-design-pro/api";

type Fn = () => API.BlogModel[] | void ;

export interface BlogListProperty {
  blogs: API.BlogListResponse,
  getBlogs: Fn,
  editable: boolean,
}

const BlogList : React.FC<BlogListProperty> = (props) => {

  const toDetail = (toBlogId: string) => {
    history.push({
      pathname: "/blog/read",
      query: {
        blogId: toBlogId,
      }
    })
  }

  const toEdit = (blogId : string) => {
    history.push({
      pathname: "/blog/create",
      query: {
        blogId: blogId,
      }
    })
  }

  const toDelete = async (blogId: string) => {
    const response : API.ResponseModel = await deleteBlog(blogId)
    if (response.success) {
      props.blogs.rows = [];
      props.getBlogs();
    }
  }

  return (
    <div
      id={"scrollableDiv"}
      className={"scroll-div"}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '0 16px',
        height: "100%",
      }}>
      <InfiniteScroll
        dataLength={props.blogs.rows?.length || 0}
        next={props.getBlogs}
        hasMore={!props.blogs.total || (props.blogs.rows != undefined && props.blogs.total > props.blogs.rows.length)}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了</Divider>}
        scrollableTarget="scrollableDiv">
        <List
          dataSource={props.blogs.rows}
          grid={{
            gutter: 16,
            column: 3,
          }}
          style={{
            overflowX: "hidden"
          }}
          renderItem={item => (
            <List.Item key={item.id}>
              <ProCard bordered hoverable direction={'row'} wrap
              actions={props.editable ? [
                <EditOutlined onClick={() => toEdit(item.id || '')} key="edit" />,
                <DeleteOutlined onClick={() => toDelete(item.id || '')} key="delete" />
              ] : []}>
                <ProCard style={{height: 250}} layout={"center"} onClick={() => toDetail(item.id || "")}>
                  <img src={item.cover?'/api/file/download/' + item.cover:'/api/file/download/12'} alt="avatar"
                       style={{height: "100%"}} />
                </ProCard>
                <ProCard onClick={() => toDetail(item.id || "")}>
                  {item.title}
                </ProCard>
                {/*<ProCard>*/}
                {/*  <Tag color="green">tag</Tag>*/}
                {/*</ProCard>*/}
              </ProCard>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}

export default BlogList;

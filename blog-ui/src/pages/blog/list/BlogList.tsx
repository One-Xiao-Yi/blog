import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, List, Skeleton} from "antd";
import ProCard from "@ant-design/pro-card";
import React from "react";
import {history} from "@@/core/history";

type Fn = () => API.BlogModel[] | void ;

export interface BlogListProperty {
  blogs: API.BlogListResponse,
  getBlogs: Fn,
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
            <List.Item key={item.id} onClick={() => toDetail(item.id || "")}>
              <ProCard bordered hoverable title={item.title} direction={'row'} wrap>
                <ProCard style={{height: 200}}>
                  {item.description}
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

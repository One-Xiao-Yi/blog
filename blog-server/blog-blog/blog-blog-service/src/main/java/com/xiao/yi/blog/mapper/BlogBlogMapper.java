package com.xiao.yi.blog.mapper;

import com.xiao.yi.blog.model.BlogBlogModel;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlogBlogMapper extends io.mybatis.mapper.Mapper<BlogBlogModel, Long> {
}

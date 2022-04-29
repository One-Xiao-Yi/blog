package com.xiao.yi.blog.api;

import com.github.pagehelper.PageInfo;
import com.xiao.yi.blog.model.BlogBlogModel;
import reponse.ResponseModel;

import java.util.List;

public interface BlogBlogService {

    List<BlogBlogModel> getList(BlogBlogModel blogModel);

    ResponseModel<BlogBlogModel> getPage(BlogBlogModel blogModel);

    BlogBlogModel getById(Long id);

    BlogBlogModel save(BlogBlogModel blogModel);

    BlogBlogModel update(BlogBlogModel blogModel);

    int delete(String ids);

}

package com.xiao.yi.blog.controller;

import com.xiao.yi.blog.api.BlogBlogService;
import com.xiao.yi.blog.model.BlogBlogModel;
import com.xiao.yi.common.model.reponse.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
public class BlogBlogController {

    @Autowired
    private BlogBlogService blogService;

    @PostMapping("/getPage")
    public ResponseModel<BlogBlogModel> getPage(@RequestBody BlogBlogModel blogModel){
        return blogService.getPage(blogModel);
    }

    @PostMapping("/detail/{id}")
    public ResponseModel<BlogBlogModel> detail(@PathVariable("id") Long id){
        return ResponseModel.success(blogService.getById(id));
    }

    @PostMapping("/save")
    public ResponseModel<BlogBlogModel> save(@RequestBody BlogBlogModel blogModel){
        return ResponseModel.success(blogService.save(blogModel));
    }

    @PostMapping("/update")
    public ResponseModel<BlogBlogModel> update(@RequestBody BlogBlogModel blogModel){
        return ResponseModel.success(blogService.update(blogModel));
    }

    @PostMapping("/delete")
    public ResponseModel<Integer> delete(@RequestParam("ids") String ids){
        return ResponseModel.success(blogService.delete(ids));
    }

}

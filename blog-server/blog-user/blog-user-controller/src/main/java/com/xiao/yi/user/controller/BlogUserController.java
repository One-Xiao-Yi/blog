package com.xiao.yi.user.controller;

import com.xiao.yi.user.api.BlogUserService;
import com.xiao.yi.user.model.BlogUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reponse.ResponseModel;

@RestController
@RequestMapping("/api")
public class BlogUserController {

    @Autowired
    private BlogUserService blogUserService;

    @GetMapping("/user")
    public ResponseModel<BlogUserModel> get(@RequestBody BlogUserModel blogUserModel) {
        return blogUserService.page(blogUserModel);
    }

    @PostMapping("/user")
    public ResponseModel<BlogUserModel> post(@RequestBody BlogUserModel blogUserModel) {
        return ResponseModel.success(blogUserService.saveModel(blogUserModel));
    }

    @PutMapping("/user")
    public ResponseModel<BlogUserModel> put(@RequestBody BlogUserModel blogUserModel) {
        return ResponseModel.success(blogUserService.updateModel(blogUserModel));
    }

    @DeleteMapping("/user")
    public ResponseModel<Integer> del(@RequestParam("ids") String ids) {
        return ResponseModel.success(blogUserService.delete(ids));
    }

}

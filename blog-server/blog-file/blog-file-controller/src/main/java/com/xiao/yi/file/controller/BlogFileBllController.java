package com.xiao.yi.file.controller;

import com.xiao.yi.common.model.reponse.ResponseModel;
import com.xiao.yi.file.api.BlogFileBllService;
import com.xiao.yi.file.model.BlogFileBllModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fileBll")
public class BlogFileBllController {

    @Autowired
    private BlogFileBllService fileBllService;

    @PostMapping("/getList")
    public ResponseModel<BlogFileBllModel> list(@RequestBody BlogFileBllModel query){
        return ResponseModel.success(fileBllService.list(query));
    }

    @PostMapping("/save")
    public ResponseModel<BlogFileBllModel> save(@RequestBody BlogFileBllModel model){
        return ResponseModel.success(fileBllService.save(model));
    }

    @PostMapping("/delete")
    public ResponseModel<Integer> delete(@RequestParam("ids") String ids){
        return ResponseModel.success(fileBllService.delete(ids));
    }

}

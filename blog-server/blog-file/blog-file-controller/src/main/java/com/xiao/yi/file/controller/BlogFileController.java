package com.xiao.yi.file.controller;

import com.xiao.yi.file.api.BlogFileService;
import com.xiao.yi.file.model.BlogFileModel;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reponse.ResponseModel;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/api/file")
public class BlogFileController {

    @Autowired
    private BlogFileService fileService;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseModel<BlogFileModel> upload(@RequestParam("file") MultipartFile file) {
        try {
            BlogFileModel fileModel = fileService.upload(file.getInputStream());
            return ResponseModel.success(fileModel);
        } catch (IOException e) {
            throw new RuntimeException("获取上传文件流失败", e);
        }
    }


    @PostMapping("/checkFile")
    @ResponseBody
    public ResponseModel<Void> checkFile(@RequestParam("id") Long id) {
        BlogFileModel fileModel = fileService.getById(id);
        Assert.notNull(fileModel, "文件不存在");
        return ResponseModel.success();
    }

    @GetMapping("/download/{id}")
    public void download(@PathVariable("id") Long id, HttpServletResponse response) {
        try {
            IOUtils.copyLarge(fileService.download(id), response.getOutputStream());
        } catch (IOException e) {
            throw new RuntimeException("下载文件失败", e);
        }
    }

}

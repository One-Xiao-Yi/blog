package com.xiao.yi.file.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.xiao.yi.file.api.BlogFileService;
import com.xiao.yi.file.mapper.BlogFileMapper;
import com.xiao.yi.file.model.BlogFileModel;
import io.minio.MinioClient;
import io.minio.PutObjectOptions;
import io.mybatis.mapper.example.Example;
import io.mybatis.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class BlogFileServiceImpl extends AbstractService<BlogFileModel, Long, BlogFileMapper> implements BlogFileService {

    @Value("${file.minio.bucket:blog}")
    private String minioBucket;

    @Autowired
    private MinioClient minioClient;

    @Override
    public List<BlogFileModel> getList(BlogFileModel fileModel) {
        return findList(fileModel);
    }

    @Override
    public BlogFileModel getById(Long id) {
        return findById(id);
    }

    @Override
    public int delete(String ids) {
        if (ObjectUtil.isEmpty(ids)) {
            return 0;
        }
        Example<BlogFileModel> example = new Example<>();
        example.createCriteria().andIn(BlogFileModel::getId, List.of(ids.split(",")));
        return delete(example);
    }

    @Override
    public BlogFileModel upload(InputStream inputStream) {
        int year = DateUtil.thisYear();
        int month = DateUtil.thisMonth() + 1;
        String path = year + "-" + month + "/" + UUID.randomUUID().toString();
        try {
            minioClient.putObject(minioBucket, path, inputStream, new PutObjectOptions(-1L, PutObjectOptions.MIN_MULTIPART_SIZE));
        } catch (Exception e) {
            throw new RuntimeException("上传文件失败", e);
        }
        BlogFileModel fileModel = new BlogFileModel();
        fileModel.setPath(path);
        return save(fileModel);
    }

    @Override
    public InputStream download(Long id) {
        BlogFileModel fileModel = getById(id);
        Assert.notNull(fileModel, "文件不存在");
        try {
            return minioClient.getObject(minioBucket, fileModel.getPath());
        } catch (Exception e) {
            throw new RuntimeException("获取文件失败", e);
        }
    }
}

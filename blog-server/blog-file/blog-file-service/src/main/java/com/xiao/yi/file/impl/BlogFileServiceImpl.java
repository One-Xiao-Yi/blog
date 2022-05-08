package com.xiao.yi.file.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.xiao.yi.file.api.BlogFileBllService;
import com.xiao.yi.file.api.BlogFileService;
import com.xiao.yi.file.enums.FileState;
import com.xiao.yi.file.mapper.BlogFileMapper;
import com.xiao.yi.file.model.BlogFileBllModel;
import com.xiao.yi.file.model.BlogFileModel;
import io.minio.MinioClient;
import io.minio.PutObjectOptions;
import io.mybatis.mapper.example.Example;
import io.mybatis.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BlogFileServiceImpl extends AbstractService<BlogFileModel, Long, BlogFileMapper> implements BlogFileService {

    @Value("${file.minio.bucket:blog}")
    private String minioBucket;

    @Autowired
    private MinioClient minioClient;

    @Autowired
    private BlogFileBllService fileBllService;

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
        final List<BlogFileModel> list = findList(example);
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        minioClient.removeObjects(minioBucket, list.stream().map(BlogFileModel::getPath).collect(Collectors.toList()));
        return delete(example);
    }

    @Override
    public int delete(Collection<Long> ids) {
        Example<BlogFileModel> example = new Example<>();
        example.createCriteria().andIn(BlogFileModel::getId, ids);
        final List<BlogFileModel> list = findList(example);
        if (CollectionUtil.isEmpty(list)) {
            return 0;
        }
        minioClient.removeObjects(minioBucket, list.stream().map(BlogFileModel::getPath).collect(Collectors.toList()));
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
        fileModel.setState(FileState.TEMP.getIndex());
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

    @Override
    public void commit(Long bllId, List<Long> fileIds) {
        Assert.notNull(bllId, "业务id不能为空");
        Assert.notEmpty(fileIds, "文件ids不能为空");
        fileIds.stream().filter(Objects::nonNull).forEach(fileId -> {
            BlogFileModel fileModel = new BlogFileModel();
            fileModel.setState(FileState.PERSISTENCE.getIndex());
            fileModel.setId(fileId);
            updateSelective(fileModel);
        });
        final BlogFileBllModel query = new BlogFileBllModel();
        query.setBllId(bllId);
        final List<BlogFileBllModel> fileBllList = fileBllService.list(query);
        List<Long> unExistsFileIds = null;

        if (CollectionUtil.isNotEmpty(fileBllList)) {
            final Map<Long, Long> delFileBllIdToFileId = fileBllList.stream()
                    .filter(item -> !fileIds.contains(item.getBllId()))
                    .collect(Collectors.toMap(BlogFileBllModel::getId, BlogFileBllModel::getFileId));
            if (CollectionUtil.isNotEmpty(delFileBllIdToFileId)) {
                delete(delFileBllIdToFileId.values());
                fileBllService.delete(delFileBllIdToFileId.keySet());
            }

            final List<Long> existsFileIds = fileBllList.stream().map(BlogFileBllModel::getFileId).collect(Collectors.toList());
            unExistsFileIds = fileIds.stream().filter(item -> !existsFileIds.contains(item)).collect(Collectors.toList());
        } else {
            unExistsFileIds = fileIds;
        }

        if (CollectionUtil.isNotEmpty(unExistsFileIds)) {
            unExistsFileIds.forEach(item -> {
                BlogFileBllModel bllModel = new BlogFileBllModel();
                bllModel.setFileId(item);
                bllModel.setBllId(bllId);
                fileBllService.save(bllModel);
            });
        }
    }
}

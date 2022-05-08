package com.xiao.yi.blog.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xiao.yi.blog.api.BlogBlogService;
import com.xiao.yi.blog.mapper.BlogBlogMapper;
import com.xiao.yi.blog.model.BlogBlogModel;
import com.xiao.yi.file.api.BlogFileService;
import com.xiao.yi.file.model.BlogFileModel;
import io.mybatis.mapper.example.Example;
import io.mybatis.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reponse.ResponseModel;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BlogBlogServiceImpl extends AbstractService<BlogBlogModel, Long, BlogBlogMapper> implements BlogBlogService {

    private final static String IMAGE_PATTERN_STR = "\\!\\[.*?\\)";

    private final static Pattern IMAGE_PATTERN = Pattern.compile(IMAGE_PATTERN_STR);

    private final static String FILE_ID_PATTERN_STR = "/[0-9]+";

    private final static Pattern FILE_ID_PATTERN = Pattern.compile(FILE_ID_PATTERN_STR);

    @Autowired
    private BlogFileService fileService;

    @Override
    public List<BlogBlogModel> getList(BlogBlogModel blogModel) {
        return findList(blogModel);
    }

    @Override
    public BlogBlogModel getById(Long id) {
        final BlogBlogModel blog = findById(id);
        Assert.notNull(blog, "该博客不存在");
        final InputStream inputStream = fileService.download(Long.parseLong(blog.getPath()));
        blog.setSrc(IoUtil.readUtf8(inputStream));
        return blog;
    }

    @Override
    public BlogBlogModel save(BlogBlogModel entity) {
        Assert.isTrue(ObjectUtil.isAllNotEmpty(entity.getSrc(), entity.getTitle(), entity.getDescription(), entity.getCreatedBy()), "信息不完整");
        List<Long> fileIds = IMAGE_PATTERN.matcher(entity.getSrc()).results()
                .map(MatchResult::group)
                .map(item -> FILE_ID_PATTERN.matcher(item).results().map(MatchResult::group).findFirst().orElse(null))
                .filter(Objects::nonNull)
                .map(item -> item.replace("/", ""))
                .map(Long::parseLong)
                .collect(Collectors.toList());
        entity.setWhenCreated(new Date());
        try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(entity.getSrc().getBytes(StandardCharsets.UTF_8))){
            final BlogFileModel file = fileService.upload(byteArrayInputStream);
            entity.setPath(file.getId().toString());
            final BlogBlogModel blog = super.save(entity);
            fileService.commit(entity.getId(), fileIds);
            return blog;
        } catch (Exception e) {
            throw new RuntimeException("上传文件失败", e);
        }
    }

    @Override
    public BlogBlogModel update(BlogBlogModel entity) {
        Assert.isTrue(ObjectUtil.isAllNotEmpty(entity.getSrc(), entity.getTitle(), entity.getDescription(), entity.getCreatedBy()), "信息不完整");
        try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(entity.getSrc().getBytes(StandardCharsets.UTF_8))){
            final BlogFileModel file = fileService.upload(byteArrayInputStream);
            entity.setPath(file.getId().toString());
            return super.update(entity);
        } catch (Exception e) {
            throw new RuntimeException("上传文件失败", e);
        }
    }

    @Override
    public ResponseModel<BlogBlogModel> getPage(BlogBlogModel blogModel) {
        Page<Object> page = null;
        if (blogModel.pageCheck()) {
            page = PageHelper.startPage(blogModel.getCurrent(), blogModel.getPageSize());
        }
        ResponseModel<BlogBlogModel> response = ResponseModel.success(findList(blogModel));
        if (null != page) {
            response.setTotal(page.getTotal());
            response.setCurrent(blogModel.getCurrent());
            response.setPageSize(blogModel.getPageSize());
        }
        return response;
    }

    @Override
    public int delete(String ids) {
        if (ObjectUtil.isEmpty(ids)) {
            return 0;
        }
        Example<BlogBlogModel> example = new Example<>();
        example.createCriteria().andIn(BlogBlogModel::getId, List.of(ids.split(",")));
        return delete(example);
    }
}

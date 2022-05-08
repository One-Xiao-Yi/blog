package com.xiao.yi.file.impl;

import cn.hutool.core.util.ObjectUtil;
import com.xiao.yi.file.api.BlogFileBllService;
import com.xiao.yi.file.mapper.BlogFileBllMapper;
import com.xiao.yi.file.model.BlogFileBllModel;
import io.mybatis.mapper.example.Example;
import io.mybatis.service.AbstractService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class BlogFileBllServiceImpl extends AbstractService<BlogFileBllModel, Long, BlogFileBllMapper> implements BlogFileBllService {
    @Override
    public List<BlogFileBllModel> list(BlogFileBllModel query) {
        return findList(query);
    }

    @Override
    public int delete(String ids) {
        if (ObjectUtil.isEmpty(ids)) {
            return 0;
        }
        Example<BlogFileBllModel> example = new Example<>();
        example.createCriteria().andIn(BlogFileBllModel::getId, List.of(ids.split(",")));
        return delete(example);
    }

    @Override
    public int delete(Collection<Long> ids) {
        Example<BlogFileBllModel> example = new Example<>();
        example.createCriteria().andIn(BlogFileBllModel::getId, ids);
        return delete(example);
    }
}

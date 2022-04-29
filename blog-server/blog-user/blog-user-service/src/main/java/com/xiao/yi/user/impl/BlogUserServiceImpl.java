package com.xiao.yi.user.impl;

import cn.hutool.core.util.ObjectUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xiao.yi.user.mapper.BlogUserMapper;
import com.xiao.yi.user.api.BlogUserService;
import com.xiao.yi.user.model.BlogUserModel;
import io.mybatis.mapper.example.Example;
import io.mybatis.service.AbstractService;
import org.springframework.stereotype.Service;
import reponse.ResponseModel;

import java.util.List;

@Service
public class BlogUserServiceImpl extends AbstractService<BlogUserModel, Long, BlogUserMapper> implements BlogUserService {
    @Override
    public ResponseModel<BlogUserModel> page(BlogUserModel blogUserModel) {
        Page<Object> page = null;
        if (blogUserModel.pageCheck()) {
            page = PageHelper.startPage(blogUserModel.getCurrent(), blogUserModel.getPageSize());
        }
        ResponseModel<BlogUserModel> response = ResponseModel.success(findList(blogUserModel));
        if (null != page) {
            response.setTotal(page.getTotal());
            response.setCurrent(blogUserModel.getCurrent());
            response.setPageSize(blogUserModel.getPageSize());
        }
        return response;
    }

    @Override
    public List<BlogUserModel> list(BlogUserModel blogUserModel) {
        return findList(blogUserModel);
    }

    @Override
    public BlogUserModel updateModel(BlogUserModel blogUserModel) {
        return update(blogUserModel);
    }

    @Override
    public BlogUserModel saveModel(BlogUserModel blogUserModel) {
        return save(blogUserModel);
    }

    @Override
    public int delete(String ids) {
        if (ObjectUtil.isEmpty(ids)) {
            return 0;
        }
        Example<BlogUserModel> example = new Example<>();
        example.createCriteria().andIn(BlogUserModel::getId, List.of(ids.split(",")));
        return delete(example);
    }

}

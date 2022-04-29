package com.xiao.yi.file.mapper;

import com.xiao.yi.file.model.BlogFileModel;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlogFileMapper extends io.mybatis.mapper.Mapper<BlogFileModel, Long> {
}

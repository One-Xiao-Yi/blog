package com.xiao.yi.file.mapper;

import com.xiao.yi.file.model.BlogFileBllModel;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlogFileBllMapper extends io.mybatis.mapper.Mapper<BlogFileBllModel, Long> {
}

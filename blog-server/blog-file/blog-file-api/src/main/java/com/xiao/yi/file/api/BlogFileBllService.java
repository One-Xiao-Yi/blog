package com.xiao.yi.file.api;

import com.xiao.yi.file.model.BlogFileBllModel;

import java.util.Collection;
import java.util.List;

public interface BlogFileBllService {

    List<BlogFileBllModel> list(BlogFileBllModel query);

    BlogFileBllModel save(BlogFileBllModel model);

    int delete(String ids);

    int delete(Collection<Long> ids);

}

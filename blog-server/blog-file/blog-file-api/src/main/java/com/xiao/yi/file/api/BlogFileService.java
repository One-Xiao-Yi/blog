package com.xiao.yi.file.api;

import com.xiao.yi.file.model.BlogFileModel;

import java.io.InputStream;
import java.util.Collection;
import java.util.List;

public interface BlogFileService {

    List<BlogFileModel> getList(BlogFileModel fileModel);

    BlogFileModel getById(Long id);

    BlogFileModel save(BlogFileModel fileModel);

    BlogFileModel update(BlogFileModel fileModel);

    int delete(String ids);

    int delete(Collection<Long> ids);

    BlogFileModel upload(InputStream inputStream);

    InputStream download(Long id);

    void commit(Long bllId, List<Long> fileIds);

}

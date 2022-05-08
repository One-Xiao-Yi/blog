package com.xiao.yi.file.model;

import io.mybatis.provider.Entity;

@Entity.Table(value = "blog_file_bll")
public class BlogFileBllModel {

    @Entity.Column(value = "id", id = true, updatable = false, insertable = false)
    private Long id;

    @Entity.Column(value = "file_id")
    private Long fileId;

    @Entity.Column(value = "bll_id")
    private Long bllId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public Long getBllId() {
        return bllId;
    }

    public void setBllId(Long bllId) {
        this.bllId = bllId;
    }
}

package com.xiao.yi.file.model;

import io.mybatis.provider.Entity;

@Entity.Table(value = "blog_file")
public class BlogFileModel {

    @Entity.Column(value = "id", id = true, updatable = false, insertable = false)
    private Long id;

    @Entity.Column(value = "path")
    private String path;

    @Entity.Column(value = "state")
    private Integer state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}

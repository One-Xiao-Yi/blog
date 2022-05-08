package com.xiao.yi.blog.model;

import io.mybatis.provider.Entity;
import page.PageModel;

import java.util.Date;

@Entity.Table(value = "blog_blog")
public class BlogBlogModel extends PageModel {

    @Entity.Column(value = "id", id = true, updatable = false, insertable = false)
    private Long id;

    @Entity.Column(value = "title")
    private String title;

    @Entity.Column(value = "description")
    private String description;

    @Entity.Column(value = "path")
    private String path;

    @Entity.Column(value = "created_by")
    private Long createdBy;

    @Entity.Column(value = "when_created")
    private Date whenCreated;

    private String src;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Date getWhenCreated() {
        return whenCreated;
    }

    public void setWhenCreated(Date whenCreated) {
        this.whenCreated = whenCreated;
    }
}

package com.xiao.yi.user.model;

import com.xiao.yi.common.model.page.PageModel;
import io.mybatis.provider.Entity;

@Entity.Table(value = "blog_user")
public class BlogUserModel extends PageModel {

    @Entity.Column(value = "id", id = true, updatable = false, insertable = false)
    private Long id;

    @Entity.Column(value = "account")
    private String account;

    @Entity.Column(value = "name")
    private String name;

    @Entity.Column(value = "avatar")
    private String avatar;

    @Entity.Column(value = "password")
    private String password;

    @Entity.Column(value = "uuid")
    private String uuid;

    private String retryPassword;

    private String inviteCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRetryPassword() {
        return retryPassword;
    }

    public void setRetryPassword(String retryPassword) {
        this.retryPassword = retryPassword;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}

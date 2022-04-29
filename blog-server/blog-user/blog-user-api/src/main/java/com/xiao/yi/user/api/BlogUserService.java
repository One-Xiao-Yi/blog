package com.xiao.yi.user.api;

import com.xiao.yi.user.model.BlogUserModel;
import reponse.ResponseModel;

import java.util.List;

/**
 * 用户增删改查接口
 */
public interface BlogUserService {

    /**
     * 分页获取用户列表
     * @return List<UserModel>
     * @param blogUserModel 查询信息
     */
    ResponseModel<BlogUserModel> page(BlogUserModel blogUserModel);

    /**
     * 获取用户列表
     * @param blogUserModel 查询条件
     * @return List<UserModel>
     */
    List<BlogUserModel> list(BlogUserModel blogUserModel);

    /**
     * 更新用户信息
     * @param blogUserModel 用户信息，id必须
     */
    BlogUserModel updateModel(BlogUserModel blogUserModel);

    /**
     * 保存用户信息
     * @param blogUserModel 用户信息
     */
    BlogUserModel saveModel(BlogUserModel blogUserModel);

    /**
     * 删除用户
     * @param ids 逗号隔开的id串
     * @return 删除成功的用户数
     */
    int delete(String ids);

}

package com.xiao.yi.user.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.xiao.yi.common.model.reponse.ResponseModel;
import com.xiao.yi.common.web.utils.JwtCommonUtils;
import com.xiao.yi.user.api.BlogUserService;
import com.xiao.yi.user.model.BlogUserModel;
import com.xiao.yi.user.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/user")
public class LoginController {

    private static final String ACCOUNT_PATTERN_REGEX = "^([0-9]|[a-z])*$";

    private static final Pattern ACCOUNT_PATTERN = Pattern.compile(ACCOUNT_PATTERN_REGEX);

    @Autowired
    private BlogUserService userService;

    @Autowired
    private JwtCommonUtils jwtCommonUtils;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${user.registry.invite.code}")
    private String inviteCode;

    @PostMapping("/login")
    public ResponseModel<String> login(@RequestBody BlogUserModel userModel,
                                       HttpServletResponse response){
        Assert.isTrue(ObjectUtil.isAllNotEmpty(userModel.getAccount(), userModel.getPassword()), "信息填写不完整");
        BlogUserModel user = getByAccount(userModel.getAccount());
        String saltPassword = DigestUtil.md5Hex(userModel.getPassword() + user.getUuid());
        if (saltPassword.equals(user.getPassword())) {
            user.setPassword(null);
            String token = jwtUtils.sign(user);
            return ResponseModel.success(token);
        }
        return ResponseModel.error("账号或密码错误");
    }

    @PostMapping("/refreshToken")
    public ResponseModel<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        jwtCommonUtils.verify(request);
        String account = jwtCommonUtils.getAccount(request);
        BlogUserModel user = getByAccount(account);
        return ResponseModel.success(jwtUtils.sign(user));
    }

    @PostMapping("/registry")
    public ResponseModel<Void> registry(@RequestBody BlogUserModel userModel){
        Assert.isTrue(ObjectUtil.isAllNotEmpty(userModel.getAccount(), userModel.getName(), userModel.getPassword(), userModel.getRetryPassword(), userModel.getInviteCode()), "信息填写不完整");
        Assert.isTrue(userModel.getPassword().equals(userModel.getRetryPassword()), "两次密码输入不相同");
        Assert.isTrue(ACCOUNT_PATTERN.matcher(userModel.getAccount()).find(), "账号只可使用0-9或a-z字符");
        Assert.isTrue(userModel.getInviteCode().equals(inviteCode), "邀请码错误");
        userModel.setUuid(UUID.randomUUID().toString());
        String saltPassword = DigestUtil.md5Hex(userModel.getPassword() + userModel.getUuid());
        userModel.setPassword(saltPassword);
        userService.saveModel(userModel);
        return ResponseModel.success();
    }

    @GetMapping("/userInfo")
    public ResponseModel<BlogUserModel> userInfo(HttpServletRequest request){
        String account = jwtCommonUtils.getAccount(request);
        Assert.notEmpty(account, "token格式错误");
        BlogUserModel userModel = getByAccount(account);
        userModel.setPassword(null);
        userModel.setUuid(null);
        return ResponseModel.success(userModel);
    }

    private BlogUserModel getByAccount(String account){
        BlogUserModel query = new BlogUserModel();
        query.setAccount(account);
        List<BlogUserModel> list = userService.list(query);
        Assert.notEmpty(list, "账号或密码错误");
        return list.get(0);
    }
}

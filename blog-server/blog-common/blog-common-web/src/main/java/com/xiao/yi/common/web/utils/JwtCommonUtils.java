package com.xiao.yi.common.web.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.xiao.yi.common.model.model.CurrentUserModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtCommonUtils {

    private final static String SECRET_FIELD_NAME = "account";

    public static final String AUTH_HEADER = "Authorization";

    @Value("${user.login.jwt.token.salt:xiao_yi_blog_salt}")
    private String salt;

    @Value("${user.login.jwt.token.secret:xiao_yi_blog_secret}")
    private String secret;


    public CurrentUserModel currentUser(HttpServletRequest request){
        String token = getTokenByRequest(request);
        final Map<String, String> stringStringMap = JWT.decode(token).getClaims()
                .entrySet().stream()
                .filter(entry -> ObjectUtil.isNotEmpty(entry.getValue().asString()))
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().asString()));
        return BeanUtil.mapToBean(stringStringMap, CurrentUserModel.class, false, null);
    }

    public void verify(String token) {
        String account = getAccount(token);
        String secret = DigestUtil.md5Hex(this.secret + account);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withClaim(SECRET_FIELD_NAME, account)
                .withIssuer(salt)
                .build();
        verifier.verify(token);
    }

    public void verify(HttpServletRequest request) {
        final String token = getTokenByRequest(request);
        verify(token);
    }

    public String getAccount(HttpServletRequest request) {
        final String token = getTokenByRequest(request);
        verify(token);
        DecodedJWT decode = JWT.decode(token);
        return decode.getClaim(SECRET_FIELD_NAME).asString();
    }

    public String getAccount(String token) {
        DecodedJWT decode = JWT.decode(token);
        return decode.getClaim(SECRET_FIELD_NAME).asString();
    }

    public String getTokenByRequest(HttpServletRequest request){
        return request.getHeader(AUTH_HEADER);
    }

}

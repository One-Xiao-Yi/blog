package com.xiao.yi.user.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.xiao.yi.user.model.BlogUserModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtUtils {

    private final static String SECRET_FIELD_NAME = "account";

    @Value("${user.login.jwt.token.prefix:xiao:yi:token:}")
    private String tokenPrefix;

    @Value("${user.login.jwt.token.expire.minutes:120}")
    private Long expireMinutes;

    @Value("${user.login.jwt.token.salt:xiao_yi_blog_salt}")
    private String salt;

    @Value("${user.login.jwt.token.secret:xiao_yi_blog_secret}")
    private String secret;

    public String sign(BlogUserModel user) {
        long nowTime = System.currentTimeMillis();
        Date now = new Date(nowTime);
        Date expireDate = new Date(nowTime + expireMinutes * 60);
        JWTCreator.Builder builder = JWT.create()
                .withIssuer(salt)
                .withIssuedAt(now)
                .withExpiresAt(expireDate);
        Map<String, Object> beanValue = BeanUtil.beanToMap(user, false, true);
        beanValue.forEach((key, value) -> builder.withClaim(key, value.toString()));
        String secret = DigestUtil.md5Hex(this.secret + user.getAccount());
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return builder.sign(algorithm);
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

    public String getAccount(String token) {
        DecodedJWT decode = JWT.decode(token);
        return decode.getClaim(SECRET_FIELD_NAME).asString();
    }

}

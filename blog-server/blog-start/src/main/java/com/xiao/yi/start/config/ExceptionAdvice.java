package com.xiao.yi.start.config;

import com.xiao.yi.common.model.reponse.ResponseModel;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.auth0.jwt.exceptions.JWTVerificationException;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseModel<Void> unAuthException(){
        return ResponseModel.error(401);
    }

    @ExceptionHandler(Exception.class)
    public ResponseModel<Void> exception(){
        return ResponseModel.error();
    }

}

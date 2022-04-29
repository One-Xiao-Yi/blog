package com.xiao.yi.file.config;

import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfiguration {

    @Value("${file.minio.url}")
    private String minioUrl;

    @Value("${file.minio.username}")
    private String minioUsername;

    @Value("${file.minio.password}")
    private String minioPassword;

    @Bean
    public MinioClient minioClient() throws InvalidPortException, InvalidEndpointException {
        return new MinioClient(minioUrl, minioUsername, minioPassword);
    }

}

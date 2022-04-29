package com.xiao.yi.start;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@SpringBootApplication(scanBasePackages = "com.xiao.yi")
@MapperScan(basePackages = "com.xiao.yi.*.mapper")
public class BlogStartApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogStartApplication.class, args);
    }

    @Bean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder){
        ObjectMapper mapper = builder.createXmlMapper(false).build();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        mapper.registerModule(simpleModule);
        return mapper;
    }

}

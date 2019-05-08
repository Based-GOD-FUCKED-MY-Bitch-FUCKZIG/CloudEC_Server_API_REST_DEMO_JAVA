package com.huawei.CMASFrontendDemo;

//import com.huawei.csp.csejsdk.core.api.Framework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ImportResource({"classpath*:META-INF/spring/*.xml"})
@EnableScheduling
public class CMASFrontendDemo
{

    public static void main(String[] args)
    {
//        System.setProperty("os.name", "linux");
//        System.setProperty("cse.service.registry.address", "https://100.115.154.77:30100");

//        Framework.initCsp();
        SpringApplication.run(CMASFrontendDemo.class);
//        Framework.updateProperties();
    }
}

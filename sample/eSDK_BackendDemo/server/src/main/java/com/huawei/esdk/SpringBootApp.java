/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 * CloudPortal is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.huawei.esdk;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
<<<<<<< HEAD
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@Slf4j
public class SpringBootApp extends SpringBootServletInitializer {
=======
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
@Slf4j
public class SpringBootApp extends SpringBootServletInitializer{
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5

	public static void main(String[] args) {
		log.debug("程序开始了...");
		SpringApplication.run(SpringBootApp.class, args);
	}

	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(SpringBootApp.class);
	}
}

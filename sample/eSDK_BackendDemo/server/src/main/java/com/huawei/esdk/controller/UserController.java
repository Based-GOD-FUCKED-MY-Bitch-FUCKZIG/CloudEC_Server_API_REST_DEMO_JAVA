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
package com.huawei.esdk.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.common.ResultInfo;
import com.huawei.esdk.model.UserLoginResponse;
import com.huawei.esdk.model.UserLoginResponseToken;
import com.huawei.esdk.utils.AuthedUtil;
import com.huawei.esdk.utils.CheckPathUtil;
import com.huawei.esdk.utils.ErroMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.huawei.esdk.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Base64;

@RestController
@Slf4j
public class UserController {

	@Autowired
	private Gson gson;
	
	@Autowired
	private UserService userService;

	@GetMapping("/")
	public void index(HttpServletResponse response, HttpServletRequest request) {
		try {
			response.sendRedirect(request.getContextPath() + "/build/index.html");
		} catch (IOException e) {
			log.error("访问index出错了！");
		}
	}

	@PostMapping("/user/login")
	public ResultInfo login(@RequestBody String info,
							@RequestHeader(name = "Authorization") String authorization,
							HttpServletResponse httpResponse){
		String checkBody = CheckPathUtil.jsonPathFormat(info);
		JsonObject infoObj = gson.fromJson(checkBody,JsonObject.class);
		String username = infoObj.get("userName").getAsString();

		RestResponse response = userService.login(username,authorization);
		ResultInfo<Object> resultInfo = new ResultInfo<>();
		if (response == null){
			return ErroMessage.connectLoseError(resultInfo);
		}
		String responseEntity = response.getEntity();

		UserLoginResponse userInfo = gson.fromJson(responseEntity, UserLoginResponse.class);
		UserLoginResponseToken data = userInfo.getData();

		if(data == null){
			return ErroMessage.userNotRight(resultInfo);
		}

		String accessToken = data.getAccessToken();
		if( accessToken == null){
			return ErroMessage.userNotRight(resultInfo);
		}

		String base64AccessToken = Base64.getEncoder().encodeToString(accessToken.getBytes(Charset.forName("utf8")));
		httpResponse.setHeader("access-token","Basic " + base64AccessToken + "|" + username);
		AuthedUtil.addAuth(username,"Basic " + base64AccessToken);
		return ErroMessage.responseMessage(resultInfo,base64AccessToken);
	}

	@RequestMapping(value = "/user/unauthed")
	public ResultInfo unauthed(HttpServletResponse httpResponse){
		ResultInfo result = ErroMessage.setUnAuthed(httpResponse);
		return result;
	}
}

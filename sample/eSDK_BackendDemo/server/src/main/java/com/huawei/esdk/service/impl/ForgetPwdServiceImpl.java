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
package com.huawei.esdk.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.huawei.esdk.common.MethodEnum;
import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.model.ForgetPwdRequest;
import com.huawei.esdk.service.ForgetPwdService;
import com.huawei.esdk.utils.CheckPathUtil;
import com.huawei.esdk.utils.HttpBuildUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;

@Service
public class ForgetPwdServiceImpl implements ForgetPwdService{
    private static final JsonParser jsonParser = new JsonParser();
    @Autowired
    private Gson gson;
    @Override
    public RestResponse sendSlideVerifycode(String data) {
        String resourceUri = "/rest/usg/sso/v1/auth/slideverifycode/send";

        String checkBody = CheckPathUtil.jsonPathFormat(data);
        JsonObject infoObj = gson.fromJson(checkBody,JsonObject.class);
        String user = infoObj.get("data").getAsString();

        ForgetPwdRequest forgetPwdRequest = new ForgetPwdRequest();
        forgetPwdRequest.setCheckType(1);
        forgetPwdRequest.setClientType(0);
        forgetPwdRequest.setUser(user);
        String entity = gson.toJson(forgetPwdRequest);

        Map<String,String> headers = new HashMap<>();
        headers.put("Content-Type","application/json");
        RestRequest restRequest = new RestRequest();
        restRequest.setHttpHeaders(headers);
        restRequest.setHttpMethod(MethodEnum.POST.getValue());
        restRequest.setEntity(entity);

        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);

        return response;
    }

    @Override
    public RestResponse checkSlideVerifycode(String data) {

        String resourceUri = "/rest/usg/sso/v1/auth/slideverifycode/check";

        String checkBody = CheckPathUtil.jsonPathFormat(data);
        JsonObject jsonObject = jsonParser.parse(checkBody).getAsJsonObject();
        String entity = jsonObject.get("data").getAsString();

        Map<String,String> headers = new HashMap<>();
        headers.put("Content-Type","application/json");
        RestRequest restRequest = new RestRequest();
        restRequest.setHttpHeaders(headers);
        restRequest.setHttpMethod(MethodEnum.PUT.getValue());
        restRequest.setEntity(entity);

        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);

        return response;
    }

    @Override
    public RestResponse sendVerifyCode(String data) {
        //JsonParser jsonParser = new JsonParser();

        String resourceUri = "/rest/usg/ap/v1/verifycode/send";

        String checkBody = CheckPathUtil.jsonPathFormat(data);
        JsonObject jsonObject = jsonParser.parse(checkBody).getAsJsonObject();
        String entity = jsonObject.get("data").getAsString();
        //String entity = jsonParser.parse(data).getAsJsonObject().get("data").getAsString();

        Map<String,String> headers = new HashMap<>();
        headers.put("Content-Type","application/json");
        RestRequest restRequest = new RestRequest();
        restRequest.setHttpHeaders(headers);
        restRequest.setHttpMethod(MethodEnum.POST.getValue());
        restRequest.setEntity(entity);

        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);

        return response;
    }

    @Override
    public RestResponse checkVerifyCode(String data) {
        String resourceUri = "/rest/usg/ap/v1/verifycode/check";

        String checkBody = CheckPathUtil.jsonPathFormat(data);
        JsonObject jsonObject = jsonParser.parse(checkBody).getAsJsonObject();
        String entity = jsonObject.get("data").getAsString();
        //String entity = jsonParser.parse(data).getAsJsonObject().get("data").getAsString();

        Map<String,String> headers = new HashMap<>();
        headers.put("Content-Type","application/json");
        RestRequest restRequest = new RestRequest();
        restRequest.setHttpHeaders(headers);
        restRequest.setHttpMethod(MethodEnum.PUT.getValue());
        restRequest.setEntity(entity);

        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);

        return response;
    }

    @Override
    public RestResponse resetPassword(String data,String authorization) {

        String resourceUri = "/rest/usg/ap/v1/password/reset";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }
}

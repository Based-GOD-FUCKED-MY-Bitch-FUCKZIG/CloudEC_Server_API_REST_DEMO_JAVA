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
import com.google.gson.JsonParser;
import com.huawei.esdk.common.MethodEnum;
import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.service.ConferenceManagerService;
import com.huawei.esdk.utils.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Repository
public class ConferenceManagerServiceImpl implements ConferenceManagerService {

    JsonParser jsonParser = new JsonParser();

    @Autowired
    Gson gson;
    
    @Override
    public RestResponse createConf(String confInfo, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-createConf");

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),confInfo,null);
        return response;
    }

    @Override
    public RestResponse delConf(String conferenceid, String authorization) {
        String resourceUri = "/conferences/" + conferenceid;

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse modifyConf(String conferenceid,String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid;

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),confInfo,null);
        return response;
    }
	@Override
 	public RestResponse getConfList(String params, String authorization) {
        String resourceUri = "/conferences";

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,parameters);
        return response;
    }

@Override
    public RestResponse getConfInfo(String conferencesid, String params, String authorization, String type, String queryType) {
        String resourceUri = "/conferences/" + conferencesid;

        Map<String,String> map = new HashMap<>();
        map.put("Authorization", AuthedUtil.getAuthorization(authorization));
        map.put("type", type);
        map.put("queryType",queryType);

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                map,null,parameters);
        return response;
    }

}

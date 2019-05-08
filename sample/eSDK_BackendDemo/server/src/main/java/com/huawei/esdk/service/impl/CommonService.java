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

import com.google.gson.JsonParser;
import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.utils.AuthedUtil;
import com.huawei.esdk.utils.HttpBuildUtil;

import java.util.HashMap;
import java.util.Map;

public class CommonService {
    private static final JsonParser jsonParser = new JsonParser();

    public static RestResponse handleRequest(String method, String resourceUri, Map headers, String entity, Map params){
        if(entity != null){
            if("GET".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method)){
                entity = null;
            }else{
                entity = jsonParser.parse(entity).getAsJsonObject().get("data").getAsString();
            }
        }

        RestRequest restRequest = HttpBuildUtil.buildRestRequest(method, headers, entity, params);
        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);
        return response;
    }

    public static Map<String,String> handleConfAuthHeaders(String confAuth){
        Map<String,String> map = new HashMap<>();
        map.put("Conference-Authorization",confAuth);
        return map;
    }

    public static Map<String,String> handleAuthHeaders(String auth){
        Map<String,String> map = new HashMap<>();
        map.put("Authorization", AuthedUtil.getAuthorization(auth));
        return map;
    }
}

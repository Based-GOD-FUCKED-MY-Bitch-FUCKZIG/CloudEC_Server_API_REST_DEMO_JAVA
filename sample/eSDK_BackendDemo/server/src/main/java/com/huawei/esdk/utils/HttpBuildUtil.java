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
package com.huawei.esdk.utils;

import com.google.gson.Gson;
import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;

@Slf4j
public class HttpBuildUtil {
    private static final Gson gosn = new Gson();

    private static String url = PropertiesUtil.getValue("url");

    private static String schema = StringUtil.getSchemeFromHttpAddress(url);

    private static String ip = StringUtil.getIpFromHttpAddress(url);

    private static int port = StringUtil.getPortFromHttpAddress(url);

    public static HttpHost getHttpHost(){
        HttpHost httpHost = new HttpHost(ip,port,schema);
        return httpHost;
    }

    public static RestRequest buildRestRequest(String method, Map<String,String> headers, String entity,Map<String,String> params){
        RestRequest restRequest = new RestRequest();
        headers.put("Content-Type","application/json");
        restRequest.setHttpHeaders(headers);
        restRequest.setHttpMethod(method);

        if(entity != null){
            restRequest.setEntity(entity);
        }

        if(params != null){
            restRequest.setParameters(params);
        }
        return restRequest;
    }

    public static RestResponse sendMsg(String resourceUri, RestRequest restRequest) {
        HttpHost host = getHttpHost();
        RestResponse response = null;
        try {
            response = HttpUtil.getInstance().sendMessage(host, resourceUri, restRequest);
        } catch (URISyntaxException e) {
            log.error("send msg uri syntax error:" + e.getMessage());
        } catch (IOException e) {
            log.error("send msg io error:" + e.getMessage());
        }
        return response;
    }
}

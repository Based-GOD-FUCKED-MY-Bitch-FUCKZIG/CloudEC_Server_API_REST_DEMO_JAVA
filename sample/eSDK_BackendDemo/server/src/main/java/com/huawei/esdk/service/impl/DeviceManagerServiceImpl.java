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
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.service.ConferenceManagerService;
import com.huawei.esdk.service.DeviceManagerService;
import com.huawei.esdk.utils.AuthedUtil;
import com.huawei.esdk.utils.CheckPathUtil;
import com.huawei.esdk.utils.PropertiesUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class DeviceManagerServiceImpl implements DeviceManagerService {

    JsonParser jsonParser = new JsonParser();

    @Autowired
    Gson gson;
    
    @Override
    public RestResponse addDevice(String deviceInfo, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-addDevice");

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),deviceInfo,null);
        return response;
    }

    @Override
    public RestResponse modifyDevice(String sn,String deviceInfo, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/" + sn;

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),deviceInfo,null);
        return response;
    }

    @Override
    public RestResponse getDeviceInfo(String sn,String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/" + sn;

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse delDevice(String snList, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/delete";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),snList,null);
        return response;
    }

    @Override
    public RestResponse searchDevice(String searchInfo, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/search";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),searchInfo,null);
        return response;
    }

    @Override
    public RestResponse modDeviceStatus(int value,String snList, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/status/" + value;

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),snList,null);
        return response;
    }

    @Override
    public RestResponse getDeviceType(String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/type" ;

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse resetDeviceCode(String sn,String contactInfo, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/device/" + sn + "/activecode";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),contactInfo,null);
        return response;
    }
}

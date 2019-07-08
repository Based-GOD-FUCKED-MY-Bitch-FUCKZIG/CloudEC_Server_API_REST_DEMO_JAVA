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
import com.huawei.esdk.common.MethodEnum;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.service.CorpManagerManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CorpManagerManageServiceImpl implements CorpManagerManageService {

    @Override
    public RestResponse addCorpManager(String data, String account, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/admin/" + account;


        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse modifyCorpManager(String data, String account, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/admin/" + account;


        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse getCorpManager(String account, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/admin/" + account;


        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse delCorpManager(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/admin/delete";


        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse pageQueryCorpManager(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/admin/search";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }
}

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

import com.huawei.esdk.common.MethodEnum;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.service.ResourceService;
import com.huawei.esdk.utils.PropertiesUtil;
import org.springframework.stereotype.Service;

@Service
public class ResourceServiceImpl implements ResourceService {
    @Override
    public RestResponse queryCorpResourceList(String corpId, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource";

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);
        return response;
    }

    @Override
    public RestResponse spCorpResourceSearch(String corpId, String authorization,String data) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource/search";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);
        return response;
    }

    @Override
    public RestResponse spCorpResourceRecordSearch(String corpId, String authorization,String data) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource-record/search";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);
        return response;
    }
	
	@Override
    public RestResponse delCorpResource(String corpId, String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource/delete";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);
        return response;
    }

    @Override
    public RestResponse queryResourceType(String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-queryResourceType");

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);
        return response;
    }

    @Override
    public RestResponse addCorpResource(String corpId, String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);
        return response;
    }

    @Override
    public RestResponse modifyResourceExpireTime(String corpId, String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + corpId + "/resource";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);
        return response;
    }
}

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
import com.huawei.esdk.service.CorpDeptManageService;
import com.huawei.esdk.utils.PropertiesUtil;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class CorpDeptManageServiceImpl implements CorpDeptManageService {

    @Override
    public RestResponse addCorpDept(String body, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-addCorpDept");

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(), resourceUri,
                CommonService.handleAuthHeaders(authorization), body, null);
        return response;
    }

    @Override
    public RestResponse modifyCorpDept(String deptCode, String body, String authorization, HttpServletResponse httpResponse) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/dept/" + deptCode;

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(), resourceUri,
                CommonService.handleAuthHeaders(authorization), body, null);

        return response;
    }

    @Override
    public RestResponse deleteCorpDept(String deptCode, String authorization, HttpServletResponse httpResponse) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/dept/" + deptCode;

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(), resourceUri,
                CommonService.handleAuthHeaders(authorization), null, null);

        return response;
    }

    @Override
    public RestResponse queryCorpDept(String deptCode, String authorization, HttpServletResponse httpResponse) {
        String resourceUri = "/rest/usg/datacenter/v1/member/dept/" + deptCode;

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(), resourceUri,
                CommonService.handleAuthHeaders(authorization), null, null);

        return response;
    }

    @Override
    public RestResponse queryCorpDeptByName(String deptName, String authorization, HttpServletResponse httpResponse) {
        String resourceUri = PropertiesUtil.getValue("rest-queryDeptByName");
        Map<String,String> params = new HashMap();
        params.put("deptName",deptName);

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(), resourceUri,
                CommonService.handleAuthHeaders(authorization), null, params);

        return response;
    }
}

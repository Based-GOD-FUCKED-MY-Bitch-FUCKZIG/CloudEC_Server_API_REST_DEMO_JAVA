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
import com.huawei.esdk.service.CorpManageService;
import com.huawei.esdk.utils.PropertiesUtil;
import org.springframework.stereotype.Service;

@Service
public class CorpManageServiceImp implements CorpManageService {

    @Override
    //添加用户
    public RestResponse addCorpUser(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/member";


        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //修改用户
    public RestResponse modCorpUser(String account,String data, String authorization) {

        String resourceUri = "/rest/usg/datacenter/v1/corp/member/" + account;


        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //查询用户详情
    public RestResponse queryCorpUser(String account, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/member/" + account;


        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    //分页查询用户
    public RestResponse pageQueryCorpUser(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/member/search";


        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //批量修改用户状态
    public RestResponse modCorpUserStatus(String value, String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/member/status/" + value;


        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //批量删除用户
    public RestResponse delCorpUsers(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/corp/member/delete";


        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //用户查询自己的信息
    public RestResponse getMemberInfo(String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-getMemberInfo");

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);
        return response;
    }

    @Override
    //用户修改自己的信息
    public RestResponse modUserMessage(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/member";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //获取验证码
    public RestResponse getVerifycode(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/member/verification-code";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //校验手机和邮箱对应的验证码
    public RestResponse checkVerifycode(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/member/verification-code";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //修改手机或邮箱
    public RestResponse modCommunication(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/member/contact";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //修改密码
    public RestResponse modUserPassword(String data, String authorization) {
        String resourceUri = "/rest/usg/ap/v1/password/mod";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    //重置密码
    public RestResponse resetUserPassword(String data, String authorization) {
        String resourceUri = "/rest/usg/ap/v1/password/admin/reset";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse addCorp(String data, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse modifyCorp(String data, String id, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + id;

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse queryCorpDetail(String id, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + id;

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse delCorp(String id, String authorization) {
        String resourceUri = "/rest/usg/datacenter/v1/sp/corp/" + id;

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);
        return response;
    }
	
	@Override
    public RestResponse searchSpCorp(String data, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-searchSpCorp");

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse querySpCorpInfo(String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-querySpCorpInfo");

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse modifySpCorp(String data, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-modifySpCorp");

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),data,null);

        return response;
    }

    @Override
    public RestResponse searchCorpResource(String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-searchCorpResource");

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }
}

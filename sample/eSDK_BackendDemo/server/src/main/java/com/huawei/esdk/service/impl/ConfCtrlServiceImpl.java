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
import com.huawei.esdk.service.ConfCtrlService;
import com.huawei.esdk.utils.AuthedUtil;
import com.huawei.esdk.utils.CheckPathUtil;
import com.huawei.esdk.utils.HttpBuildUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class ConfCtrlServiceImpl implements ConfCtrlService {

    @Autowired
    Gson gson;

    @Override
    public RestResponse getConfToken(String confId, String Password, String loginType) {
        String resourceUri = "/conferences/" + confId + "/token";

        Map<String,String> map = new HashMap<>();
        map.put("loginType", loginType);
        map.put("Password",Password);

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,map,null,null);

        return response;
    }

    @Override
    public RestResponse delParticipantByPhoneNum(String confId, String phoneNum, String confAuth) {
        String resourceUri = "/conferences/" + confId + "/participants/" + phoneNum;

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),null,null);

        return response;
    }

    @Override
    public RestResponse applyChair(String confId, String participantId, String confAuth, String entity) {
        String resourceUri = "/conferences/" + confId + "/participants/" + participantId + "/role";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),entity,null);

        return response;
    }

    @Override
    public RestResponse muteConf(String confId, String confAuth, String data) {
        String resourceUri = "/conferences/" + confId + "/mute";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),data,null);

        return response;
    }

    @Override
    public RestResponse lockConf(String confId, String confAuth, String data) {
        String resourceUri = "/conferences/" + confId + "/lock";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),data,null);

        return response;
    }

    @Override
    public RestResponse forParticipant(String confId, String confAuth) {
        String resourceUri = "/conferences/" + confId + "/forParticipant";

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),null,null);

        return response;
    }

    @Override
    public RestResponse delParticipant(String confId, String participantId, String confAuth) {
        String resourceUri = "/conferences/" + confId + "/participants/" + participantId + "/status";

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),null,null);

        return response;
    }

	@Override
    public RestResponse renameSite(String data, String conferenceid, String confAuth) {
        String resourceUri = "/conferences/"+ conferenceid +"/participants/rename";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),data,null);

        return response;
    }

    @Override
    public RestResponse broadcast(String conferenceid, String participantID, String confAuth) {
        String resourceUri = "/conferences/" + conferenceid + "/participants/" + participantID + "/broadcast";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),null,null);

        return response;
    }

    @Override
    public RestResponse setRecord(String data, String conferenceid, String confAuth) {
        String resourceUri = "/conferences/" + conferenceid + "/setRecord";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(confAuth),data,null);

        return response;
    }

    @Override
    public RestResponse getRecordFiles(String params, String authorization) {
        String resourceUri = "/conferences/recordfile";

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,parameters);

        return response;
    }

    @Override
    public RestResponse getRecordFile(String confUUID, String authorization) {
        String resourceUri = "/conferences/" + confUUID + "/recordfile";

        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse inviteParticipants(String conferenceid, String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/participants";

        RestResponse response = CommonService.handleRequest(MethodEnum.POST.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),confInfo,null);

        return response;
    }

    @Override
    public RestResponse participantsMute(String conferenceid, String participantID, String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/participants/" + participantID +"/mute";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),confInfo,null);

        return response;
    }

    @Override
    public RestResponse endConf(String conferenceid, String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/state";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),confInfo,null);

        return response;
    }

    @Override
    public RestResponse setMultiPicture(String conferenceid, String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/setMultiPicture";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),confInfo,null);

        return response;
    }

    @Override
    public RestResponse switchMode(String conferenceid, String confInfo, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/switchMode";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),confInfo,null);

        return response;
    }

    @Override
    public RestResponse isRollcalled(String conferenceid, String participantID, String authorization) {
        String resourceUri = "/conferences/" + conferenceid + "/participants/" + participantID +"/isRollcalled";

        RestResponse response = CommonService.handleRequest(MethodEnum.PUT.getValue(),resourceUri,
                CommonService.handleConfAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse delRecordFile(String confUUID, String authorization) {
        String resourceUri = "/conferences/" + confUUID + "/recordfile";

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,null);

        return response;
    }

    @Override
    public RestResponse deleteRecordfiles(String confUUIDs, String authorization) {
        String resourceUri = "/conferences/recordfile";

        Map<String,String> params = new HashMap<>();
        params.put("confUUIDs",confUUIDs);

        RestResponse response = CommonService.handleRequest(MethodEnum.DELETE.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,params);

        return response;
    }

    @Override
    public RestResponse getHistoryConfList(String params, String authorization) {
        String resourceUri = "/historyConferences";

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,
                CommonService.handleAuthHeaders(authorization),null,parameters);

        return response;
    }

    @Override
    public RestResponse getHistoryConfInfo(String confuuid, String params,String authorization,String type,String queryType) {
        String resourceUri = "/historyConferences/" + confuuid;

        Map<String,String> map = CommonService.handleAuthHeaders(authorization);
        map.put("type",type);
        map.put("queryType", queryType);

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,map,null,parameters);

        return response;
    }

    @Override
    public RestResponse getHistoryConfCtlRecord(String confuuid, String params,String authorization,String language) {
        String resourceUri = "/historyConferences/" + confuuid + "/hisConfCtlRecord";

        Map<String,String> map = CommonService.handleAuthHeaders(authorization);
        map.put("type",language);

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,map,null,parameters);

        return response;
    }

    @Override
    public RestResponse getHistoryConfAttendeeRecord(String confuuid, String params,String authorization,String language) {
        String resourceUri = "/historyConferences/" + confuuid + "/hisConfAttendeeRecord";

        Map<String,String> map = CommonService.handleAuthHeaders(authorization);
        map.put("type",language);

        String checkParams = CheckPathUtil.jsonPathFormat(params);
        Map parameters = gson.fromJson(checkParams, Map.class);
        RestResponse response = CommonService.handleRequest(MethodEnum.GET.getValue(),resourceUri,map,null,parameters);

        return response;
    }
}

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
import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.model.UserLoginRequest;
import com.huawei.esdk.utils.HttpBuildUtil;
import com.huawei.esdk.utils.PropertiesUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.huawei.esdk.service.UserService;
import java.util.HashMap;
import java.util.Map;

@Repository
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private Gson gson;

    @Override
    public RestResponse login(String username, String authorization) {
        String resourceUri = PropertiesUtil.getValue("rest-auth");

        Map<String,String> map = new HashMap<>();
        map.put("Authorization",authorization);

        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setClientType(0);
        userLoginRequest.setCreateTokenType(0);
        userLoginRequest.setForceLoginInd(0);
        userLoginRequest.setAccount(username);

        String entity = gson.toJson(userLoginRequest);
        RestRequest restRequest = HttpBuildUtil.buildRestRequest(MethodEnum.PUT.getValue(),map,entity,null);
        RestResponse response = HttpBuildUtil.sendMsg(resourceUri, restRequest);
        return response;
    }

}

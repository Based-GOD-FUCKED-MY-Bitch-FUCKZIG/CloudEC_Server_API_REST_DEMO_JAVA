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
package com.huawei.esdk.controller;

import com.google.gson.JsonParser;
import com.huawei.esdk.common.ConstVar;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.common.ResultInfo;
import com.huawei.esdk.utils.ErroMessage;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;

@Slf4j
public class CommonController {

    private static final JsonParser jsonParser = new JsonParser();

    public static ResultInfo handleResponse(RestResponse response, HttpServletResponse httpResponse){
        ResultInfo<Object> resultInfo = new ResultInfo<>();
        if (response == null){
            return ErroMessage.connectLoseError(resultInfo);
        }

        log.info("response is:  " + response.toString());

        int returnCode = jsonParser.parse(response.getEntity()).getAsJsonObject().get("returnCode").getAsInt();

        if(returnCode == ConstVar.SC_TOKEN_IS_NULL || returnCode == ConstVar.SC_TOKEN_EXPIRED){
            return ErroMessage.setUnAuthed(httpResponse);
        }

        return ErroMessage.responseMessage(resultInfo,response);
    }
}

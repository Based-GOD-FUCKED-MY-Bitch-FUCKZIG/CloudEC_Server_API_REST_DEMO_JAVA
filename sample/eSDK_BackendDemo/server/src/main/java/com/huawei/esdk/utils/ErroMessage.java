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

import com.huawei.esdk.common.ConstVar;
import com.huawei.esdk.common.ResultInfo;

import javax.servlet.http.HttpServletResponse;

public class ErroMessage {

    public static ResultInfo setUnAuthed(HttpServletResponse httpResponse){
        ResultInfo<String> resultInfo = new ResultInfo<>();
        resultInfo.setSuccess(false);
        httpResponse.setStatus(ConstVar.SC_UNAUTH);
        resultInfo.setMsg("鉴权未通过！");
        return resultInfo;
    }

    public static ResultInfo connectLoseError(ResultInfo<Object> resultInfo){
        resultInfo.setSuccess(false);
        resultInfo.setMsg("服务器发生错误，请检查服务器！");
        return resultInfo;
    }

    public static ResultInfo connectUnFound(ResultInfo<Object> resultInfo){
        resultInfo.setSuccess(false);
        resultInfo.setMsg("服务器无法响应(404)！");
        return resultInfo;
    }

    public static ResultInfo responseMessage(ResultInfo<Object> resultInfo,Object object){
        resultInfo.setSuccess(true);
        resultInfo.setData(object);
        return resultInfo;
    }
}

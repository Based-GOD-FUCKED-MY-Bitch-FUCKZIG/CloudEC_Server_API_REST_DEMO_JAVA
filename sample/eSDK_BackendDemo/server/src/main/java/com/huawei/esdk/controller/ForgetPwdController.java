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

import com.google.gson.Gson;
import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.common.ResultInfo;
import com.huawei.esdk.service.ForgetPwdService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class ForgetPwdController {
    @Autowired
    private Gson gson;
    @Autowired
    private ForgetPwdService forgetPwdService;

    /**
     * @Description: 发送滑块验证码
     * @Param: [data,  httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/22
     */
    @PostMapping("/slideverifycode/send")
    public ResultInfo sendSlideVerifycode(@RequestBody String data,
                                     HttpServletResponse httpResponse){
        log.info("enter sendSlideVerifycode method");
        RestResponse response = forgetPwdService.sendSlideVerifycode(data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
    /**
     * @Description: 校验滑块验证码
     * @Param: [data,  httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/22
     */
    @PutMapping("/slideverifycode/check")
    public ResultInfo checkSlideVerifycode(@RequestBody String data,
                                     HttpServletResponse httpResponse){
        log.info("enter checkSlideVerifycode method");
        RestResponse response = forgetPwdService.checkSlideVerifycode(data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 发送验证码
     * @Param: [data,  httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/22
     */
    @PostMapping("/verifycode/send")
    public ResultInfo sendVerifyCode(@RequestBody String data,
                                     HttpServletResponse httpResponse){
        log.info("enter sendVerifyCode method");
        RestResponse response = forgetPwdService.sendVerifyCode(data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 校验验证码
     * @Param: [data,  httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/22
     */
    @PutMapping("/verifycode/check")
    public ResultInfo checkVerifyCode(@RequestBody String data,
                                     HttpServletResponse httpResponse){
        log.info("enter checkVerifyCode method");
        RestResponse response = forgetPwdService.checkVerifyCode(data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 用户重置密码
     * @Param: [data, authorization,httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/22
     */
    @PutMapping("/password/reset")
    public ResultInfo resetPassword(@RequestBody String data,@RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter resetPassword method");
        RestResponse response = forgetPwdService.resetPassword(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

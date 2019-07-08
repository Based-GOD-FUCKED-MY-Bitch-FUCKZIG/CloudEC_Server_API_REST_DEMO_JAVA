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

import com.huawei.esdk.common.RestResponse;
import com.huawei.esdk.service.ConferenceManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.huawei.esdk.common.ResultInfo;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class ConferenceController {

    @Autowired
    private ConferenceManagerService conferenceManagerService;

    /**
    * @Description: 预约会议
    * @Param: [data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PostMapping("/conferences")
    public ResultInfo createConf(@RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                 HttpServletResponse httpResponse){
        log.info("enter createConf method");
        RestResponse response = conferenceManagerService.createConf(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 取消预约会议
    * @Param: [conferenceid, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @DeleteMapping("/conferences/{conferenceid}" )
    public ResultInfo cancelConf(@PathVariable String conferenceid, @RequestHeader(name = "Authorization") String authorization,
                             HttpServletResponse httpResponse){
        log.info("enter cancelConf method");
        RestResponse response = conferenceManagerService.delConf(conferenceid,authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 修改预约会议
    * @Param: [conferenceid, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}")
    public ResultInfo modifyConf(@PathVariable(name = "conferenceid") String conferenceid,
                             @RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter modifyConf method");
        RestResponse conf = conferenceManagerService.modifyConf(conferenceid, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(conf,httpResponse);

        return resultInfo;
    }
	
    /**
    * @Description: 获取会议列表
    * @Param: [params, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
	@GetMapping("/conferences")
    public ResultInfo getConfList(@RequestParam String params, @RequestHeader(name = "Authorization") String authorization,
                              HttpServletResponse httpResponse){
        log.info("enter getConfList method");
        RestResponse response = conferenceManagerService.getConfList(params, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

     /**
     * @Description: 查询会议信息
     * @Param: [conferencesid, params, authorization, type, queryType, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/4/17
     */
    @GetMapping("/conferences/{conferenceid}")
    public ResultInfo getConfInfo(@PathVariable(name = "conferenceid") String conferencesid,
                                  @RequestParam String params,
                                  @RequestHeader(name = "Authorization") String authorization,
                                  @RequestHeader(name = "type") String type,
                                  @RequestHeader(name = "queryType") String queryType,
                                  HttpServletResponse httpResponse){
        log.info("enter getConfInfo method");
        RestResponse response = conferenceManagerService.getConfInfo(conferencesid,params,authorization,type,queryType);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 获取会议鉴权，以实现一键入会
    * @Param: [body, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/10
    */
    @PostMapping("/joinReservedConf")
    public ResultInfo joinReservedConf(@RequestBody String body,
                                 HttpServletResponse httpResponse){
        log.info("enter joinReservedConf method");
        RestResponse response = conferenceManagerService.joinReservedConf(body);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

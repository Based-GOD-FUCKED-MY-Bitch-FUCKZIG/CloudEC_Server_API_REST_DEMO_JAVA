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
import com.huawei.esdk.common.ResultInfo;
import com.huawei.esdk.service.CorpManagerManageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class CorpManagerManageController {
    @Autowired
    private CorpManagerManageService corpManagerManageService;

    /**
    * @Description: 添加管理员
    * @Param: [data, authorization, account, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @PostMapping("/rest/usg/datacenter/v1/corp/admin/{account}")
    public ResultInfo addCorpManager(@RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                       @PathVariable(name = "account") String account,
                                       HttpServletResponse httpResponse){
        log.info("enter addCorpManager method");
        RestResponse response = corpManagerManageService.addCorpManager(data,account,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 修改管理员
    * @Param: [data, authorization, account, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @PutMapping("/rest/usg/datacenter/v1/corp/admin/{account}")
    public ResultInfo modifyCorpManager(@RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                     @PathVariable(name = "account") String account,
                                     HttpServletResponse httpResponse){
        log.info("enter modifyCorpManager method");
        RestResponse response = corpManagerManageService.modifyCorpManager(data,account,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询管理员信息
    * @Param: [authorization, account, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @GetMapping("/rest/usg/datacenter/v1/corp/admin/{account}")
    public ResultInfo getCorpManager(@RequestHeader(name = "Authorization") String authorization,
                                     @PathVariable(name = "account") String account,
                                     HttpServletResponse httpResponse){
        log.info("enter getCorpManager method");
        RestResponse response = corpManagerManageService.getCorpManager(account,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 删除管理员
    * @Param: [data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @PostMapping("/rest/usg/datacenter/v1/corp/admin/delete")
    public ResultInfo delCorpManager(@RequestBody String data,@RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter delCorpManager method");
        RestResponse response = corpManagerManageService.delCorpManager(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询管理员列表
    * @Param: [data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @PostMapping("/rest/usg/datacenter/v1/corp/admin/search")
    public ResultInfo pageQueryCorpManager(@RequestBody String data,@RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter pageQueryCorpManager method");
        RestResponse response = corpManagerManageService.pageQueryCorpManager(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

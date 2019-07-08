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
import com.huawei.esdk.service.CorpDeptManageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class CorpDeptManageController {

    @Autowired
    private CorpDeptManageService corpDeptManageService;

    /**
    * @Description: 增加部门
    * @Param: [body, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/27
    */
    @PostMapping("/add/corp/dept")
    public ResultInfo addCorpDept(@RequestBody String body,
                                  @RequestHeader(name = "Authorization") String authorization,
                                  HttpServletResponse httpResponse){
        log.info("enter addCorpDept method");
        RestResponse response = corpDeptManageService.addCorpDept(body,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 修改部门
    * @Param: [deptCode, body, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/27
    */
    @PutMapping("/rest/usg/datacenter/v1/corp/dept/{deptCode}")
    public ResultInfo modifyCorpDept(@PathVariable String deptCode,
                                     @RequestBody String body,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter modifyCorpDept method");
        RestResponse response = corpDeptManageService.modifyCorpDept(deptCode,body,authorization,httpResponse);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 删除部门
    * @Param: [deptCode, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/27
    */
    @DeleteMapping("/rest/usg/datacenter/v1/corp/dept/{deptCode}")
    public ResultInfo deleteCorpDept(@PathVariable String deptCode,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter deleteCorpDept method");
        RestResponse response = corpDeptManageService.deleteCorpDept(deptCode,authorization,httpResponse);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询部门及其一级子部门
    * @Param: [deptCode, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/27
    */
    @GetMapping("/rest/usg/datacenter/v1/member/dept/{deptCode}")
    public ResultInfo queryCorpDept(@PathVariable String deptCode,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter queryCorpDept method");
        RestResponse response = corpDeptManageService.queryCorpDept(deptCode,authorization,httpResponse);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 按名称查询部门
    * @Param: [deptName, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/5/27
    */
    @GetMapping("/rest/usg/datacenter/v1/member/dept")
    public ResultInfo queryCorpDeptByName(@RequestParam("deptName") String deptName,
                                    @RequestHeader(name = "Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter queryCorpDeptByName method");
        RestResponse response = corpDeptManageService.queryCorpDeptByName(deptName,authorization,httpResponse);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

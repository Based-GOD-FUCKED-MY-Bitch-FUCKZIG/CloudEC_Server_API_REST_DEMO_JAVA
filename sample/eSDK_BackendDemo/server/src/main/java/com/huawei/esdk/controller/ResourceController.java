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
import com.huawei.esdk.service.ResourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class ResourceController {

    @Autowired
    ResourceService resourceService;

    /**
    * @Description: 查询企业资源列表
    * @Param: [corpId, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/26
    */
    @GetMapping("/rest/usg/datacenter/v1/sp/corp/{corpId}/resource")
    public ResultInfo queryCorpResourceList(@PathVariable(name = "corpId") String corpId,
                                            @RequestHeader("Authorization") String authorization,
                                            HttpServletResponse httpResponse){
        log.info("enter queryCorpResourceList method");
        RestResponse response = resourceService.queryCorpResourceList(corpId,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    /**
     * @Description: SP根据条件查询企业的资源项
     * @Param: [corpId, data,authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/6/26
     */
    @PostMapping("/sp/corp/{corpId}/resource/search")
    public ResultInfo spCorpResourceSearch(@PathVariable(name = "corpId") String corpId,
                                           @RequestHeader("Authorization") String authorization,
                                           @RequestBody String data,
                                           HttpServletResponse httpResponse){
        log.info("enter spCorpResourceSearch method");
        RestResponse response = resourceService.spCorpResourceSearch(corpId,authorization,data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    /**
     * @Description: SP根据条件查询企业的资源操作记录
     * @Param: [corpId, authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/6/26
     */
    @PostMapping("/sp/corp/{corpId}/resource-record/search")
    public ResultInfo spCorpResourceRecordSearch(@PathVariable(name = "corpId") String corpId,
                                                 @RequestHeader("Authorization") String authorization,
                                                 @RequestBody String data,
                                                 HttpServletResponse httpResponse){
        log.info("enter spCorpResourceRecordSearch method");
        RestResponse response = resourceService.spCorpResourceRecordSearch(corpId,authorization,data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }
	
	/**
    * @Description: 企业删除资源项
    * @Param: [corpId, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/27
    */
    @PostMapping("/rest/usg/datacenter/v1/sp/corp/{corpId}/resource/delete")
    public ResultInfo delCorpResource(@PathVariable(name = "corpId") String corpId,
                                      @RequestBody String data,
                                      @RequestHeader("Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter delCorpResource method");
        RestResponse response = resourceService.delCorpResource(corpId,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询sp支持的订单资源类型
    * @Param: [authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/29
    */
    @GetMapping("/sp/corp/resource/type")
    public ResultInfo queryResourceType(@RequestHeader("Authorization") String authorization,
                                            HttpServletResponse httpResponse){
        log.info("enter queryResourceType method");
        RestResponse response = resourceService.queryResourceType(authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 新增资源发放
    * @Param: [corpId, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/29
    */
    @PostMapping("/rest/usg/datacenter/v1/sp/corp/{corpId}/resource")
    public ResultInfo addCorpResource(@PathVariable(name = "corpId") String corpId,
                                      @RequestBody String data,
                                      @RequestHeader("Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter addCorpResource method");
        RestResponse response = resourceService.addCorpResource(corpId,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 修改资源过期时间
    * @Param: [corpId, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/29
    */
    @PutMapping("/rest/usg/datacenter/v1/sp/corp/{corpId}/resource")
    public ResultInfo modifyResourceExpireTime(@PathVariable(name = "corpId") String corpId,
                                      @RequestBody String data,
                                      @RequestHeader("Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter modifyResourceExpireTime method");
        RestResponse response = resourceService.modifyResourceExpireTime(corpId,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }
}

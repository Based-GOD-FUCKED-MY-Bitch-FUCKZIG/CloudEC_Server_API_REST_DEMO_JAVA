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
import com.huawei.esdk.service.CorpManageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class CorpManageController {
    @Autowired
    private CorpManageService corpManageService;

    /**
     * @Description: 添加用户
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PostMapping("/corp/member")
    public ResultInfo addCorpUser(@RequestBody String data,
                                  @RequestHeader(name = "Authorization") String authorization,
                                  HttpServletResponse httpResponse){
        log.info("enter addCorpUser method");
        RestResponse response = corpManageService.addCorpUser(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 修改用户
     * @Param: [account, data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/corp/member/{account}")
    public ResultInfo modCorpUser(@PathVariable(name = "account") String account,
                                  @RequestBody String data,
                                  @RequestHeader(name = "Authorization") String authorization,
                                  HttpServletResponse httpResponse){
        log.info("enter modCorpUser method");
        RestResponse response = corpManageService.modCorpUser(account,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 查询用户详情
     * @Param: [account, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/21
     */
    @GetMapping("/corp/member/{account}")
    public ResultInfo queryCorpUser(@PathVariable(name = "account") String account,
                                       @RequestHeader(name = "Authorization") String authorization,
                                       HttpServletResponse httpResponse){
        log.info("enter queryCorpUser method");
        RestResponse response = corpManageService.queryCorpUser(account, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 分页查询用户
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/21
     */
    @PostMapping("/corp/member/search")
    public ResultInfo pageQueryCorpUser(@RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                       HttpServletResponse httpResponse){
        log.info("enter pageQueryCorpUser method");
        RestResponse response = corpManageService.pageQueryCorpUser(data, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 批量修改用户状态
     * @Param: [value, data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/corp/member/status/{value}")
    public ResultInfo modCorpUserStatus(@PathVariable(name = "value") String value,
                                  @RequestBody String data,
                                  @RequestHeader(name = "Authorization") String authorization,
                                  HttpServletResponse httpResponse){
        log.info("enter modCorpUserStatus method");
        RestResponse response = corpManageService.modCorpUserStatus(value,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 批量删除用户
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PostMapping("/corp/member/delete")
    public ResultInfo delCorpUsers(@RequestBody String data,
                                   @RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter delCorpUsers method");
        RestResponse response = corpManageService.delCorpUsers(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 用户查询自己的信息
     * @Param: [authorization, httpServletResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/7
     */
    @GetMapping("/datacenter/v1/member")
    public ResultInfo getMemberInfo(@RequestHeader("Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter getMemberInfo method");
        RestResponse response = corpManageService.getMemberInfo(authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 用户修改自己的信息
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/datacenter/v1/member")
    public ResultInfo modUserMessage(@RequestBody String data,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter modUserMessage method");
        RestResponse response = corpManageService.modUserMessage(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 获取验证码
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PostMapping("/member/verification-code")
    public ResultInfo getVerifycode(@RequestBody String data,
                                   @RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter getVerifycode method");
        RestResponse response = corpManageService.getVerifycode(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 校验手机和邮箱对应的验证码
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/member/verification-code")
    public ResultInfo checkVerifycode(@RequestBody String data,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter checkVerifycode method");
        RestResponse response = corpManageService.checkVerifycode(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 修改手机或邮箱
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/member/contact")
    public ResultInfo modCommunication(@RequestBody String data,
                                      @RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter modCommunication method");
        RestResponse response = corpManageService.modCommunication(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 修改密码
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/password/mod")
    public ResultInfo modUserPassword(@RequestBody String data,
                                       @RequestHeader(name = "Authorization") String authorization,
                                       HttpServletResponse httpResponse){
        log.info("enter modUserPassword method");
        RestResponse response = corpManageService.modUserPassword(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 重置密码
     * @Param: [data, Authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/5/25
     */
    @PutMapping("/password/admin/reset")
    public ResultInfo resetUserPassword(@RequestBody String data,
                                      @RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter resetUserPassword method");
        RestResponse response = corpManageService.resetUserPassword(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 创建企业
     * @Param: [data, authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/6/26
     */
    @PostMapping("/rest/usg/datacenter/v1/sp/corp")
    public ResultInfo addCorp(@RequestBody String data,
                              @RequestHeader(name = "Authorization") String authorization,
                              HttpServletResponse httpResponse) {
        log.info("enter addCorp method");
        RestResponse response = corpManageService.addCorp(data, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);
        return resultInfo;
    }

    /**
     * @Description: 修改企业
     * @Param: [data, authorization, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/6/26
     */
    @PutMapping("/rest/usg/datacenter/v1/sp/corp/{id}")
    public ResultInfo modifyCorp(@RequestBody String data,
                                 @PathVariable(name = "id") String id,
                                 @RequestHeader(name = "Authorization") String authorization,
                                 HttpServletResponse httpResponse) {
        log.info("enter modifyCorp method");
        RestResponse response = corpManageService.modifyCorp(data, id, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 查询企业详情
    * @Param: [id, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/26
    */
    @GetMapping("/rest/usg/datacenter/v1/sp/corp/{id}")
    public ResultInfo queryCorpDetail(@PathVariable(name = "id") String id,
                                      @RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter queryCorpDetail method");
        RestResponse response = corpManageService.queryCorpDetail(id, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }

    @DeleteMapping("/rest/usg/datacenter/v1/sp/corp/{id}")
    public ResultInfo delCorp(@PathVariable(name = "id") String id,
                                      @RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter delCorp method");
        RestResponse response = corpManageService.delCorp(id, authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response, httpResponse);

        return resultInfo;
    }
	
	 /**
    * @Description: 分页搜索企业
    * @Param: [data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @PostMapping("/sp/corp/search")
    public ResultInfo searchSpCorp(@RequestBody String data,
                                        @RequestHeader(name = "Authorization") String authorization,
                                        HttpServletResponse httpResponse){
        log.info("enter searchSpCorp method");
        RestResponse response = corpManageService.searchSpCorp(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询sp企业注册信息
    * @Param: [authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/25
    */
    @GetMapping("/sp/corp/info")
    public ResultInfo querySpCorpInfo(@RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter querySpCorpInfo method");
        RestResponse response = corpManageService.querySpCorpInfo(authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 修改企业注册信息
    * @Param: [authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/26
    */
    @PutMapping("/modify/sp/corp")
    public ResultInfo modifySpCorp(@RequestBody String data,
                                   @RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter modifySpCorp method");
        RestResponse response = corpManageService.modifySpCorp(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
    
    /**
    * @Description: 查询企业内资源及权限
    * @Param: [authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/6/26
    */
    @GetMapping("/search/corp/resource")
    public ResultInfo searchCorpResource(@RequestHeader(name = "Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter searchCorpResource method");
        RestResponse response = corpManageService.searchCorpResource(authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

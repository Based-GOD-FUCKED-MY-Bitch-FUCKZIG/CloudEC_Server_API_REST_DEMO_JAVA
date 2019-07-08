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
import com.huawei.esdk.service.DeviceManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Slf4j
public class DeviceController {

    @Autowired
    private DeviceManagerService deviceManagerService;

    /**
    * @Description: 增加终端
    * @Param: [data, authorization, httpResponse]
    * @return: com.huawei.test.common.ResultInfo
    * @Date: 2019/5/14
    */
    @PostMapping("/rest/usg/datacenter/v1/corp/device")
    public ResultInfo addDevice(@RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                 HttpServletResponse httpResponse){
        log.info("enter addDevice method");
        RestResponse response = deviceManagerService.addDevice(data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 修改终端
     * @Param: [sn, data, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/14
     */
    @PutMapping("/rest/usg/datacenter/v1/corp/device/{sn}")
    public ResultInfo modifyDevice(@PathVariable String sn, @RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                HttpServletResponse httpResponse){
        log.info("enter modifyDevice method");
        RestResponse response = deviceManagerService.modifyDevice(sn,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 查询终端详情
     * @Param: [sn, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/4/17
     */
    @GetMapping("/rest/usg/datacenter/v1/corp/device/{sn}")
    public ResultInfo getDeviceInfo(@PathVariable(name = "sn")String sn,
                                    @RequestHeader(name = "Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter getDeviceInfo method");
        RestResponse response = deviceManagerService.getDeviceInfo(sn,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 批量删除终端
     * @Param: [data, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/14
     */
    @PostMapping("/rest/usg/datacenter/v1/corp/device/delete")
    public ResultInfo delDevice(@RequestBody String snList, @RequestHeader(name = "Authorization") String authorization,
                                HttpServletResponse httpResponse){
        log.info("enter delDevice method");
        RestResponse response = deviceManagerService.delDevice(snList,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 分页查询终端
     * @Param: [data, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/17
     */
    @PostMapping("/rest/usg/datacenter/v1/corp/device/search")
    public ResultInfo searchDevice(@RequestBody String searchInfo, @RequestHeader(name = "Authorization") String authorization,
                                HttpServletResponse httpResponse){
        log.info("enter searchDevice method");
        RestResponse response = deviceManagerService.searchDevice(searchInfo,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 批量修改终端状态
     * @Param: [value, data, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/17
     */
    @PutMapping("/rest/usg/datacenter/v1/corp/device/status/{value}")
    public ResultInfo modDeviceStatus(@PathVariable int value, @RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter modDeviceStatus method");
        RestResponse response = deviceManagerService.modDeviceStatus(value,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 获取所有终端类型
     * @Param: [authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/17
     */
    @GetMapping("/rest/usg/datacenter/v1/corp/device/type")
    public ResultInfo getDeviceType(@RequestHeader(name = "Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter getDeviceType method");
        RestResponse response = deviceManagerService.getDeviceType(authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * @Description: 重置激活码
     * @Param: [sn, data, authorization, httpResponse]
     * @return: com.huawei.test.common.ResultInfo
     * @Date: 2019/5/14
     */
    @PutMapping("/rest/usg/datacenter/v1/corp/device/{sn}/activecode")
    public ResultInfo resetDeviceCode(@PathVariable String sn, @RequestBody String data, @RequestHeader(name = "Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter resetDeviceCode method");
        RestResponse response = deviceManagerService.resetDeviceCode(sn,data,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

}

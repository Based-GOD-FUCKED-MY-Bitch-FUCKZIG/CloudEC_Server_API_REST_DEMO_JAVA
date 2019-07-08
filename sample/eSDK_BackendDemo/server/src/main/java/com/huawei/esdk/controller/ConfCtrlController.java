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
import com.huawei.esdk.service.ConfCtrlService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class ConfCtrlController {

    @Autowired
    ConfCtrlService confCtrlService;

    /**
     * @Description: 获取会控token
     * @Param: [confId, Password, loginType, httpResponse]
     * @return: com.huawei.esdk.common.ResultInfo
     * @Date: 2019/4/8
     */
    @GetMapping("/conferences/{confId}/token")
    public ResultInfo getConfToken(@PathVariable(name = "confId") String confId,
                                   @RequestHeader(name = "Password")String Password,
                                   @RequestHeader(name = "loginType") String loginType,
                                   HttpServletResponse httpResponse){
        log.info("enter getConfToken method");
        RestResponse response = confCtrlService.getConfToken(confId,Password,loginType);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询在会会场信息
    * @Param: [confId, nickName, authorization, Password, type, loginType, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/8
    */
    @GetMapping("/conferences/{confId}/forParticipant")
    public ResultInfo forParticipant(@PathVariable(name = "confId") String confId,
                                     @RequestHeader(name = "Conference-Authorization") String confAuth,
                                     HttpServletResponse httpResponse){
        log.info("enter forParticipant method");
        RestResponse response = confCtrlService.forParticipant(confId,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
    
    /**
    * @Description: 与会者离开会议
    * @Param: [confId, participantId, confAuth, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/9
    */
    @DeleteMapping("/conferences/{confId}/participants/{participantId}/status")
    public ResultInfo delParticipant(@PathVariable(name = "confId") String confId,
                                     @PathVariable(name = "participantId") String participantId,
                                     @RequestHeader(name = "Conference-Authorization") String confAuth,
                                     HttpServletResponse httpResponse){
        log.info("enter delParticipant method");
        RestResponse response = confCtrlService.delParticipant(confId,participantId,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
    
    /**
    * @Description: 删除与会者
    * @Param: [confId, phoneNum, confAuth, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/9
    */
    @DeleteMapping("/conferences/{confId}/participants/{number}")
    public ResultInfo delParticipantByPhoneNum(@PathVariable(name = "confId") String confId,
                                     @PathVariable(name = "number") String phoneNum,
                                     @RequestHeader(name = "Conference-Authorization") String confAuth,
                                     HttpServletResponse httpResponse){
        log.info("enter delParticipantByPhoneNum method");
        RestResponse response = confCtrlService.delParticipantByPhoneNum(confId,phoneNum,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 申请主席
    * @Param: [confId, participantId, confAuth, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/10
    */
    @PutMapping("/conferences/{confId}/participants/{participantId}/role")
    public ResultInfo applyChair(@PathVariable(name = "confId") String confId,
                                 @PathVariable(name = "participantId") String participantId,
                                 @RequestHeader(name = "Conference-Authorization") String confAuth,
                                 @RequestBody String data,
                                 HttpServletResponse httpResponse){
        log.info("enter applyChair method");
        RestResponse response = confCtrlService.applyChair(confId,participantId,confAuth,data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 全场静音
    * @Param: [confId, confAuth, data, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/10
    */
    @PutMapping("/conferences/{conferenceId}/mute")
    public ResultInfo muteConf(@PathVariable(name = "conferenceId") String confId,
                               @RequestHeader(name = "Conference-Authorization") String confAuth,
                               @RequestBody String data,
                               HttpServletResponse httpResponse){
        log.info("enter muteConf method");
        RestResponse response = confCtrlService.muteConf(confId,confAuth,data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 锁定会议
    * @Param: [confId, confAuth, data, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/10
    */
    @PutMapping("/conferences/{conferenceId}/lock")
    public ResultInfo lockConf(@PathVariable(name = "conferenceId") String confId,
                               @RequestHeader(name = "Conference-Authorization") String confAuth,
                               @RequestBody String data,
                               HttpServletResponse httpResponse){
        log.info("enter lockConf method");
        RestResponse response = confCtrlService.lockConf(confId,confAuth,data);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

	 /**
	 * @Description: 重命名会场
	 * @Param: [data, conferenceid, confAuth, httpResponse]
	 * @return: com.huawei.esdk.common.ResultInfo
	 * @Date: 2019/4/17
	 */
    @PutMapping("/conferences/{conferenceid}/participants/rename")
    public ResultInfo renameSite(@RequestBody String data,
                                 @PathVariable(name = "conferenceid") String conferenceid,
                                 @RequestHeader(name = "Conference-Authorization") String confAuth,
                                 HttpServletResponse httpResponse){
        log.info("enter renameSite method");
        RestResponse response = confCtrlService.renameSite(data,conferenceid,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 广播会场
    * @Param: [conferenceid, participantID, confAuth, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/participants/{participantID}/broadcast")
    public ResultInfo broadcast(@PathVariable(name = "conferenceid") String conferenceid,
                                @PathVariable(name = "participantID") String participantID,
                                @RequestHeader(name = "Conference-Authorization") String confAuth,
                                HttpServletResponse httpResponse){
        log.info("enter broadcast method");
        RestResponse response = confCtrlService.broadcast(conferenceid,participantID,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 启动停止录制
    * @Param: [data, conferenceid, confAuth, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/setRecord")
    public ResultInfo setRecord(@RequestBody String data,
                                @PathVariable(name = "conferenceid") String conferenceid,
                                @RequestHeader(name = "Conference-Authorization") String confAuth,
                                HttpServletResponse httpResponse){
        log.info("enter setRecord method");
        RestResponse response = confCtrlService.setRecord(data,conferenceid,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询录播文件列表
    * @Param: [params, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @GetMapping("/conferences/recordfile")
    public ResultInfo getRecordFiles(@RequestParam String params,
                                     @RequestHeader(name = "Authorization") String authorization,
                                     HttpServletResponse httpResponse){
        log.info("enter getRecordFiles method");
        RestResponse response = confCtrlService.getRecordFiles(params,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 获取录播文件
    * @Param: [confUUID, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
	@GetMapping("/conferences/{confUUID}/recordfile")
    public ResultInfo getRecordFile(@PathVariable(name = "confUUID")String confUUID,
                                    @RequestHeader(name = "Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter getRecordFile method");
        RestResponse response = confCtrlService.getRecordFile(confUUID,authorization);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 邀请与会者
    * @Param: [conferenceid, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PostMapping("/conferences/{conferenceid}/participants")
    public ResultInfo inviteParticipants(@PathVariable(name = "conferenceid") String conferenceid,
                                         @RequestBody String data,
                                         @RequestHeader(name = "Conference-Authorization") String authorization,
                                         HttpServletResponse httpResponse){
        log.info("enter inviteParticipants method");
        RestResponse inviteParticipants = confCtrlService.inviteParticipants(conferenceid, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(inviteParticipants,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 静音/取消静音
    * @Param: [conferenceid, participantID, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/participants/{participantID}/mute")
    public ResultInfo participantsMute(@PathVariable(name = "conferenceid") String conferenceid,
                                       @PathVariable(name = "participantID") String participantID,
                                       @RequestBody String data,
                                       @RequestHeader(name = "Conference-Authorization") String authorization,
                                       HttpServletResponse httpResponse){
        log.info("enter participantsMute method");
        RestResponse muteResponse = confCtrlService.participantsMute(conferenceid, participantID, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(muteResponse,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 结束会议
    * @Param: [conferenceid, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/state")
    public ResultInfo endConf(@PathVariable(name = "conferenceid") String conferenceid,
                              @RequestBody String data,
                              @RequestHeader(name = "Conference-Authorization") String authorization,
                              HttpServletResponse httpResponse){
        log.info("enter endConf method");
        RestResponse endConf = confCtrlService.endConf(conferenceid, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(endConf,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 设置多画面
    * @Param: [conferenceid, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/setMultiPicture")
    public ResultInfo setMultiPicture(@PathVariable(name = "conferenceid") String conferenceid,
                                      @RequestBody String data,
                                      @RequestHeader(name = "Conference-Authorization") String authorization,
                                      HttpServletResponse httpResponse){
        log.info("enter setMultiPicture method");
        RestResponse response = confCtrlService.setMultiPicture(conferenceid, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 切换会议显示策略
    * @Param: [conferenceid, data, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/switchMode")
    public ResultInfo switchMode (@PathVariable(name = "conferenceid") String conferenceid,
                                  @RequestBody String data,
                                  @RequestHeader(name = "Conference-Authorization") String authorization,
                                  HttpServletResponse httpResponse){
        log.info("enter switchMode method");
        RestResponse response = confCtrlService.switchMode(conferenceid, data, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 点名会场
    * @Param: [conferenceid, participantID, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @PutMapping("/conferences/{conferenceid}/participants/{participantID}/isRollcalled")
    public ResultInfo isRollcalled(@PathVariable(name = "conferenceid") String conferenceid,
                                   @PathVariable(name = "participantID") String participantID,
                                   @RequestHeader(name = "Conference-Authorization") String authorization,
                                   HttpServletResponse httpResponse){
        log.info("enter isRollcalled method");
        RestResponse response = confCtrlService.isRollcalled(conferenceid, participantID, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 根据会议UUID删除录制文件
    * @Param: [confUUID, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @DeleteMapping("/conferences/{confUUID}/recordfile")
    public ResultInfo delRecordFile(@PathVariable(name = "confUUID") String confUUID,
                                    @RequestHeader(name = "Authorization") String authorization,
                                    HttpServletResponse httpResponse){
        log.info("enter delRecordFile method");
        RestResponse response = confCtrlService.delRecordFile(confUUID, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 批量删除录制文件
    * @Param: [confUUIDs, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @DeleteMapping("/conferences/recordfile")
    public ResultInfo deleteRecordfiles(@RequestParam(name = "confUUIDs") String confUUIDs,
                                        @RequestHeader(name = "Authorization") String authorization,
                                        HttpServletResponse httpResponse){
        log.info("enter deleteRecordfiles method");
        RestResponse response = confCtrlService.deleteRecordfiles(confUUIDs, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);
        return resultInfo;
    }

    /**
    * @Description: 查询历史会议列表
    * @Param: [params, authorization, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @GetMapping("/historyConferences")
    public ResultInfo getHistoryConfList(@RequestParam String params, @RequestHeader(name = "Authorization") String authorization,
                                         HttpServletResponse httpResponse){
        log.info("enter getHistoryConfList method");
        RestResponse response = confCtrlService.getHistoryConfList(params, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询历史会议信息
    * @Param: [confuuid, params, authorization, type, queryType, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @GetMapping("/historyConferences/{confuuid}")
    public ResultInfo getHistoryConfInfo(@PathVariable(name = "confuuid") String confuuid,
                                         @RequestParam String params,
                                         @RequestHeader(name = "Authorization") String authorization,
                                         @RequestHeader(name = "type") String type,
                                         @RequestHeader(name = "queryType") String queryType,
                                         HttpServletResponse httpResponse){
        log.info("enter getHistoryConfInfo method");
        RestResponse response = confCtrlService.getHistoryConfInfo(confuuid, params,authorization,type,queryType);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询历史会议的会控记录信息
    * @Param: [confuuid, params, authorization, language, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @GetMapping("/historyConferences/{confuuid}/hisConfCtlRecord")
    public ResultInfo getHistoryConfCtlRecord(@PathVariable(name = "confuuid") String confuuid,
                                              @RequestParam String params,
                                              @RequestHeader(name = "Authorization") String authorization,
                                              @RequestHeader(name = "language") String language,
                                              HttpServletResponse httpResponse){
        log.info("enter getHistoryConfCtlRecord method");
        RestResponse response = confCtrlService.getHistoryConfCtlRecord(confuuid, params,authorization,language);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
    * @Description: 查询历史会议的与会者记录信息
    * @Param: [confuuid, params, authorization, language, httpResponse]
    * @return: com.huawei.esdk.common.ResultInfo
    * @Date: 2019/4/17
    */
    @GetMapping("/historyConferences/{confuuid}/hisConfAttendeeRecord")
    public ResultInfo getHistoryConfAttendeeRecord(@PathVariable(name = "confuuid") String confuuid,
                                                   @RequestParam String params,
                                                   @RequestHeader(name = "Authorization") String authorization,
                                                   @RequestHeader(name = "language") String language,
                                                   HttpServletResponse httpResponse){
        log.info("enter getHistoryConfAttendeeRecord method");
        RestResponse response = confCtrlService.getHistoryConfAttendeeRecord(confuuid, params,authorization,language);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 查询会议实时信息
     * @param conferenceid
     * @param confAuth
     * @param httpResponse
     * @return
     */
    @GetMapping("/cms/open/rest/confctl/{conferenceid}/realTimeInfo")
    public ResultInfo getRealTimeInfo(@PathVariable(name = "conferenceid") String conferenceid,
                                         @RequestHeader(name = "Conference-Authorization") String confAuth,
                                         HttpServletResponse httpResponse){
        log.info("enter getRealTimeInfo method");
        RestResponse response = confCtrlService.getRealTimeInfo(conferenceid, confAuth);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 延长会议
     * @param data
     * @param conferenceid
     * @param confAuth
     * @param httpResponse
     * @return
     */
    @PutMapping("/conferences/{conferenceid}/duration")
    public ResultInfo setDuration(@RequestBody String data,
                                 @PathVariable(name = "conferenceid") String conferenceid,
                                 @RequestHeader(name = "Conference-Authorization") String confAuth,
                                 HttpServletResponse httpResponse){
        log.info("enter setDuration method");
        RestResponse response = confCtrlService.setDuration(data,conferenceid,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 查询在线会议列表
     * @param params
     * @param authorization
     * @param httpResponse
     * @return
     */
    @GetMapping("/conferences/online")
    public ResultInfo getOnlineConfList(@RequestParam String params, @RequestHeader(name = "Authorization") String authorization,
                                         HttpServletResponse httpResponse){
        log.info("enter getOnlineConfList method");
        RestResponse response = confCtrlService.getOnlineConfList(params, authorization);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 查询在线会议信息
     * @param conferenceid
     * @param params
     * @param authorization
     * @param type
     * @param queryType
     * @param httpResponse
     * @return
     */
    @GetMapping("/conferences/{conferenceid}/online")
    public ResultInfo getOnlineConfInfo(@PathVariable(name = "conferenceid") String conferenceid,
                                         @RequestParam String params,
                                         @RequestHeader(name = "Authorization") String authorization,
                                         @RequestHeader(name = "type") String type,
                                         @RequestHeader(name = "queryType") String queryType,
                                         HttpServletResponse httpResponse){
        log.info("enter getOnlineConfInfo method");
        RestResponse response = confCtrlService.getOnlineConfInfo(conferenceid, params,authorization,type,queryType);
        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 主席选看视频画面
     * @param data
     * @param conferenceid
     * @param confAuth
     * @param httpResponse
     * @return
     */
    @PutMapping("/conferences/{conferenceid}/chairView")
    public ResultInfo setChairView(@RequestBody String data,
                                  @PathVariable(name = "conferenceid") String conferenceid,
                                  @RequestHeader(name = "Conference-Authorization") String confAuth,
                                  HttpServletResponse httpResponse){
        log.info("enter setChairView method");
        RestResponse response = confCtrlService.setChairView(data,conferenceid,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }

    /**
     * 启动/停止会议直播
     * @param data
     * @param conferenceid
     * @param confAuth
     * @param httpResponse
     * @return
     */
    @PutMapping("/conferences/{conferenceid}/setLive")
    public ResultInfo setLive(@RequestBody String data,
                                  @PathVariable(name = "conferenceid") String conferenceid,
                                  @RequestHeader(name = "Conference-Authorization") String confAuth,
                                  HttpServletResponse httpResponse){
        log.info("enter setLive method");
        RestResponse response = confCtrlService.setLive(data,conferenceid,confAuth);

        ResultInfo<Object> resultInfo = CommonController.handleResponse(response,httpResponse);

        return resultInfo;
    }
}

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
package com.huawei.esdk.service;

import com.huawei.esdk.common.RestResponse;

public interface ConfCtrlService {
    RestResponse forParticipant(String confId, String confAuth);

    RestResponse delParticipant(String confId, String participantId, String confAuth);

    RestResponse getConfToken(String confId,String Password,String loginType);

    RestResponse delParticipantByPhoneNum(String confId, String phoneNum, String confAuth);

    RestResponse applyChair(String confId, String participantId, String confAuth, String data);

    RestResponse muteConf(String confId, String confAuth, String data);

    RestResponse lockConf(String confId, String confAuth, String data);

	RestResponse renameSite(String data, String conferenceid, String confAuth);

    RestResponse broadcast(String conferenceid, String participantID, String confAuth);

    RestResponse setRecord(String data, String conferenceid, String confAuth);

    RestResponse getRecordFiles(String params, String authorization);

    RestResponse getRecordFile(String confUUID, String authorization);

    RestResponse inviteParticipants(String conferenceid, String confInfo, String authorization);

    RestResponse participantsMute(String conferenceid, String participantID, String confInfo, String authorization);

    RestResponse endConf(String conferenceid, String confInfo, String authorization);

    RestResponse setMultiPicture(String conferenceid, String confInfo, String authorization);

    RestResponse switchMode(String conferenceid, String confInfo, String authorization);

    RestResponse isRollcalled(String conferenceid, String participantID, String authorization);

    RestResponse delRecordFile(String confUUID, String authorization);

    RestResponse deleteRecordfiles(String confUUIDs, String authorization);

    RestResponse getHistoryConfList(String params, String authorization);

    RestResponse getHistoryConfInfo(String confuuid, String params,String authorization,String type,String queryType);

    RestResponse getHistoryConfCtlRecord(String confuuid, String params,String authorization,String language);

    RestResponse getHistoryConfAttendeeRecord(String confuuid, String params,String authorization,String language);
}

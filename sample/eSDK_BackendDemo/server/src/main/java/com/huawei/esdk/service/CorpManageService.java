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

public interface CorpManageService {
    RestResponse pageQueryCorpUser(String data, String authorization);
    RestResponse addCorpUser(String data, String authorization);
    RestResponse modCorpUser(String account, String data, String authorization);
    RestResponse queryCorpUser(String account, String authorization);
    RestResponse modCorpUserStatus(String value, String data, String authorization);
    RestResponse delCorpUsers(String data, String authorization);
    RestResponse getMemberInfo(String authorization);
    RestResponse modUserMessage(String data, String authorization);
    RestResponse getVerifycode(String data, String authorization);
    RestResponse checkVerifycode(String data, String authorization);
    RestResponse modCommunication(String data, String authorization);
    RestResponse modUserPassword(String data, String authorization);
    RestResponse resetUserPassword(String data, String authorization);

    RestResponse addCorp(String data, String authorization);
    RestResponse modifyCorp(String data, String id, String authorization);
    RestResponse queryCorpDetail(String id, String authorization);
    RestResponse delCorp(String id, String authorization);
	
	RestResponse searchSpCorp(String data, String authorization);

    RestResponse querySpCorpInfo(String authorization);

    RestResponse modifySpCorp(String data, String authorization);

    RestResponse searchCorpResource(String authorization);
}

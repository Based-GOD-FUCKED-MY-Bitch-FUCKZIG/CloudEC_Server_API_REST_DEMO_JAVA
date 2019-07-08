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

import java.util.List;

public interface DeviceManagerService {
    RestResponse addDevice(String deviceInfo, String authorization);

    RestResponse modifyDevice(String sn, String deviceInfo, String authorization);

    RestResponse getDeviceInfo(String sn,String authorization);

    RestResponse delDevice(String snList, String authorization);

    RestResponse searchDevice(String searchInfo, String authorization);

    RestResponse modDeviceStatus(int value, String snList, String authorization);

    RestResponse getDeviceType(String authorization);

    RestResponse resetDeviceCode(String sn, String contactInfo, String authorization);

}
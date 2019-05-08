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
package com.huawei.esdk.utils;

import java.net.MalformedURLException;
import java.net.URL;

public abstract class StringUtil
{
    public static boolean isEmpty(String str)
    {
        if ((str == null) || (str.trim().length() == 0)) {
            return true;
        }
        return false;
    }

    public static boolean isNotEmpty(String str)
    {
        return !isEmpty(str);
    }

    public static String getIpFromHttpAddress(String httpAddress)
    {
        if (isEmpty(httpAddress)) {
            return null;
        }
        try
        {
            URL url = new URL(CheckPathUtil.urlPathFormatWithEncode(httpAddress, "UTF-8"));
            return url.getHost();
        }
        catch (MalformedURLException e) {}
        return null;
    }

    public static int getPortFromHttpAddress(String httpAddress)
    {
        if (isEmpty(httpAddress)) {
            return -1;
        }
        try
        {
            URL url = new URL(CheckPathUtil.urlPathFormatWithEncode(httpAddress, "UTF-8"));
            return url.getPort();
        }
        catch (MalformedURLException e) {}
        return -1;
    }

    public static String getSchemeFromHttpAddress(String httpAddress)
    {
        if (isEmpty(httpAddress)) {
            return null;
        }
        try
        {
            URL url = new URL(CheckPathUtil.urlPathFormatWithEncode(httpAddress, "UTF-8"));
            return url.getProtocol();
        }
        catch (MalformedURLException e) {}
        return null;
    }
}

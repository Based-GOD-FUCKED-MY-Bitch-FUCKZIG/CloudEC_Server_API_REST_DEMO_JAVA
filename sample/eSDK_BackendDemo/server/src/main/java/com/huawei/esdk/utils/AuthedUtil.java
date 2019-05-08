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

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class AuthedUtil {
    private static Map<String,String> AUTH = new ConcurrentHashMap<>();

    public static void addAuth(String key,String auth){
        updateAuth(key,auth);
    }

    public static void updateAuth(String key,String auth){
        if (AUTH.containsKey(key)){
            AUTH.replace(key,auth);
        }else{
            AUTH.put(key,auth);
        }
    }

    public static String getAuth(String key){
        if(AUTH.containsKey(key)){
            return (String)AUTH.get(key);
        }
        return null;
    }

    public static boolean containsUser(String key){
        return AUTH.containsKey(key);
    }

    public static void removeAuth(String key){
        if(AUTH.containsKey(key)){
            AUTH.remove(key);
        }
    }

    public static String getAuthorization(String authorization){
        if(StringUtil.isEmpty(authorization)){
            return "";
        }
        return authorization.split("\\|")[0];
    }
}

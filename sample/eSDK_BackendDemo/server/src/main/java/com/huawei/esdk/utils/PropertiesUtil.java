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

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Slf4j
public class PropertiesUtil {
    private static Properties properties;

    static {
        properties = loadProperty();
    }

    private static Properties loadProperty(){
        Properties p = new Properties();
        loadPro("config.properties",p);
        return p;
    }

    private static void loadPro(String path,Properties p){
        InputStream in = null;
        try {
            in = getInputStream(path);
            if (in != null){
                p.load(in);
            }
        } catch (FileNotFoundException e) {
            log.error(path + "cannot be opened because it does not exist");
        } catch (IOException e){
            log.error("load file exception: " + e.getMessage());
        }finally {
            if (in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    log.error("load file exception");
                }
            }
        }
    }

    private static InputStream getInputStream(String path) throws IOException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        if (classLoader == null){
            return null;
        }

        InputStream in = classLoader.getResourceAsStream(path);
        if (in == null){
            throw new FileNotFoundException(path + "cannot be opened because it does not exist");
        }
        return in;
    }

    public static String getValue(String key){
        String value = properties.getProperty(key);
        return value == null ? "":value;
    }

    public static String getValue(String key,String defaultValue){
        String value = properties.getProperty(key);
        return value == null ? defaultValue:value;
    }
}

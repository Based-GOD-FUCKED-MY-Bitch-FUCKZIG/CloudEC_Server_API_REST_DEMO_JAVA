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

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;

@Slf4j
public abstract class CheckPathUtil
{
    private static HashMap<String, String> filePathMap = new HashMap<String, String>();
    private static HashMap<String, String> urlPathMap = new HashMap<String, String>();
    private static HashMap<String, String> jsonPathMap = new HashMap<String, String>();

    static
    {
        filePathMap.put("a", "a");
        filePathMap.put("b", "b");
        filePathMap.put("c", "c");
        filePathMap.put("d", "d");
        filePathMap.put("e", "e");
        filePathMap.put("f", "f");
        filePathMap.put("g", "g");
        filePathMap.put("h", "h");
        filePathMap.put("i", "i");
        filePathMap.put("j", "j");
        filePathMap.put("k", "k");
        filePathMap.put("l", "l");
        filePathMap.put("m", "m");
        filePathMap.put("n", "n");
        filePathMap.put("o", "o");
        filePathMap.put("p", "p");
        filePathMap.put("q", "q");
        filePathMap.put("r", "r");
        filePathMap.put("s", "s");
        filePathMap.put("t", "t");
        filePathMap.put("u", "u");
        filePathMap.put("v", "v");
        filePathMap.put("w", "w");
        filePathMap.put("x", "x");
        filePathMap.put("y", "y");
        filePathMap.put("z", "z");

        filePathMap.put("A", "A");
        filePathMap.put("B", "B");
        filePathMap.put("C", "C");
        filePathMap.put("D", "D");
        filePathMap.put("E", "E");
        filePathMap.put("F", "F");
        filePathMap.put("G", "G");
        filePathMap.put("H", "H");
        filePathMap.put("I", "I");
        filePathMap.put("J", "J");
        filePathMap.put("K", "K");
        filePathMap.put("L", "L");
        filePathMap.put("M", "M");
        filePathMap.put("N", "N");
        filePathMap.put("O", "O");
        filePathMap.put("P", "P");
        filePathMap.put("Q", "Q");
        filePathMap.put("R", "R");
        filePathMap.put("S", "S");
        filePathMap.put("T", "T");
        filePathMap.put("U", "U");
        filePathMap.put("V", "V");
        filePathMap.put("W", "W");
        filePathMap.put("X", "X");
        filePathMap.put("Y", "Y");
        filePathMap.put("Z", "Z");

        filePathMap.put("0", "0");
        filePathMap.put("1", "1");
        filePathMap.put("2", "2");
        filePathMap.put("3", "3");
        filePathMap.put("4", "4");
        filePathMap.put("5", "5");
        filePathMap.put("6", "6");
        filePathMap.put("7", "7");
        filePathMap.put("8", "8");
        filePathMap.put("9", "9");

        filePathMap.put(".", ".");
        filePathMap.put(":", ":");
        filePathMap.put("/", "/");
        filePathMap.put("\\", "\\");
        filePathMap.put("-", "-");
        filePathMap.put("_", "_");
        filePathMap.put("%", "%");

        urlPathMap.putAll(filePathMap);
        urlPathMap.put("`", "`");
        urlPathMap.put("~", "~");
        urlPathMap.put("!", "!");
        urlPathMap.put("@", "@");
        urlPathMap.put("#", "#");
        urlPathMap.put("$", "$");
        urlPathMap.put("^", "^");
        urlPathMap.put("&", "&");
        urlPathMap.put("*", "*");
        urlPathMap.put("(", "(");
        urlPathMap.put(")", ")");
        urlPathMap.put("=", "=");
        urlPathMap.put("+", "+");
        urlPathMap.put("[", "[");
        urlPathMap.put("{", "{");
        urlPathMap.put("]", "]");
        urlPathMap.put("}", "}");
        urlPathMap.put(";", ";");
        urlPathMap.put(":", ":");
        urlPathMap.put("'", "'");
        urlPathMap.put("\"", "\"");
        urlPathMap.put("|", "|");
        urlPathMap.put(",", ",");
        urlPathMap.put("<", "<");
        urlPathMap.put(".", ".");
        urlPathMap.put(">", ">");
        urlPathMap.put("/", "/");
        urlPathMap.put("?", "?");

        jsonPathMap.putAll(urlPathMap);
        jsonPathMap.put(" ", " ");
    }

    private static String checkPath(String path, HashMap<String, String> map)
    {
        String temp = "";
        for (int i = 0; i < path.length(); i++)
        {
            if (map.get(path.charAt(i) + "") != null)
            {
                temp = temp + (String)map.get(new StringBuilder().append(path.charAt(i)).append("").toString());
            }else{
                if(isChinese(path.charAt(i))){
                    temp = temp + path.charAt(i);
                }
            }
        }
        return temp;
    }

    public static String filePathFormat(String path)
    {
        path = checkPath(path, filePathMap);
        return path;
    }

    public static String urlPathFormat(String path)
    {
        path = checkPath(path, urlPathMap);
        return path;
    }

    public static String jsonPathFormat(String path)
    {
        path = checkPath(path, jsonPathMap);
        return path;
    }

    public static String filePathFormatWithEncode(String path, String charset)
    {
        try
        {
            path = checkPath(URLEncoder.encode(path, charset), filePathMap);
            return URLDecoder.decode(path, charset);
        }
        catch (UnsupportedEncodingException e)
        {
            log.error("unsupportedEncoding exception in filepathformat");
            return "";
        }
    }

    public static String urlPathFormatWithEncode(String path, String charset)
    {
        try
        {
            path = checkPath(URLEncoder.encode(path, charset), urlPathMap);
            return URLDecoder.decode(path, charset);
        }
        catch (UnsupportedEncodingException e)
        {
            log.error("unsupportedEncoding exception in urlpathformat");
            return "";
        }
    }

    public static String jsonPathFormatWithEncode(String path, String charset)
    {
        try
        {
            path = checkPath(URLEncoder.encode(path, charset), jsonPathMap);
            return URLDecoder.decode(path, charset);
        }
        catch (UnsupportedEncodingException e)
        {
            log.error("Json path format with encode failed");
            return "";
        }
    }

    /**
     * 排除中文字符
     * @param c
     * @return
     */
    private static boolean isChinese(char c) {
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION
                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {
            return true;
        }
        return false;
    }
}
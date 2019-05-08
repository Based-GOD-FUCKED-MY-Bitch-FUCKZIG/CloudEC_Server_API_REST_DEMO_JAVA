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

import com.huawei.esdk.common.RestRequest;
import com.huawei.esdk.common.RestResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.*;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.LayeredConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.DigestScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
public class HttpUtil {
    private static final HttpUtil httpUtil = new HttpUtil();

    private static CloseableHttpClient httpClient;

    private static PoolingHttpClientConnectionManager connectionManager;

    private static HttpParams params = new BasicHttpParams();

    //连接超时时间
    private static final int MAX_CONNECTION = 15000;

    private static final int MAX_SOCKET_CONNECTION = 15000;

    //manager连接超时时间
    private static final long MAX_MANAGER_CONNECTION = 15000L;

    static {
        LayeredConnectionSocketFactory sslsf = null;
        try
        {
            SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
            X509TrustManager tm = new X509TrustManager()
            {
                public java.security.cert.X509Certificate[] getAcceptedIssuers()
                {
                    return new java.security.cert.X509Certificate[] {};
                }

                public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
                        throws java.security.cert.CertificateException
                {
                }

                public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
                        throws java.security.cert.CertificateException
                {
                }
            };
            sslContext.init(null, new TrustManager[] { tm }, null);
            sslsf = new SSLConnectionSocketFactory(sslContext, new String[] { "TLSv1.2" }, null, SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
        }
        catch (NoSuchAlgorithmException | KeyManagementException e)
        {
            log.error("SSL connect error");
        }
        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                .register("https", sslsf).register("http", new PlainConnectionSocketFactory()).build();
        connectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        connectionManager.setMaxTotal(2000);
        connectionManager.setDefaultMaxPerRoute(connectionManager.getMaxTotal());

        httpClient = HttpClients.custom().setConnectionManager(connectionManager).build();

        params.setIntParameter("http.connection.timeout", MAX_CONNECTION);
        params.setIntParameter("http.socket.timeout", MAX_SOCKET_CONNECTION);
        params.setLongParameter("http.conn-manager.timeout", MAX_MANAGER_CONNECTION);
    }

    private HttpUtil() {
    }

    public static HttpUtil getInstance(){
        return httpUtil;
    }

    public RestResponse sendMessage(HttpHost target, String resourceUri, RestRequest message)
            throws ClientProtocolException, URISyntaxException, IOException
    {
        if (null == target)
        {
            throw new NullPointerException("HttpHost target can not be null.");
        }
        RestResponse restResponse = new RestResponse();
        HttpRequestBase request = buildRequestMessage(message, resourceUri);
        request.setParams(params);
        BasicHttpContext basicHttpContext = null;
        HttpResponse response = null;
        try
        {
            log.debug(Thread.currentThread().getName() + " before execute " + System.currentTimeMillis());
            response = httpClient.execute(target, request, basicHttpContext);
            log.debug(Thread.currentThread().getName() + " after execute " + System.currentTimeMillis());
            if (response != null)
            {
                restResponse.setHttpCode(response.getStatusLine().getStatusCode());
                HttpEntity entity = response.getEntity();
                if (null != entity) {
                    restResponse.setEntity(EntityUtils.toString(entity));
                }
                Header[] headers = response.getAllHeaders();
                if (null != headers)
                {
                    Map<String, List<String>> headerMap = restResponse.getHeaders();
                    for (Header header : headers) {
                        if (headerMap.containsKey(header.getName()))
                        {
                            headerMap.get(header.getName()).add(header.getValue());
                        }
                        else
                        {
                            List<String> headerVals = new ArrayList<String>();
                            headerVals.add(header.getValue());
                            headerMap.put(header.getName(), headerVals);
                        }
                    }
                }
                log.debug(Thread.currentThread().getName() + " out execute " + System.currentTimeMillis());
                return restResponse;
            }
            return null;
        }
        catch (RuntimeException e) {
            log.error("httpclient error:" + e.getMessage());
        }
        catch (Exception e)
        {
            log.error("httpclient error:" + e.getMessage());
        }

        return null;
    }

    //创建http消息
    private HttpRequestBase buildRequestMessage(RestRequest message, String resourceUri)
            throws URISyntaxException, UnsupportedEncodingException
    {
        HttpRequestBase request;
        if ("GET".equalsIgnoreCase(message.getHttpMethod()))
        {
            HttpGet httpGet = new HttpGet(resourceUri);
            setParameters(httpGet, message.getParameters());
            request = httpGet;
        }
        else if ("POST".equalsIgnoreCase(message.getHttpMethod()))
        {
            HttpPost httpPost = new HttpPost(resourceUri);
            setParameters(httpPost, message.getParameters());
            if (null == message.getEntity()) {
                message.setEntity("");
            }
            httpPost.setEntity(new StringEntity(CheckPathUtil.jsonPathFormat(message.getEntity()), "UTF-8"));
            request = httpPost;
        }
        else if ("PUT".equalsIgnoreCase(message.getHttpMethod()))
        {
            HttpPut httpPut = new HttpPut(resourceUri);
            if (null == message.getEntity()) {
                message.setEntity("");
            }
            httpPut.setEntity(new StringEntity(CheckPathUtil.jsonPathFormat(message.getEntity()), "UTF-8"));
            request = httpPut;
        }
        else if ("DELETE".equalsIgnoreCase(message.getHttpMethod()))
        {
            HttpDelete httpDelete = new HttpDelete(resourceUri);
            setParameters(httpDelete, message.getParameters());
            request = httpDelete;
        }
        else
        {
            String msg = message.getHttpMethod() + " is not a valid HTTP method";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }

        setHttpHeaders(request, message.getHttpHeaders());

        return request;
    }

    private void setParameters(HttpRequestBase httpRequest, Map<String, String> parameters)
            throws URISyntaxException
    {
        if ((null != parameters) && (!parameters.isEmpty()))
        {
            URIBuilder uriBuilder = new URIBuilder(httpRequest.getURI());
            for (Map.Entry<String, String> entry : parameters.entrySet()) {
                uriBuilder.addParameter((String)entry.getKey(), (String)entry.getValue());
            }
            httpRequest.setURI(uriBuilder.build());
        }
    }

    private void setHttpHeaders(HttpRequestBase request, Map<String, String> httpHeaders)
    {
        if (null != httpHeaders) {
            for (Map.Entry<String, String> entry : httpHeaders.entrySet()) {
                request.addHeader((String)entry.getKey(), (String)entry.getValue());
            }
        }
    }
}

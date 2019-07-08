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
export const  createConfBody= {
	"subject":"String",
	"mediaTypes":"Video"
};

export const modifyConfBody = {
	"subject":"String",
	"mediaTypes":"Video"
};

export const endConfBody = {
	"operation":0
};

export const muteBody = {
	"isMute":1
};

export const inviteParticipantsBody = {
	"attendees":[
		{"accountId":"String","name":"String", "role":0, "phone":"string"}
		]
};

export const setMultiPictureBody = {
	"manualSet": 0
};

export const switchModeBody = {
	"switchMode":"Fixed",
    "imageType": 1

}

export const participantsRoleBody = {
	"applyChair":"1"
}

export const isLockBody = {
	"isLock":"1"
}

export const renameSiteBody = {
	"participantID":"String",
	"number":"String",
	"newName":"String"
}

export const setRecordBody = {
	"isRecord":0
}
	
export const AddDeviceBody = {	
	"model": "String",
	"name": "String",
	"deptCode": "1",
	"phone": "+86*********",
	"email": "String@huawei.com",
	"sn": "String",
	"country": "chinaPR"	
};

export const ModifyDeviceBody = {	
	"name": "String",
	"deptCode": "1",
	"phone": "+86*********",
	"email": "String@huawei.com",
	"country": "chinaPR",
	"description": "String",
	"status": 0	
};

export const DelDeviceBody = [
	"String","String"
] ;

export const SearchDeviceBody = {	
    "pageIndex": 1,
    "pageSize": 5,
};

export const ModDeviceStatusBody = [
	"String","String"
] ;

export const ResetDeviceCodeBody = {	
	"smsNumber": "",
	"country": "",    
	"emailAddr": "string@huawei.com"
};

export const AddCorpDeptBody = {
	"deptName": "string"
}

export const ModifyCorpDeptBody = {
	"deptName": "string"
}

//添加用户初始化请求Body体
export const addCorpUserBody = {	
	"account": "string",
	"name":"string",
	"phone":"+86***********",
	"country": "chinaPR",    
	"pwd": "********"
};

//修改用户初始化请求Body体
export const modCorpUserBody = {	
	"name":"string",
	"phone":"+86***********",
	"country": "chinaPR"
};

//分页查询用户初始化请求Body体
export const pageQueryCorpUserBody = {	
	"deptCode":"string",
	"pageIndex":1,
	"pageSize": 10
};

//批量删除用户初始化请求Body体
export const delCorpUsersBody = ["String"] ;

//批量修改用户状态初始化请求Body体
export const modCorpUserStatusBody = ["String"] ;

//获取验证码初始化请求Body体
export const getVerifycodeBody = {	
	"contact":"+86xxxxxxxxxxx",
	"country":"chinaPR"
};

//校验验证码初始化请求Body体
export const checkVerifycodeBody = {	
	"contact":"+86xxxxxxxxxxx",
	"country":"chinaPR",
	"verificationCode": "string"
};

//修改手机或邮箱初始化请求Body体
export const modCommunicationBody = {	
	"contact":"+86xxxxxxxxxxx",
	"country":"chinaPR",
	"verificationCode": "string"
};

export const AddCorpManagerBody = {	
	"menuTemplateId":""
};

export const DelCorpManagerBody = ["String"]	
;

export const PageQueryCorpManagerBody = {	
	"pageIndex":1,
	"pageSize": 10
};

export const SpCorpSearchBody ={
	"pageIndex":1,
	"pageSize": 10
}

export const ModifySpCorpBody = { 
    "address": "string" 
}

export const AddCorpBody = {		
	"basicInfo":{
		"name":"String"
	},
	"adminInfo":{
		"account":"String",
		"name":"String",
		"pwd":"**********",
		"email":"String",
		"phone":"+86133********"
	}	
};

export const ModifyCorpBody = {		
	"basicInfo":{
        "name":"String"
    },
    "adminInfo":{
        "name":"String",
        "pwd":"*********",
        "email":"String",
        "phone":"+86133********"
    }	
};
//SP根据条件查询企业的资源项初始化请求Body体
export const spCorpResourceSearchBody = {		
    "pageIndex": 1,
	"pageSize": 10
	
};
//SP根据条件查询企业的资源操作记录初始化请求Body体
export const spCorpResourceRecordSearchBody = {		
	"pageIndex":1,
	"pageSize": 5,
	"startExpireDate": 1545753600000,
	"endExpireDate": 1593187199999,
	"startOperateDate":1545753600000,
	"endOperateDate":1561564799999
};
export const DelCorpResourceBody = ["String"];

export const addCorpResourceBody = [{ 
	"type": "HARD_720P", 
	"count": 10, 
	"expireDate": 0 
}]

export const modifyResourceExpireTimeBody = [{ 
	"id": "9ecb72fa921d42b4bd96b50696b1f871", 
	"expireDate": 1556612798 
}]


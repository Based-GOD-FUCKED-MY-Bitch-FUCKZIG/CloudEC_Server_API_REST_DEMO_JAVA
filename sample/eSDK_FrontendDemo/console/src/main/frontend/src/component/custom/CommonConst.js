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
	
import {MUserInfo} from "@/ManagerBis/MUserInfo/Domain/Entity/MUserInfo";

export class MUserInfoResDto {
    uid!: string;
    userId!: string;
    userName!: string;
    groupName!: string;
    hasRole!: string;

    static fromMUserInfo(mUserInfo: MUserInfo) {
        const mUserInfoResDto = new MUserInfoResDto()
        mUserInfoResDto.uid = mUserInfo.uid;
        mUserInfoResDto.userId = mUserInfo.userId;
        mUserInfoResDto.userName = mUserInfo.userName;
        mUserInfoResDto.groupName = mUserInfo.groupName;
        mUserInfoResDto.hasRole = mUserInfo.hasRole;
        return mUserInfoResDto;
    }
}
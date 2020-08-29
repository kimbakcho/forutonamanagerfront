import {MUserInfo} from "@/ManagerBis/MUserInfo/Domain/Entity/MUserInfo";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";
import {LoginUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/LoginUseCaseInputPort";
import {DateTime} from "luxon";

export interface SignInUseUseInputPort {
    getMe(): Promise<MUserInfo>;
    isSignIn(): boolean;
}

@injectable()
export class SignInUseUse implements SignInUseUseInputPort {
    private _mUserInfoRepository: MUserInfoRepository;

    constructor(@inject(TYPES.MUserInfoRepository) mUserInfoRepository: MUserInfoRepository) {
        this._mUserInfoRepository = mUserInfoRepository;
    }

    async getMe(): Promise<MUserInfo> {
        return await this._mUserInfoRepository.getMe();
    }

    isSignIn(): boolean {
        const accesskey = localStorage.getItem(LoginUseCaseInputPort.localStoreAccessTokenKey);

        if (accesskey != null) {
            const jwtSplit = accesskey.split(".");
            const jwtSec = atob(jwtSplit[1]);
            const tokenInfo = JSON.parse(jwtSec);
            const expTime = DateTime.fromMillis(tokenInfo.exp);
            if (expTime.diffNow("milliseconds").milliseconds < 0) {
                return true;
            }
        }
        return false;
    }
}

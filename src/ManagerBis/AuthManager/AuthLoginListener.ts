import LoginManagerListener from "vueoauth2login/src/components/LoginManagerListener";
import UserInfoVuex from "@/store/UserInfoVuex";
import axios from "axios"
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import {MUserInfoUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/MUserInfoUseCaseInputPort";
import GlobalUiKeyVuex from "@/store/GlobalUiKeyVuex";
export default class AuthLoginListener implements  LoginManagerListener{

    async onLogin(accessToken: string): Promise<void> {
        const mUserInfoUseCaseInputPort = myContainer.get<MUserInfoUseCaseInputPort>(TYPES.MUserInfoUseCaseInputPort);
        UserInfoVuex.updateUserInfo(await mUserInfoUseCaseInputPort.getMe())
        GlobalUiKeyVuex.updateBtnKey();
    }

}
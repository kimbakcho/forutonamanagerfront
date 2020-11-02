import {inject, injectable} from "inversify";
import Preference from "@/Preference";
import axios from "axios";
export default interface LoginUseCaseInputPort {
    login(): void;
    logout(): void;
    isLogin(): Promise<boolean>;
}

@injectable()
export class LoginUseCase implements LoginUseCaseInputPort{


    login(): void {
        location.href = Preference.loginPageUrl;
    }

    logout(): void {
        location.href = Preference.logoutPageUrl;
    }

    async isLogin(): Promise<boolean> {
        const response = await axios.get<boolean>(`${Preference.backEndUrl}/isLogin`);
        return response.data
    }
}


import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export interface LoginManagerComponent {
    onLogin(): void;
    onUser(): void;
}

export default interface LoginManager {
    login(): void;
    logout(): void;
    addListener(loginManagerComponent: LoginManagerComponent ): void;
    removeListener(loginManagerComponent: LoginManagerComponent): void;
    init(): Promise<void>;
    isLogin: boolean;
    user: MUserInfoResDto;
}


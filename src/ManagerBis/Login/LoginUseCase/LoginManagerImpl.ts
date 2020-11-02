import {inject, injectable} from "inversify";
import LoginUseCaseInputPort from "@/ManagerBis/Login/LoginUseCase/LoginUseCaseInputPort";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import LoginManager, {LoginManagerComponent} from "@/ManagerBis/Login/LoginUseCase/LoginManager";

@injectable()
export class LoginManagerImpl implements LoginManager {

    _loginUseCaseInputPort: LoginUseCaseInputPort;
    _loginManagerComponents: LoginManagerComponent[] = [];


    constructor(@inject(TYPES.LoginUseCaseInputPort) loginUseCaseInputPort: LoginUseCaseInputPort) {
        this._loginUseCaseInputPort = loginUseCaseInputPort
    }

    addListener(loginManagerComponent: LoginManagerComponent) {
        this._loginManagerComponents.push(loginManagerComponent);
    }


    login(): void {
        this._loginUseCaseInputPort.login();
    }


    logout(): void {
        this._loginUseCaseInputPort.logout();
    }

    async init(): Promise<void>{
        this.isLogin = await this._loginUseCaseInputPort.isLogin();
        if(this.isLogin){
            this._loginManagerComponents.forEach(x=>{
                x.onLogin();
            })
        }
    }

    removeListener(loginManagerComponent: LoginManagerComponent): void {
        const indexOf = this._loginManagerComponents.indexOf(loginManagerComponent);
        if(indexOf >=0 ){
            this._loginManagerComponents.splice(indexOf,1);
        }
    }

    isLogin: boolean = false;

}
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import LoginUseCaseInputPort from "@/ManagerBis/Login/LoginUseCase/LoginUseCaseInputPort";

@injectable()
export default class AxiosInitSetting {

    loginUseCaseInputPort: LoginUseCaseInputPort;

    constructor(@inject(TYPES.LoginUseCaseInputPort) loginUseCaseInputPort: LoginUseCaseInputPort) {
        this.loginUseCaseInputPort = loginUseCaseInputPort;
    }

    init() {
        axios.interceptors.request.use((x: AxiosRequestConfig) => {
            x.withCredentials = true;
            return x;
        });
        axios.interceptors.response.use((x: AxiosResponse) => {
            return x;
        }, (error => {
            if (error.response.state === 401) {
                this.loginUseCaseInputPort.login();
            }
        }));

    }
}
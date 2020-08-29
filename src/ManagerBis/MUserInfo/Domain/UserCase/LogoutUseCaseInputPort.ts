import { LoginUseCaseInputPort } from './LoginUseCaseInputPort';
import Axios from 'axios';
import "reflect-metadata"
import { injectable, inject } from 'inversify';
import { ReFreshTokenTimer } from './ReFreshTokenTimer';
import TYPES from "@/ManagerBis/ManagerBisTypes";


export interface LogoutUseCaseInputPort {
    logout(): void;
}

@injectable()
export class LogoutUseCase implements LogoutUseCaseInputPort {
    private _refreshTokenTimer: ReFreshTokenTimer

    constructor(@inject(TYPES.ReFreshTokenTimer) refreshTokenTimer: ReFreshTokenTimer) {
        this._refreshTokenTimer = refreshTokenTimer;
    }

    logout(): void {
        localStorage.removeItem(LoginUseCaseInputPort.localStoreAccessTokenKey);
        localStorage.removeItem(LoginUseCaseInputPort.localStoreRefreshTokenKey);
        Axios.defaults.headers["Authorization"] = null;
        this._refreshTokenTimer.stopTimer();
    }
}
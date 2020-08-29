import { OAuth2Repository } from '../Repository/OAuth2Repository';
import { Oauth2Token } from '../Value/Oauth2Token';
import Axios from 'axios';
import { DateTime } from "luxon"
import { SignInUseUseInputPort } from './SignInUseUseInputPort';
import UserInfoVuex from '@/store/UserInfoVuex';

import { ReFreshTokenTimer } from './ReFreshTokenTImer';
import { LogoutUseCaseInputPort } from './LogoutUseCaseInputPort';
import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export abstract class LoginUseCaseInputPort {

    protected abstract getToken(): Promise<Oauth2Token>;

    static localStoreAccessTokenKey = "forutonaManageAccessToken";
    static localStoreRefreshTokenKey = "forutonaManageRefreshToken";

    private _signInUseUseInputPort: SignInUseUseInputPort;
    private _logoutUseCaseInputPort: LogoutUseCaseInputPort;
    private _reFreshTokenTimer: ReFreshTokenTimer;

    protected constructor(signInUseUseInputPort: SignInUseUseInputPort, reFreshTokenTimer: ReFreshTokenTimer, logoutUseCaseInputPort: LogoutUseCaseInputPort) {
        this._signInUseUseInputPort = signInUseUseInputPort;
        this._reFreshTokenTimer = reFreshTokenTimer;
        this._logoutUseCaseInputPort = logoutUseCaseInputPort;
    }

    async login() {
        try {
            const oauth2Token: Oauth2Token = await this.getToken();
            localStorage.setItem(LoginUseCaseInputPort.localStoreAccessTokenKey, oauth2Token.access_token);
            localStorage.setItem(LoginUseCaseInputPort.localStoreRefreshTokenKey, oauth2Token.refresh_token);
            Axios.defaults.headers["Authorization"] = "Bearer " + oauth2Token.access_token;
            UserInfoVuex.updateUserInfo(MUserInfoResDto.fromMUserInfo(await this._signInUseUseInputPort.getMe()))
            this._reFreshTokenTimer.startTimer()
        } catch (ex) {
            this._logoutUseCaseInputPort.logout();
            console.log("login Token don'y have");
        }

    }
}

export class LogInIdPwUseCase extends LoginUseCaseInputPort {

    private readonly _Id!: string;
    private readonly _Pw!: string;
    private _oAuth2Repository!: OAuth2Repository

    constructor(Id: string, Pw: string, oAuth2Repository: OAuth2Repository, signInUseUseInputPort: SignInUseUseInputPort, reFreshTokenTimer: ReFreshTokenTimer, logoutUseCaseInputPort: LogoutUseCaseInputPort) {
        super(signInUseUseInputPort, reFreshTokenTimer, logoutUseCaseInputPort);
        this._Id = Id;
        this._Pw = Pw;
        this._oAuth2Repository = oAuth2Repository;
    }

    async getToken(): Promise<Oauth2Token> {
        const oauth2Token = await this._oAuth2Repository.getAccessTokenFromIdPw(this._Id, this._Pw);
        return oauth2Token;
    }
}

export class LogInRefreshTokenUseCase extends LoginUseCaseInputPort {

    private _oAuth2Repository!: OAuth2Repository

    constructor(oAuth2Repository: OAuth2Repository, signInUseUseInputPort: SignInUseUseInputPort, reFreshTokenTimer: ReFreshTokenTimer, logoutUseCaseInputPort: LogoutUseCaseInputPort) {
        super(signInUseUseInputPort, reFreshTokenTimer, logoutUseCaseInputPort);
        this._oAuth2Repository = oAuth2Repository;
    }

    async getToken(): Promise<Oauth2Token> {

        const refreshToken = localStorage.getItem(LoginUseCaseInputPort.localStoreRefreshTokenKey);
        if (refreshToken == null) {
            throw Error("don't have access token");
        }
        const jwtSplit = refreshToken.split(".");
        const jwtSec = atob(jwtSplit[1]);
        const tokenInfo = JSON.parse(jwtSec);
        const expTime = DateTime.fromMillis(tokenInfo.exp);
        if (expTime.diffNow("milliseconds").milliseconds > 0) {
            throw Error("reFreshToekn expire");
        }

        const oauth2Token = await this._oAuth2Repository.getAccessTokenFromRefreshToken(refreshToken);
        console.log(oauth2Token);
        return oauth2Token;
    }
}

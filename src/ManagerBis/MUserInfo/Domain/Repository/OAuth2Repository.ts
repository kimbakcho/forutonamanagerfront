import {Oauth2Token} from "@/ManagerBis/MUserInfo/Domain/Value/Oauth2Token";

export interface OAuth2Repository {
    getAccessTokenFromRefreshToken(refreshToken: string): Promise<Oauth2Token>;
    getAccessTokenFromIdPw(id: string, pw: string): Promise<Oauth2Token>;
}

import {OAuth2Repository} from "@/ManagerBis/MUserInfo/Domain/Repository/OAuth2Repository";
import {Oauth2Token} from "@/ManagerBis/MUserInfo/Domain/Value/Oauth2Token";
import {injectable} from "inversify";
import Axios from "axios";
import {plainToClass} from "class-transformer";
import Preference from "@/Preference";


@injectable()
export class OAuth2RepositoryImpl implements OAuth2Repository {

    async getAccessTokenFromIdPw(id: string, pw: string): Promise<Oauth2Token> {
        const fromData = new FormData();
        fromData.append("username", id);
        fromData.append("password", pw);
        fromData.append("grant_type", "password");

        const response = await Axios.post<Oauth2Token>(`/${Preference.backEndUrl}/oauth/token`, fromData, {
            auth: this.getBasicAuth(),
        });
        return plainToClass(Oauth2Token, response.data);

    }

    async getAccessTokenFromRefreshToken(refreshToken: string): Promise<Oauth2Token> {
        const form = new FormData();
        form.append("grant_type", "refresh_token");
        form.append("refresh_token", refreshToken);
        const response = await Axios.post<Oauth2Token>(
            `/${Preference.backEndUrl}/oauth/token`,
            form,
            {
                auth: this.getBasicAuth(),
            }
        );
        return plainToClass(Oauth2Token, response.data);

    }

    private getBasicAuth() {
        return {
            username: "forutonaManager",
            password: "forutonaManager",
        };
    }


}
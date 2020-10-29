import {LoginManagerMakeUrl, OAuth2ClientInfo} from "vueoauth2login";
import Preference from "@/Preference";

export default  class  LoginMakeUrl implements LoginManagerMakeUrl{
    makeUrl(oAuth2ClientInfo: OAuth2ClientInfo): string {
        let scope = ""
        oAuth2ClientInfo.scope.forEach((x => {
            scope += `${x}+`
        }));

        scope = scope.substring(0, scope.length - 1);

        return `${Preference.loginPageUrl}?` +
            `clientId=${oAuth2ClientInfo.clientId}` +
            `&redirectUrl=${oAuth2ClientInfo.reDirectionUrl}` +
            `&scope=${scope}` +
            `&state=${oAuth2ClientInfo.state}`

    }
}
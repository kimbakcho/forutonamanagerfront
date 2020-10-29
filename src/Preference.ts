export default class Preference {

    static backEndUrl = "/forutonamanagermentb"

    static authUrl = "/forutonamanagermentb/token/auth";
    static reFreshTokenUrl = "/forutonamanagermentb/token/reFreshToken";
    static loginPageUrl = process.env.NODE_ENV === 'production'
        ? 'https://forutona.thkomeet.com:8443/mLogin'
        : 'https://forutona.thkomeet.com:8443/mLogin';
    static clientId = "forutonaMain";

    static redirectUrl= process.env.NODE_ENV === 'production'
        ? `https://10.20.10.114:8080/forutonamanagement/RedirectPage/child`
        : "http://localhost:8080/RedirectPage/child";

    static routerPushPage = "/";
    static accessTokenKey = "fAccessToken";
    static reFreshTokenKey = "fRefreshToken";
    static scope = ["message.read","message.write"];
    static state = "123";
    static reFreshTokenTimeout = "6300000";
}
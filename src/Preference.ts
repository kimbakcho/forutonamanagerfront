export default class Preference {

    static backEndUrl = "/forutonamanagermentb"

    static loginPageUrl = process.env.NODE_ENV === 'production'
        ? 'https://forutona.thkomeet.com:8443/SPALogin'
        : 'https://localhost:8443/SPALogin';

    static logoutPageUrl = process.env.NODE_ENV === 'production'
        ? 'https://forutona.thkomeet.com:8443/logout'
        : 'https://localhost:8443/logout';

}
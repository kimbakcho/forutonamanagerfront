export default class Preference {

    static backEndUrl = process.env.NODE_ENV === 'production'
        ? "/bforutonamanagerment"
        : "/bforutonamanagermenttest"

    static loginPageUrl = process.env.NODE_ENV === 'production'
        ? 'https://forutona.thkomeet.com:8443/bforutonamanagerment/SPALogin'
        : 'https://localhost:8443/bforutonamanagermenttest/SPALogin';

    static logoutPageUrl = process.env.NODE_ENV === 'production'
        ? 'https://forutona.thkomeet.com:8443/bforutonamanagerment/logout'
        : 'https://localhost:8443/bforutonamanagermenttest/logout';

    static googleMapBrowserApiKey = "AIzaSyDj5AJThWwAVV70QDj4s_zvQNVV_CMd0SE"

}
import TokenManagerListener from "vueoauth2login/src/components/TokenManagerListener";
import axios from "axios";

export default  class AuthTokenListener implements TokenManagerListener{
    onAccessToken(accessToken: string): void {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    onRefreshToken(refreshToken: string): void {
        console.log("refreshToken");
    }

}
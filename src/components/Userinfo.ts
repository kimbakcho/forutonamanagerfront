import axios from "axios";
import { deserialize } from "class-transformer";
export default class Userinfo {
  uid!: string;
  nickname!: string;
  password!: string;
  role!: string;
  access_token!: string;
  refresh_token!: string;
  static async Login(uid: string, password: string) {
    let form = new FormData();
    form.append("grant_type", "password");
    form.append("username", uid);
    form.append("password", password);

    try {
      let response = await axios.post(
        "/forutonamanagementbackend/oauth/token",
        form,
        {
          auth: {
            username: "forutona",
            password: "forutona1"
          }
        }
      );
      let userinfo = new Userinfo();
      userinfo.access_token = response.data.access_token;
      userinfo.refresh_token = response.data.refresh_token;
      userinfo.nickname = response.data.nickName;
      userinfo.role = response.data.role;
      return userinfo;
    } catch (error) {
      return null;
    }
  }
  static async getRefrashToken(refresh_token: string) {
    let form = new FormData();
    form.append("grant_type", "refresh_token");
    form.append("refresh_token", refresh_token);
    try {
      let response = await axios.post(
        "/forutonamanagementbackend/oauth/token",
        form,
        {
          auth: {
            username: "forutona",
            password: "forutona1"
          }
        }
      );
      let userinfo = new Userinfo();
      userinfo.access_token = response.data.access_token;
      userinfo.refresh_token = response.data.refresh_token;
      userinfo.nickname = response.data.nickName;
      userinfo.role = response.data.role;
      return userinfo;
    } catch (error) {
      return null;
    }
  }
}

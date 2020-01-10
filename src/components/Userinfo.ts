import axios from "axios";
import { deserialize } from "class-transformer";
export default class Userinfo {
  uid!: string;
  nickname!: string;
  password!: string;
  accesstoken!: string;

  public static Login(uid: string, password: string): Promise<Userinfo> {
    return new Promise(async (resolve, reject) => {
      let info = new Userinfo();
      info.uid = uid;
      info.password = password;
      try {
        let response = await axios.post(
          "/forutonamanagementbackend/api/v1/Auth/Login",
          info
        );
        let loginitem = deserialize(Userinfo, JSON.stringify(response.data));
        resolve(loginitem);
      } catch (error) {
        reject(null);
      }
    });
  }
  public RefrashToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let info = new Userinfo();
      let response = await axios.post(
        "/forutonamanagementbackend/api/v1/Auth/ReFreshToken",
        this
      );
      let tokenitem = deserialize(Userinfo, JSON.stringify(response.data));
      if (tokenitem == null) {
        resolve("");
      } else {
        resolve(tokenitem.accesstoken);
      }
    });
  }
}

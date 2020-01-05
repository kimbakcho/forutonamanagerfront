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
      let response = await axios.post(
        "/forutonamanagementbackend/api/v1/Auth/Login",
        info
      );
      let loginitem = deserialize(Userinfo, JSON.stringify(response.data));
      resolve(loginitem);
    });
  }
}

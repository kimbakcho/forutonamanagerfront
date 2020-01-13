import axios from "axios";
import { deserialize, deserializeArray, Transform } from "class-transformer";
import { DateTime } from "luxon";
import FcubeUserSearchdto from "./FcubeUserSearchdto";
export default class FcubeUserinfo {
  uid!: string;
  nickName!: string;
  profilePicktureUrl!: string;
  sex!: number;
  @Transform(value => DateTime.fromISO(value))
  ageDate!: DateTime;
  email!: string;
  forutonaAgree!: number;
  privateAgree!: number;
  positionAgree!: number;
  martketingAgree!: number;
  ageLimitAgree!: number;
  snsService!: string;
  phonenumber!: string;
  isoCode!: string;
  latitude!: number;
  longitude!: number;
  @Transform(value => DateTime.fromISO(value))
  positionUpdateTime!: DateTime;
  userLevel!: number;
  expPoint!: number;
  fCMtoken!: string;
  @Transform(value => DateTime.fromISO(value))
  joinTime!: DateTime;

  public static getFcubeUserinfos(
    searchitem: FcubeUserSearchdto
  ): Promise<FcubeUserinfo[]> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Fcube/Userinfo/selectlistbysearch",
        {
          params: searchitem
        }
      );
      resolve(deserializeArray(FcubeUserinfo, JSON.stringify(response.data)));
    });
  }

  public static getFcubeUserinfolength(
    searchitem: FcubeUserSearchdto
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Fcube/Userinfo/selectFcubeUserinfolength",
        {
          params: searchitem
        }
      );
      resolve(Number(response.data));
    });
  }
}

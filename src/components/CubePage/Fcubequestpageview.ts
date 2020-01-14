import axios from "axios";
import { deserialize, deserializeArray, Transform } from "class-transformer";
import { DateTime } from "luxon";
import FcubequestpageviewSearchdto from "./FcubequestpageviewSearchdto";
export default class Fcubequestpageview {
  cubeuuid!: string;
  uid!: string;
  longitude!: number;
  latitude!: number;
  cubeName!: string;
  cubeType!: string;
  @Transform(value => DateTime.fromISO(value))
  makeTime!: DateTime;
  influence!: number;
  cubeState!: number;
  placeAddress!: string;
  administrativeArea!: string;
  country!: string;
  pointReward!: number;
  influenceReward!: number;
  @Transform(value => DateTime.fromISO(value))
  activationTime!: DateTime;
  cubePassword!: string;
  hasPassword!: number;
  cubeScope!: number;
  influenceLevel!: number;
  cubeHits!: number;
  cubeLikes!: number;
  cubeDisLikes!: number;
  joinPlayer!: number;
  maximumPlayers!: number;
  starPoints!: number;
  expGiveFlag!: number;
  makeExp!: number;
  nickName!: string;
  sex!: number;
  @Transform(value => DateTime.fromISO(value))
  ageDate!: DateTime;
  email!: string;
  forutonaAgree!: number;
  privateAgree!: number;
  positionAgree!: number;
  martketingAgree!: number;
  ageLimitAgree!: number;

  public static getFcubequestpageviews(
    searchdto: FcubequestpageviewSearchdto
  ): Promise<Fcubequestpageview[]> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Fcue/QuestCubePage/selectFcubeQuestPageView",
        {
          params: searchdto
        }
      );
      resolve(
        deserializeArray(Fcubequestpageview, JSON.stringify(response.data))
      );
    });
  }
  public static getFcubeQuestPageViewlength(
    searchdto: FcubequestpageviewSearchdto
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Fcube/QuestCubePage/selectFcubeQuestPageViewlength",
        {
          params: searchdto
        }
      );
      resolve(Number(response.data));
    });
  }
}

import { DateTime } from "luxon";
import { Transform, deserialize, deserializeArray } from "class-transformer";
import axios from "axios";
import NoticePageSearchDto from "@/components/NoticePage/NoticePageSearchDto";
export default class Noticepage {
  idx!: number;
  pageName!: string;
  pageWriter!: string;
  @Transform(value => DateTime.fromISO(value))
  writeDate!: DateTime;
  pageContent!: string;

  public static getNoticepageList(
    searchitem: NoticePageSearchDto
  ): Promise<Noticepage[]> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/NoticePage/list",
        {
          params: searchitem
        }
      );
      resolve(deserializeArray(Noticepage, JSON.stringify(response.data)));
    });
  }

  public static getPageItem(searchitem: Noticepage): Promise<Noticepage> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/NoticePage/Pageitem",
        { params: searchitem }
      );
      resolve(deserialize(Noticepage, JSON.stringify(response.data)));
    });
  }

  public static getNoticepagelength(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/NoticePage/Pagelength"
      );
      resolve(Number(response.data));
    });
  }

  public writeNoiceDoc(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.post(
        "/forutonamanagementbackend/v1/NoticePage/Writedoc",
        this
      );
      resolve(Number(response.data));
    });
  }
}

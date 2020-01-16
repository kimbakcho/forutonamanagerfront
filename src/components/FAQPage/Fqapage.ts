import { DateTime } from "luxon";
import { Transform, deserialize, deserializeArray } from "class-transformer";
import axios from "axios";
import FaqpageSearchdto from "./FaqpageSearchdto";
export default class Fqapage {
  idx!: number;
  docName!: string;
  pageWriter!: string;
  @Transform(value => DateTime.fromISO(value))
  writeDate!: DateTime;

  public static getitemlist(searchdto: FaqpageSearchdto): Promise<Fqapage[]> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Faqpage/list",
        {
          params: searchdto
        }
      );
      resolve(deserializeArray(Fqapage, JSON.stringify(response.data)));
    });
  }
  public static getPagelength(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Faqpage/Pagelength"
      );
      resolve(Number(response.data));
    });
  }
  public static getPageitem(idx: number): Promise<Fqapage> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "/forutonamanagementbackend/v1/Faqpage/Pageitem",
        {
          params: {
            idx: idx
          }
        }
      );
      resolve(deserialize(Fqapage, response.data));
    });
  }

  public insertPageitem(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let response = await axios.post(
        "/forutonamanagementbackend/v1/Faqpage/InsertPage",
        this
      );
      resolve(Number(response.data));
    });
  }
}

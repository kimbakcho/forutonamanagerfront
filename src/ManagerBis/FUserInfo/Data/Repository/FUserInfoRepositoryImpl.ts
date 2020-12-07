import FUserInfoRepository from "@/ManagerBis/FUserInfo/Domain/Repository/FUserInfoRepository";
import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";
import axios from "axios";
import {injectable} from "inversify";
import Preference from "@/Preference";
import {plainToClass} from "class-transformer";

@injectable()
export default class FUserInfoRepositoryImpl implements FUserInfoRepository {

    async findById(uid: String): Promise<FUserInfoResDto> {
        const response = await axios.get(`${Preference.backEndUrl}/fUserInfo/uid`,{
            params:{
                "uid": uid
            }
        });
        return plainToClass(FUserInfoResDto,response.data);
    }

}
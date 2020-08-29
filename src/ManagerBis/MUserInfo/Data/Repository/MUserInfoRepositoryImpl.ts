
import Axios from 'axios';
import { injectable } from 'inversify';

import { plainToClass } from 'class-transformer';

import {SignUpReqDto} from "@/ManagerBis/MUserInfo/Dto/SignUpReqDto";
import {MUserInfo} from "@/ManagerBis/MUserInfo/Domain/Entity/MUserInfo";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";
import Preference from "@/Preference";

@injectable()
export class MUserInfoRepositoryImpl implements MUserInfoRepository {

    async signUp(reqDto: SignUpReqDto): Promise<void> {
        await Axios.post<MUserInfo>(`/${Preference.backEndUrl}/MUserInfo/SignUp`, reqDto);
    }
    async getMe(): Promise<MUserInfo> {
        const response = await Axios.get<MUserInfo>(`/${Preference.backEndUrl}/MUserInfo/Me`);

        return plainToClass(MUserInfo, response.data);
    }
}

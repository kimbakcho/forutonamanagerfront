import MaliciousProfileRepository from "@/ManagerBis/Malicious/Domain/Repository/Profile/MaliciousProfileRepository";
import {injectable} from "inversify";
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import axios from "axios";
import Preference from "@/Preference";
import {plainToClass} from "class-transformer";
import MaliciousProfilePageItemResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfilePageItemResDto";


@injectable()
export default class MaliciousProfileRepositoryImpl implements MaliciousProfileRepository {
    async findById(idx: Number): Promise<MaliciousProfileResDto> {
        const response = await axios.get<MaliciousProfileResDto>(`${Preference.backEndUrl}/maliciousProfile/idx`,{
            params:{
                "idx": idx
            }
        });
        return plainToClass(MaliciousProfileResDto,response.data);
    }

    async findByPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousProfilePageItemResDto>> {
        const response = await axios.get<PageWrap<MaliciousProfilePageItemResDto>>(`${Preference.backEndUrl}/maliciousProfile`, {
            params: {
                "searchType": searchType,
                "size": pageable.size,
                "page": pageable.page,
                "sort": pageable.sort
            }
        });
        return response.data;
    }

    async updateJudgement(idx: Number, maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousProfileResDto> {
        const response = await axios.put(`${Preference.backEndUrl}/maliciousProfile`,null,{
            params:{
                "idx": idx,
                "maliciousJudgementType": maliciousJudgementType
            }
        });
        return plainToClass(MaliciousProfileResDto,response.data);
    }

}
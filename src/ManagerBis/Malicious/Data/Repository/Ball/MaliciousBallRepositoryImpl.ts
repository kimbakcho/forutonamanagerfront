import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/MaliciousBallResDto";
import {MaliciousBallSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousBallSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import axios from "axios";
import {injectable} from "inversify";
import Preference from "@/Preference";

@injectable()
export default class MaliciousBallRepositoryImpl implements MaliciousBallRepository {

    async findByPage(searchType: MaliciousBallSearchType, pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>> {
        const response = await axios.get<PageWrap<MaliciousBallResDto>>(`${Preference.backEndUrl}/maliciousBall`, {
            params: {
                "searchType": searchType,
                "size": pageable.size,
                "page": pageable.page,
                "sort": pageable.sort
            }
        });
        return response.data;
    }

    async findById(idx: number): Promise<MaliciousBallResDto> {
        const response = await axios.get(`${Preference.backEndUrl}/maliciousBall/idx`, {
            params: {
                "idx": idx
            }
        });
        return response.data;
    }


    async updateJudgement(idx: number, maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousBallResDto> {
        const response = await axios.put(`${Preference.backEndUrl}/maliciousBall`, null, {
            params: {
                "idx": idx,
                "maliciousJudgementType": maliciousJudgementType
            }
        });
        return response.data;
    }

}
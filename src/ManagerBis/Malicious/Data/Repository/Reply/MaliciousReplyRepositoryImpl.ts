import MaliciousReplyRepository from "@/ManagerBis/Malicious/Domain/Repository/Reply/MaliciousReplyRepository";
import MaliciousReplyPageItemResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyPageItemResDto";
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import {injectable} from "inversify";
import axios from "axios";
import Preference from "@/Preference";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";
import {plainToClass} from "class-transformer";

@injectable()
export default class MaliciousReplyRepositoryImpl implements MaliciousReplyRepository{


    async findById(idx: Number): Promise<MaliciousReplyResDto> {
        const response = await axios.get<MaliciousReplyResDto>(`${Preference.backEndUrl}/maliciousReply/idx`,
            {
                params: {
                    "idx": idx
                }
            });
        return plainToClass(MaliciousReplyResDto,response.data);
    }

    async findByPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousReplyPageItemResDto>> {
        const response = await axios.get<PageWrap<MaliciousReplyPageItemResDto>>(
            `${Preference.backEndUrl}/maliciousReply`,{
                params:{
                    "searchType": searchType,
                    "size": pageable.size,
                    "sort": pageable.sort,
                    "page": pageable.page
                }
            });
        return response.data;
    }

    async updateJudgement(idx: Number, maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousReplyResDto> {
        const response = await axios.put<MaliciousReplyResDto>(`${Preference.backEndUrl}/maliciousReply`,null,{
            params:{
                "idx": idx,
                "maliciousJudgementType": maliciousJudgementType
            }
        });
        return plainToClass(MaliciousReplyResDto,response.data);
    }

}
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";

import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import MaliciousProfilePageItemResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfilePageItemResDto";

export default interface MaliciousProfileRepository {
    findByPage(searchType: MaliciousSearchType,pageable: Pageable): Promise<PageWrap<MaliciousProfilePageItemResDto>>;
    findById(idx: Number): Promise<MaliciousProfileResDto>;
    updateJudgement(idx: Number,maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousProfileResDto>;
}
import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

export default interface MaliciousBallRepository {
    findByPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>>;
    findById(idx: Number): Promise<MaliciousBallResDto>;
    updateJudgement(idx: Number,maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousBallResDto>;
}
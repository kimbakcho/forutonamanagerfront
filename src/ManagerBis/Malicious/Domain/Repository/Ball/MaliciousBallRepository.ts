import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/MaliciousBallResDto";
import {MaliciousBallSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousBallSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

export default interface MaliciousBallRepository {
    findByPage(searchType: MaliciousBallSearchType,pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>>;
    findById(idx: number): Promise<MaliciousBallResDto>;
    updateJudgement(idx: number,maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousBallResDto>;
}
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import MaliciousReplyPageItemResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyPageItemResDto";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";

export default interface MaliciousReplyRepository {
    findByPage(searchType: MaliciousSearchType,pageable: Pageable): Promise<PageWrap<MaliciousReplyPageItemResDto>>;
    findById(idx: Number): Promise<MaliciousReplyResDto>;
    updateJudgement(idx: Number,maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousReplyResDto>;
}
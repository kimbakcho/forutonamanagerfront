import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";
import MaliciousReplyRepository from "@/ManagerBis/Malicious/Domain/Repository/Reply/MaliciousReplyRepository";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

export default class MaliciousReplyContentJudgementInputPort
    implements MaliciousJudgementUseCaseInputPort<MaliciousReplyResDto>{

    idx: Number;
    maliciousReplyRepository: MaliciousReplyRepository;

    constructor(idx: Number,maliciousReplyRepository: MaliciousReplyRepository) {
        this.idx = idx;
        this.maliciousReplyRepository = maliciousReplyRepository;
    }

    async judgement(): Promise<MaliciousReplyResDto> {
        return await this.maliciousReplyRepository.updateJudgement(this.idx,MaliciousJudgementType.MaliciousContent);
    }

}
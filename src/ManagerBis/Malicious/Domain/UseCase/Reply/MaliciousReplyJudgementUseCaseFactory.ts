import {inject, injectable} from "inversify";
import MaliciousReplyRepository from "@/ManagerBis/Malicious/Domain/Repository/Reply/MaliciousReplyRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";
import MaliciousProfileContentJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileContentJudgementInputPort";
import MaliciousProfileFalseReportJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileFalseReportJudgementInputPort";
import MaliciousReplyContentJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyContentJudgementInputPort";
import MaliciousReplyFalseReportJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyFalseReportJudgementInputPort";

@injectable()
export default class MaliciousReplyJudgementUseCaseFactory {

    private readonly maliciousReplyRepository: MaliciousReplyRepository;

    constructor(@inject(TYPES.MaliciousReplyRepository)
                    maliciousReplyRepository: MaliciousReplyRepository) {
        this.maliciousReplyRepository = maliciousReplyRepository;
    }

    public getInstance(type: MaliciousJudgementType,idx: Number):
        MaliciousJudgementUseCaseInputPort<MaliciousReplyResDto> {
        switch (type){
            case MaliciousJudgementType.MaliciousContent:
                return new MaliciousReplyContentJudgementInputPort(idx,this.maliciousReplyRepository)
            case MaliciousJudgementType.FalseReport:
                return new MaliciousReplyFalseReportJudgementInputPort(idx,this.maliciousReplyRepository)
            default :
                throw new Error("don't support")
        }
    }
}
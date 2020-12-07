import {inject, injectable} from "inversify";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousProfileRepository from "@/ManagerBis/Malicious/Domain/Repository/Profile/MaliciousProfileRepository";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import MaliciousBallContentJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallContentJudgementInputPort";
import MaliciousBallFalseReportJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallFalseReportJudgementInputPort";
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import MaliciousProfileContentJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileContentJudgementInputPort";
import MaliciousProfileFalseReportJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileFalseReportJudgementInputPort";

@injectable()
export default class MaliciousProfileJudgementUseCaseFactory {
    maliciousProfileRepository: MaliciousProfileRepository;

    constructor(@inject(TYPES.MaliciousProfileRepository) maliciousProfileRepository: MaliciousProfileRepository) {
        this.maliciousProfileRepository = maliciousProfileRepository;
    }

    public getInstance(type: MaliciousJudgementType,idx: Number):
        MaliciousJudgementUseCaseInputPort<MaliciousProfileResDto> {
        switch (type){
            case MaliciousJudgementType.MaliciousContent:
                return new MaliciousProfileContentJudgementInputPort(idx,this.maliciousProfileRepository)
            case MaliciousJudgementType.FalseReport:
                return new MaliciousProfileFalseReportJudgementInputPort(idx,this.maliciousProfileRepository)
            default :
                throw new Error("don't support")
        }
    }

}
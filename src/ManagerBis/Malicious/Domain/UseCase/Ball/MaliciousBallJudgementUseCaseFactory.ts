import {inject, injectable} from "inversify";
import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import MaliciousBallContentJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallContentJudgementInputPort";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";
import MaliciousBallFalseReportJudgementInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallFalseReportJudgementInputPort";

@injectable()
export default class MaliciousBallJudgementUseCaseFactory{

    maliciousBallRepository: MaliciousBallRepository;

    constructor(@inject(TYPES.MaliciousBallRepository) maliciousBallRepository: MaliciousBallRepository) {
        this.maliciousBallRepository = maliciousBallRepository;
    }

    public getInstance(type: MaliciousJudgementType,idx: Number):
        MaliciousJudgementUseCaseInputPort<MaliciousBallResDto> {
        switch (type){
            case MaliciousJudgementType.MaliciousContent:
                return new MaliciousBallContentJudgementInputPort(idx,this.maliciousBallRepository)
            case MaliciousJudgementType.FalseReport:
                return new MaliciousBallFalseReportJudgementInputPort(idx,this.maliciousBallRepository)
            default :
                throw new Error("don't support")
        }
    }
}
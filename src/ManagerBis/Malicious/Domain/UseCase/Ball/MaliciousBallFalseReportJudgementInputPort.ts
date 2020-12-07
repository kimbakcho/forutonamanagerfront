import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

export default class MaliciousBallFalseReportJudgementInputPort
    implements MaliciousJudgementUseCaseInputPort<MaliciousBallResDto>{

    maliciousBallRepository: MaliciousBallRepository;
    idx: Number;
    constructor(idx: Number,maliciousBallRepository: MaliciousBallRepository) {
        this.maliciousBallRepository = maliciousBallRepository;
        this.idx = idx;
    }


    async judgement(): Promise<MaliciousBallResDto> {
        return await this.maliciousBallRepository.updateJudgement(this.idx,MaliciousJudgementType.FalseReport);
    }

}
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import MaliciousJudgementUseCaseInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousProfileRepository from "@/ManagerBis/Malicious/Domain/Repository/Profile/MaliciousProfileRepository";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

export default class MaliciousProfileContentJudgementInputPort
    implements MaliciousJudgementUseCaseInputPort<MaliciousProfileResDto>{

    idx: Number;
    maliciousProfileRepository: MaliciousProfileRepository;

    constructor(idx: Number,maliciousProfileRepository: MaliciousProfileRepository) {
        this.idx = idx;
        this.maliciousProfileRepository = maliciousProfileRepository;
    }


    async judgement(): Promise<MaliciousProfileResDto> {
        return await this.maliciousProfileRepository.updateJudgement(this.idx,MaliciousJudgementType.MaliciousContent);
    }

}
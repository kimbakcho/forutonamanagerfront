import {MaliciousBallSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousBallSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/MaliciousBallResDto";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";

export default interface MaliciousBallUseCaseInputPort {
    getPage(searchType: MaliciousBallSearchType,pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>>;
    getMaliciousBall(idx: Number): Promise<MaliciousBallResDto>;
    updateJudgement(idx: Number,maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousBallResDto>;
}

@injectable()
export class MaliciousBallUseCase implements MaliciousBallUseCaseInputPort{

    maliciousBallRepository: MaliciousBallRepository

    constructor(@inject(TYPES.MaliciousBallRepository) maliciousBallRepository: MaliciousBallRepository) {
        this.maliciousBallRepository = maliciousBallRepository;
    }

    async getMaliciousBall(idx: number): Promise<MaliciousBallResDto> {
        return await this.maliciousBallRepository.findById(idx);
    }

    async getPage(searchType: MaliciousBallSearchType, pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>> {
        return await this.maliciousBallRepository.findByPage(searchType,pageable);
    }

    async updateJudgement(idx: number, maliciousJudgementType: MaliciousJudgementType): Promise<MaliciousBallResDto> {
        return await this.maliciousBallRepository.updateJudgement(idx,maliciousJudgementType);
    }

}
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";

export default interface MaliciousBallUseCaseInputPort {
    getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>>;
    getMaliciousBall(idx: Number): Promise<MaliciousBallResDto>;
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

    async getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousBallResDto>> {
        return await this.maliciousBallRepository.findByPage(searchType,pageable);
    }


}
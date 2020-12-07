import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousProfileRepository from "@/ManagerBis/Malicious/Domain/Repository/Profile/MaliciousProfileRepository";
import MaliciousProfilePageItemResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfilePageItemResDto";

export default interface MaliciousProfileUseCaseInputPort{
    getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousProfilePageItemResDto>>;
    getMaliciousProfile(idx: Number): Promise<MaliciousProfileResDto>;
}

@injectable()
export class MaliciousProfileUseCase implements MaliciousProfileUseCaseInputPort{

    maliciousProfileRepository: MaliciousProfileRepository;

    constructor(@inject(TYPES.MaliciousProfileRepository) maliciousProfileRepository: MaliciousProfileRepository) {
        this.maliciousProfileRepository = maliciousProfileRepository;
    }

    async getMaliciousProfile(idx: Number): Promise<MaliciousProfileResDto> {
        return await this.maliciousProfileRepository.findById(idx);
    }

    async getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousProfilePageItemResDto>> {
        return await this.maliciousProfileRepository.findByPage(searchType,pageable);
    }

}
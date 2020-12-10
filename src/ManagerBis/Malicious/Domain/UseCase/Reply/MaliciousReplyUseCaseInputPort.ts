import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import MaliciousReplyPageItemResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyPageItemResDto";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";
import {inject, injectable} from "inversify";
import MaliciousReplyRepository from "@/ManagerBis/Malicious/Domain/Repository/Reply/MaliciousReplyRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";

export default interface MaliciousReplyUseCaseInputPort {
    getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousReplyPageItemResDto>>;
    getMaliciousReply(idx: Number): Promise<MaliciousReplyResDto>;
}

@injectable()
export class MaliciousReplyUseCase implements MaliciousReplyUseCaseInputPort{

    maliciousReplyRepository: MaliciousReplyRepository;
    constructor(@inject(TYPES.MaliciousReplyRepository)maliciousReplyRepository: MaliciousReplyRepository) {
        this.maliciousReplyRepository = maliciousReplyRepository
    }

    async getMaliciousReply(idx: Number): Promise<MaliciousReplyResDto> {
        return await this.maliciousReplyRepository.findById(idx);
    }

    async getPage(searchType: MaliciousSearchType, pageable: Pageable): Promise<PageWrap<MaliciousReplyPageItemResDto>> {
        return await this.maliciousReplyRepository.findByPage(searchType,pageable);
    }

}
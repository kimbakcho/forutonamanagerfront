import TermsConditionsResDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsResDto";
import {inject, injectable} from "inversify";
import TermsConditionsRepository from "@/ManagerBis/TermsConditions/Domain/Repository/TermsConditionsRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import index from "@/store";
import TermsConditionsSaveDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsSaveDto";
import TermsConditionsUpdateDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsUpdateDto";

export default interface TermsConditionsUseCaseInputPort {
    getTermsConditions(idx: number): Promise<TermsConditionsResDto>;
    updateTermsConditions(updateDto: TermsConditionsUpdateDto): Promise<TermsConditionsResDto>
}

@injectable()
export class TermsConditionsUseCase implements TermsConditionsUseCaseInputPort{

    _termsConditionsRepository: TermsConditionsRepository;

    constructor(@inject(TYPES.TermsConditionsRepository) termsConditionsRepository: TermsConditionsRepository) {
        this._termsConditionsRepository = termsConditionsRepository

    }

    async getTermsConditions(idx: number): Promise<TermsConditionsResDto> {
        return await this._termsConditionsRepository.findById(idx);
    }

    async saveTermsConditions(saveDto: TermsConditionsSaveDto): Promise<TermsConditionsResDto> {
        return await this._termsConditionsRepository.save(saveDto);
    }

    async updateTermsConditions(updateDto: TermsConditionsUpdateDto): Promise<TermsConditionsResDto> {
        return await this._termsConditionsRepository.update(updateDto);
    }

    async deleteTermsConditions(idx: number): Promise<void> {
        await this._termsConditionsRepository.delete(idx);
    }



}
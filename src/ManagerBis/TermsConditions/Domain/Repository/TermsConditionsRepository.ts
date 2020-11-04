import TermsConditionsResDto from '../../Dto/TermsConditionsResDto';
import TermsConditionsSaveDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsSaveDto";
import TermsConditionsUpdateDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsUpdateDto";


export default interface TermsConditionsRepository {
    findById(idx: number): Promise<TermsConditionsResDto>;
    save(saveReqDto: TermsConditionsSaveDto): Promise<TermsConditionsResDto>;
    update(updateReqDto: TermsConditionsUpdateDto): Promise<TermsConditionsResDto>;
    delete(idx: number): Promise<void>;
}
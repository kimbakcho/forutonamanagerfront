import TermsConditionsRepository from "@/ManagerBis/TermsConditions/Domain/Repository/TermsConditionsRepository";
import TermsConditionsResDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsResDto";
import axios from "axios";
import Preference from "@/Preference";
import {plainToClass, TransformPlainToClass} from "class-transformer";
import {id, injectable} from "inversify";
import TermsConditionsSaveDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsSaveDto";
import TermsConditionsUpdateDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsUpdateDto";

@injectable()
export default class TermsConditionsRepositoryImpl implements  TermsConditionsRepository {
    async findById(idx: number): Promise<TermsConditionsResDto> {
        const response = await axios.get<TermsConditionsResDto>(`${Preference.backEndUrl}/termsConditions`,{
            params: {
                idx: idx
            }
        });
        return plainToClass(TermsConditionsResDto,response.data) ;
    }

    async delete(idx: number): Promise<void> {
        await axios.delete(`${Preference.backEndUrl}/termsConditions`,{
            params:{
              idx: idx
            }
        });
    }

    async save(saveReqDto: TermsConditionsSaveDto): Promise<TermsConditionsResDto> {
        const response = await axios.post<TermsConditionsResDto>(`${Preference.backEndUrl}/termsConditions`,saveReqDto);
        return plainToClass(TermsConditionsResDto,response.data);
    }

    async update(updateReqDto: TermsConditionsUpdateDto): Promise<TermsConditionsResDto> {
        const response = await axios.put<TermsConditionsResDto>(`${Preference.backEndUrl}/termsConditions`,updateReqDto);
        return plainToClass(TermsConditionsResDto,response.data);
    }

}
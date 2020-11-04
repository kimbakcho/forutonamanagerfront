import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class TermsConditionsResDto {
    idx!: number;
    termsName!: string;
    termsContent!: string;
    modifyDate!: string;
    modifyUser!: MUserInfoResDto;
}
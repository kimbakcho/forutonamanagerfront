import {MUserInfo} from "@/ManagerBis/MUserInfo/Domain/Entity/MUserInfo";
import {SignUpReqDto} from "@/ManagerBis/MUserInfo/Dto/SignUpReqDto";

export interface MUserInfoRepository {
    signUp(reqDto: SignUpReqDto): Promise<void>;
    getMe(): Promise<MUserInfo>;
}

import {SignUpReqDto} from "@/ManagerBis/MUserInfo/Dto/SignUpReqDto";
import {inject, injectable} from "inversify";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";


export interface SignUpCaseInputPort {
    signUp(reqDto: SignUpReqDto): Promise<void>;
}

@injectable()
export class SignUpCase implements SignUpCaseInputPort {

    private _mUserInfoRepository!: MUserInfoRepository;

    constructor(@inject(TYPES.MUserInfoRepository) mUserInfoRepository: MUserInfoRepository) {
        this._mUserInfoRepository = mUserInfoRepository;
    }

    async signUp(reqDto: SignUpReqDto): Promise<void> {
        return await this._mUserInfoRepository.signUp(reqDto);
    }

}

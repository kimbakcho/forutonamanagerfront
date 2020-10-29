import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";


export interface MUserInfoUseCaseInputPort {
    getMe(): Promise<MUserInfoResDto>;
}

@injectable()
export class MUserInfoUseCase implements MUserInfoUseCaseInputPort {

    private _mUserInfoRepository!: MUserInfoRepository;

    constructor(@inject(TYPES.MUserInfoRepository) mUserInfoRepository: MUserInfoRepository) {
        this._mUserInfoRepository= mUserInfoRepository;
    }

    async getMe(): Promise<MUserInfoResDto> {
        return MUserInfoResDto.fromMUserInfo(await this._mUserInfoRepository.getMe());
    }


}

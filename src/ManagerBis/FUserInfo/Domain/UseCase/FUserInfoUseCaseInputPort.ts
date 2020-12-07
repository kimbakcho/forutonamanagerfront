import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";
import {inject, injectable} from "inversify";
import FUserInfoRepository from "@/ManagerBis/FUserInfo/Domain/Repository/FUserInfoRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";

export default interface FUserInfoUseCaseInputPort {
    getFUserInfoResDto(uid: String): Promise<FUserInfoResDto>;
}

@injectable()
export class FUserInfoUseCase implements FUserInfoUseCaseInputPort {

    fUserInfoRepository: FUserInfoRepository;
    constructor(@inject(TYPES.FUserInfoRepository) fUserInfoRepository: FUserInfoRepository) {
        this.fUserInfoRepository = fUserInfoRepository;
    }

    async getFUserInfoResDto(uid: String): Promise<FUserInfoResDto> {
         return await this.fUserInfoRepository.findById(uid);
    }

}
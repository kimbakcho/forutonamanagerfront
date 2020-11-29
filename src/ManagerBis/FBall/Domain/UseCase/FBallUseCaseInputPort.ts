import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";
import {inject, injectable} from "inversify";
import FBallRepository from "@/ManagerBis/FBall/Domain/Repository/FBallRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";

export default interface FBallUseCaseInputPort {
    getFBall(ballUuid: string): Promise<FBallResDto>;
}
@injectable()
export class FBallUseCase implements FBallUseCaseInputPort{

    fBallRepository: FBallRepository;

    constructor(@inject(TYPES.FBallRepository) fBallRepository: FBallRepository) {
        this.fBallRepository = fBallRepository
    }

    async getFBall(ballUuid: string): Promise<FBallResDto> {
        return await this.fBallRepository.findById(ballUuid)
    }
}
import FBallReplyResDto from "@/ManagerBis/FBallReply/Dto/FBallReplyResDto";
import {inject, injectable} from "inversify";
import FBallReplyRepository from "@/ManagerBis/FBallReply/Domain/Repository/FBallReplyRepository";
import TYPES from "@/ManagerBis/ManagerBisTypes";

export default interface FBallReplyUseCaseInputPort {
    getItem(replyUuid: String): Promise<FBallReplyResDto>;
}

@injectable()
export class FBallReplyUseCase implements FBallReplyUseCaseInputPort{

    fBallReplyRepository: FBallReplyRepository;

    constructor(@inject(TYPES.FBallReplyRepository) fBallReplyRepository: FBallReplyRepository) {
        this.fBallReplyRepository = fBallReplyRepository;
    }

    async getItem(replyUuid: String): Promise<FBallReplyResDto> {
        return await this.fBallReplyRepository.findById(replyUuid);
    }

}
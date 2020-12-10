import FBallReplyResDto from "@/ManagerBis/FBallReply/Dto/FBallReplyResDto";

export default interface FBallReplyRepository {
    findById(id: String): Promise<FBallReplyResDto>;
}
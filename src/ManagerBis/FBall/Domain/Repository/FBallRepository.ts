import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";

export default interface FBallRepository {
    findById(ballUuid: string): Promise<FBallResDto>;
}
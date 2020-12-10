import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";
import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";

export default class FBallReplyResDto {
    replyUuid!: String;
    ballUuid!: FBallResDto;
    uid!: FUserInfoResDto;
    replyNumber!: Number;
    replySort!: Number;
    replyDepth!: Number;
    replyText!: String;
    replyUploadDateTime!: String;
    replyUpdateDateTime!: String;
    deleteFlag!: Boolean;
}
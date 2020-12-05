import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";

export default class FBallResDto{
    ballUuid!: String;
    uid!: FUserInfoResDto;
   longitude!: Number;
   latitude!: Number;
   ballName!: String;
   ballType!: String;
   makeTime!: String;
   ballState!: String;
   placeAddress!: String;
   administrativeArea!: String;
   country!: String;
   pointReward!: Number;
   influenceReward!: Number;
   activationTime!: String;
   ballPassword!: String;
   hasPassword!: Number;
   ballHits!: Number;
   ballLikes!: Number;
   ballDisLikes!: Number;
   ballPower!: Number;
   joinPlayer!: Number;
   maximumPlayers!: Number;
   starPoints!: Number;
   expGiveFlag!: Number;
   makeExp!: Number;
   commentCount!: Number;
   userExp!: Number;
   description!: String;
   contributor!: Number;
   ballDeleteFlag!: Number;
   maliciousContentLevel!: Number;
}
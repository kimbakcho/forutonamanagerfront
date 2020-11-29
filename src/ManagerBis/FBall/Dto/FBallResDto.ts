import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";

export default class FBallResDto{
    ballUuid!: string;
    uid!: FUserInfoResDto;
   longitude!: number;
   latitude!: number;
   ballName!: string;
   ballType!: string;
   makeTime!: string;
   ballState!: string;
   placeAddress!: string;
   administrativeArea!: string;
   country!: string;
   pointReward!: number;
   influenceReward!: number;
   activationTime!: string;
   ballPassword!: string;
   hasPassword!: number;
   ballHits!: number;
   ballLikes!: number;
   ballDisLikes!: number;
   ballPower!: number;
   joinPlayer!: number;
   maximumPlayers!: number;
   starPoints!: number;
   expGiveFlag!: number;
   makeExp!: number;
   commentCount!: number;
   userExp!: number;
   description!: string;
   contributor!: number;
   ballDeleteFlag!: number;
   maliciousContentLevel!: number;
}
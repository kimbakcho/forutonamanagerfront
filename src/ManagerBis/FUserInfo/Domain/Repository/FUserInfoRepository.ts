import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";

export default interface FUserInfoRepository {
    findById(uid: String): Promise<FUserInfoResDto>;
}
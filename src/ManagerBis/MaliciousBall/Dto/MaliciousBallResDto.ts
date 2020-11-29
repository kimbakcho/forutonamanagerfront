import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class MaliciousBallResDto {
    idx!: number;
    ballUud!: string;
    ballName!: string;
    makerNickName!: string;
    ballHits!: number;
    ballMakeTime!: string;
    totalNumberReports!: number;
    crime!: number;
    abuse!: number;
    privacy!: number;
    sexual!: number;
    advertising!: number;
    etc!: number;
    maliciousContentFlag!: number;
    falseReportFlag!: number;
    judgmentTime!: string;
    judgmentUid!: MUserInfoResDto;
}
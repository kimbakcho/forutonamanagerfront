import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class MaliciousBallResDto {
    idx!: Number;
    ballUuid!: String;
    ballName!: String;
    makerNickName!: String;
    ballHits!: Number;
    ballMakeTime!: String;
    totalNumberReports!: Number;
    crime!: Number;
    abuse!: Number;
    privacy!: Number;
    sexual!: Number;
    advertising!: Number;
    etc!: Number;
    maliciousContentFlag!: Boolean;
    falseReportFlag!: Boolean;
    judgmentTime!: String;
    judgmentUid!: MUserInfoResDto;
}
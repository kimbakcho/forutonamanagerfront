import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class MaliciousReplyResDto {
    idx!: Number;
    replyUuid!: String;
    crime!: Number;
    abuse!: Number;
    privacy!: Number;
    sexual!: Number;
    advertising!: Number;
    etc!: Number;
    totalNumberReports!: Number;
    maliciousContentFlag!: Boolean;
    falseReportFlag!: Boolean;
    judgmentTime!: String;
    judgmentUid!: MUserInfoResDto;
}
import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class MaliciousProfileResDto{
    idx!: Number;
    uid!: String;
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
    totalNumberReports!: Number;
}
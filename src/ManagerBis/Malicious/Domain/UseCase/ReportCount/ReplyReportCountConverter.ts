import ReportCountConverterInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";
import MaliciousReportCountDto from "@/ManagerBis/Malicious/Dto/MaliciousReportCountDto";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";

export default class ReplyReportCountConverter implements ReportCountConverterInputPort{

    maliciousReplyResDto: MaliciousReplyResDto;

    constructor(maliciousReplyResDto: MaliciousReplyResDto) {
        this.maliciousReplyResDto = maliciousReplyResDto;
    }

    getMaliciousReportCountDto(): MaliciousReportCountDto {
        const maliciousReportCountDto = new MaliciousReportCountDto();
        maliciousReportCountDto.abuse = this.maliciousReplyResDto.abuse;
        maliciousReportCountDto.advertising = this.maliciousReplyResDto.advertising;
        maliciousReportCountDto.crime = this.maliciousReplyResDto.crime;
        maliciousReportCountDto.etc = this.maliciousReplyResDto.etc;
        maliciousReportCountDto.privacy = this.maliciousReplyResDto.privacy;
        maliciousReportCountDto.sexual = this.maliciousReplyResDto.sexual;
        maliciousReportCountDto.totalNumberReports = this.maliciousReplyResDto.totalNumberReports;
        return maliciousReportCountDto;
    }

}
import ReportCountConverterInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import MaliciousReportCountDto from "@/ManagerBis/Malicious/Dto/MaliciousReportCountDto";
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";

export default class ProfileReportCountConverter implements ReportCountConverterInputPort{
    maliciousProfileResDto: MaliciousProfileResDto;

    constructor(maliciousProfileResDto: MaliciousProfileResDto) {
        this.maliciousProfileResDto = maliciousProfileResDto;
    }

    getMaliciousReportCountDto(): MaliciousReportCountDto {
        const maliciousReportCountDto = new MaliciousReportCountDto();
        maliciousReportCountDto.abuse = this.maliciousProfileResDto.abuse;
        maliciousReportCountDto.advertising = this.maliciousProfileResDto.advertising;
        maliciousReportCountDto.crime = this.maliciousProfileResDto.crime;
        maliciousReportCountDto.etc = this.maliciousProfileResDto.etc;
        maliciousReportCountDto.privacy = this.maliciousProfileResDto.privacy;
        maliciousReportCountDto.sexual = this.maliciousProfileResDto.sexual;
        maliciousReportCountDto.totalNumberReports = this.maliciousProfileResDto.totalNumberReports;
        return maliciousReportCountDto;
    }
}
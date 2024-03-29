import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";
import MaliciousReportCountDto from "@/ManagerBis/Malicious/Dto/MaliciousReportCountDto";
import ReportCountConverterInputPort
    from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";

export default class BallReportCountConverter implements ReportCountConverterInputPort{
    maliciousBallResDto: MaliciousBallResDto;

    constructor(maliciousBallResDto: MaliciousBallResDto) {
        this.maliciousBallResDto = maliciousBallResDto;
    }

    getMaliciousReportCountDto(): MaliciousReportCountDto {
        const maliciousReportCountDto = new MaliciousReportCountDto();
        maliciousReportCountDto.abuse = this.maliciousBallResDto.abuse;
        maliciousReportCountDto.advertising = this.maliciousBallResDto.advertising;
        maliciousReportCountDto.crime = this.maliciousBallResDto.crime;
        maliciousReportCountDto.etc = this.maliciousBallResDto.etc;
        maliciousReportCountDto.privacy = this.maliciousBallResDto.privacy;
        maliciousReportCountDto.sexual = this.maliciousBallResDto.sexual;
        maliciousReportCountDto.totalNumberReports = this.maliciousBallResDto.totalNumberReports;
        return maliciousReportCountDto;
    }
}

import MaliciousReportCountDto from "@/ManagerBis/Malicious/Dto/MaliciousReportCountDto";
import {injectable} from "inversify";
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/Ball/MaliciousBallResDto";

export default interface ReportCountConverterInputPort {
    getMaliciousReportCountDto(): MaliciousReportCountDto;
}



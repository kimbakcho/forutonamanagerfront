<template>
  <div>
    <div class="d-flex justify-space-between ma-4
    MaliciousReportCountBorder" >
      <div >
        총 신고 횟수
      </div>
      <div >
        {{ totalNumberReports }}
      </div>
    </div>
    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        범죄 또는 이름 조장
      </div>
      <div>
        {{ crime }}
      </div>
    </div>
    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        욕설,차별,사칭 등 타인에 대한 위협 및 피해
      </div>
      <div>
        {{ abuse }}
      </div>
    </div>
    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        사생활 침해,개인정보 노출
      </div>
      <div>
        {{ privacy }}
      </div>
    </div>
    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        성적인 메세지
      </div>
      <div>
        {{ sexual }}
      </div>
    </div>

    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        광고성 메시지
      </div>
      <div>
        {{ advertising }}
      </div>
    </div>

    <div class="d-flex justify-space-between ma-4 MaliciousReportCountBorder">
      <div>
        기타
      </div>
      <div>
        {{ etc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import MaliciousReportCountDto from "@/ManagerBis/Malicious/Dto/MaliciousReportCountDto";
// eslint-disable-next-line no-unused-vars
import ReportCountConverterInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";

@Component
export default class MaliciousReportCount extends Vue {

  @Prop()
  reportCountConverterInputPort!: ReportCountConverterInputPort;

  maliciousReportCountDto: MaliciousReportCountDto = new MaliciousReportCountDto();

  created() {
    this.maliciousReportCountDto = this.reportCountConverterInputPort.getMaliciousReportCountDto();
  }

  get totalNumberReports(): Number {
    return this.maliciousReportCountDto.totalNumberReports;
  }

  get crime(): Number {
    return this.maliciousReportCountDto.crime
  }

  get abuse(): Number {
    return this.maliciousReportCountDto.abuse;
  }

  get privacy(): Number {
    return this.maliciousReportCountDto.privacy
  }

  get sexual(): Number {
    return this.maliciousReportCountDto.sexual
  }

  get advertising(): Number {
    return this.maliciousReportCountDto.advertising
  }

  get etc(): Number {
    return this.maliciousReportCountDto.etc
  }
}
</script>

<style scoped>
.MaliciousReportCountBorder{
  border: black 1px solid;
}
</style>
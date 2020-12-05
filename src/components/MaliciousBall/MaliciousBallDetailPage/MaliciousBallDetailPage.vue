<template>
  <div>
    <div class="title ml-4 mt-4">
      신고 상세 - Ball 컨텐츠
    </div>
    <v-row v-if="initLoad">
      <v-col cols="6">
        <FBallDetailComponent :ball-uuid="ballUuid">

        </FBallDetailComponent>
      </v-col>
      <v-col cols="6">
        <MaliciousReportCount :reportCountConverterInputPort="reportCountConverterInputPort">

        </MaliciousReportCount>
        <div class="d-flex justify-end">
          <MaliciousJudgmentButton button-message="악성컨텐츠 판정"
                                   dialog-message="정말로 악성 컨텐츠로 판정하시겠습니까?"
                                   :idx="idx"
                                   malicious-judgement-type="MaliciousContent"
                                   class="mr-4"
          >
          </MaliciousJudgmentButton>

          <MaliciousJudgmentButton button-message="허위신고 판정"
                                   dialog-message="정말로 허위신고로 판정하시겠습니까?"
                                   :idx="idx"
                                   malicious-judgement-type="FalseReport"
                                   class="mr-4"
          >
          </MaliciousJudgmentButton>

        </div>

      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import FBallDetailComponent from "@/components/FBall/Detail/FBallDetailComponent.vue";
// eslint-disable-next-line no-unused-vars
import MaliciousBallUseCaseInputPort from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/MaliciousBallResDto";
import MaliciousReportCount from "@/components/MaliciousReportCount/MaliciousReportCount.vue";
// eslint-disable-next-line no-unused-vars
import ReportCountConverterInputPort
  , {BallReportCountConverter} from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";
import MaliciousJudgmentButton
  from "@/components/MaliciousBall/JudgmentButtons/MaliciousContent/MaliciousJudgmentButton.vue";


@Component({
  components: {
    FBallDetailComponent,
    MaliciousReportCount,
    MaliciousJudgmentButton
  }
})
export default class MaliciousBallDetailPage extends Vue {
  @Prop(Number)
  idx!: Number;

  initLoad: Boolean = false;

  maliciousBallResDto: MaliciousBallResDto = new MaliciousBallResDto();

  private reportCountConverterInputPort!: ReportCountConverterInputPort;

  private _maliciousBallUseCaseInputPort!: MaliciousBallUseCaseInputPort;


  created() {
    this._maliciousBallUseCaseInputPort = myContainer.get<MaliciousBallUseCaseInputPort>(TYPES.MaliciousBallUseCaseInputPort);

  }

  async mounted() {
    this.maliciousBallResDto = await this._maliciousBallUseCaseInputPort.getMaliciousBall(this.idx);
    this.reportCountConverterInputPort = new BallReportCountConverter(this.maliciousBallResDto);
    this.initLoad = true;
  }

  get ballUuid(): String {
    return this.maliciousBallResDto.ballUuid;
  }

}
</script>

<style scoped>

</style>
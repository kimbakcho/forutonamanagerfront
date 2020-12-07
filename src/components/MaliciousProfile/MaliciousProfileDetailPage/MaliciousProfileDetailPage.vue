<template>
  <div>
    <div class="title ml-4 mt-4">
      신고 상세 - Ball 컨텐츠
    </div>
    <v-row v-if="initLoad">
      <v-col cols="6">
        <FUserInfoDetailComponent :uid="detailUser">

        </FUserInfoDetailComponent>
      </v-col>
      <v-col cols="6">
        <MaliciousReportCount :reportCountConverterInputPort="reportCountConverterInputPort">

        </MaliciousReportCount>
        <div class="d-flex justify-end">
          <MaliciousJudgmentButton button-message="악성컨텐츠 판정"
                                   dialog-message="정말로 악성 컨텐츠로 판정하시겠습니까?"
                                   :idx="idx"
                                   :maliciousJudgementUseCaseInputPort = "maliciousProfileContentJudgementInputPort"
                                   class="mr-4"
          >
          </MaliciousJudgmentButton>

          <MaliciousJudgmentButton button-message="허위신고 판정"
                                   dialog-message="정말로 허위신고로 판정하시겠습니까?"
                                   :idx="idx"
                                   :maliciousJudgementUseCaseInputPort = "maliciousProfileFalseReportJudgementInputPort"
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
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";

import myContainer from "@/inversify.config";
// eslint-disable-next-line no-unused-vars
import MaliciousProfileUseCaseInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileUseCaseInputPort";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import FUserInfoUseCaseInputPort from "@/ManagerBis/FUserInfo/Domain/UseCase/FUserInfoUseCaseInputPort";
import MaliciousReportCount from "@/components/MaliciousReportCount/MaliciousReportCount.vue";
import MaliciousJudgmentButton from "@/components/Malicious/JudgmentButtons/MaliciousJudgmentButton.vue";

// eslint-disable-next-line no-unused-vars
import ReportCountConverterInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";
import ProfileReportCountConverter from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ProfileReportCountConverter";
// eslint-disable-next-line no-unused-vars
import MaliciousJudgementUseCaseInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";

import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";
// eslint-disable-next-line no-unused-vars
import MaliciousProfileJudgementUseCaseFactory
  from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileJudgementUseCaseFactory";
import FUserInfoDetailComponent from "@/components/FUserInfo/Detail/FUserInfoDetailComponent.vue";

@Component({
  components:{
    MaliciousReportCount,MaliciousJudgmentButton,FUserInfoDetailComponent
  }
})
export default class MaliciousProfileDetailPage extends Vue {

  @Prop(Number)
  idx!: Number;

  private initLoad: Boolean = false;

  private maliciousProfileResDto: MaliciousProfileResDto = new MaliciousProfileResDto();

  private maliciousProfileUseCaseInputPort!: MaliciousProfileUseCaseInputPort;

  private reportCountConverterInputPort!: ReportCountConverterInputPort;

  private maliciousProfileContentJudgementInputPort!: MaliciousJudgementUseCaseInputPort<MaliciousProfileResDto>;

  private maliciousProfileFalseReportJudgementInputPort!: MaliciousJudgementUseCaseInputPort<MaliciousProfileResDto>;

  private maliciousProfileJudgementUseCaseFactory!: MaliciousProfileJudgementUseCaseFactory;

  created(){
    this.maliciousProfileUseCaseInputPort = myContainer
        .get<MaliciousProfileUseCaseInputPort>(TYPES.MaliciousProfileUseCaseInputPort);

    this.maliciousProfileJudgementUseCaseFactory = myContainer
        .get<MaliciousProfileJudgementUseCaseFactory>(TYPES.MaliciousProfileJudgementUseCaseFactory)
    this.maliciousProfileContentJudgementInputPort = this.maliciousProfileJudgementUseCaseFactory
        .getInstance(MaliciousJudgementType.MaliciousContent, this.idx);
    this.maliciousProfileFalseReportJudgementInputPort = this.maliciousProfileJudgementUseCaseFactory
        .getInstance(MaliciousJudgementType.FalseReport, this.idx);

  }

  async mounted(){
    this.maliciousProfileResDto = await this.maliciousProfileUseCaseInputPort.getMaliciousProfile(this.idx);
    this.reportCountConverterInputPort = new ProfileReportCountConverter(this.maliciousProfileResDto);
    this.initLoad = true;
  }

  get detailUser(): String {
    return this.maliciousProfileResDto.uid;
  }

}
</script>

<style scoped>

</style>
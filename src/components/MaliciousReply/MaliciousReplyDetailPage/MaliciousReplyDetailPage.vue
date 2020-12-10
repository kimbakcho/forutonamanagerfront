<template>
  <div>
    <div class="title ml-4 mt-4">
      신고 상세 - Ball 댓글
    </div>
    <v-row v-if="initLoad">
      <v-col cols="6">
        <FBallReplyDetailComponent :replyUuid="replyUuid">

        </FBallReplyDetailComponent>
      </v-col>
      <v-col cols="6">
        <MaliciousReportCount :reportCountConverterInputPort="reportCountConverterInputPort">

        </MaliciousReportCount>
        <div class="d-flex justify-end">
          <MaliciousJudgmentButton button-message="악성컨텐츠 판정"
                                   dialog-message="정말로 악성 컨텐츠로 판정하시겠습니까?"
                                   :idx="idx"
                                   :maliciousJudgementUseCaseInputPort = "maliciousReplyContentJudgementInputPort"
                                   class="mr-4"
          >
          </MaliciousJudgmentButton>

          <MaliciousJudgmentButton button-message="허위신고 판정"
                                   dialog-message="정말로 허위신고로 판정하시겠습니까?"
                                   :idx="idx"
                                   :maliciousJudgementUseCaseInputPort = "maliciousReplyFalseReportJudgementInputPort"
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
import FBallReplyDetailComponent from "@/components/FBallReply/Detail/FBallReplyDetailComponent.vue";
import MaliciousReplyResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyResDto";

import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import MaliciousReplyUseCaseInputPort from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyUseCaseInputPort";
import ReplyReportCountConverter from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReplyReportCountConverter";
import ReportCountConverterInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/ReportCount/ReportCountConverterInputPort";
import MaliciousJudgmentButton from "@/components/Malicious/JudgmentButtons/MaliciousJudgmentButton.vue";
import MaliciousReportCount from "@/components/MaliciousReportCount/MaliciousReportCount.vue";
import MaliciousJudgementUseCaseInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";
import MaliciousReplyJudgementUseCaseFactory
  from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyJudgementUseCaseFactory";
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

@Component({
  components:{
    FBallReplyDetailComponent,MaliciousJudgmentButton,MaliciousReportCount
  }
})
export default class MaliciousReplyDetailPage extends Vue {

  @Prop(Number)
  idx!: Number;

  private initLoad: Boolean = false;

  private maliciousReplyResDto = new MaliciousReplyResDto();

  private maliciousReplyUseCaseInputPort!: MaliciousReplyUseCaseInputPort;

  private reportCountConverterInputPort!: ReportCountConverterInputPort;

  private maliciousReplyJudgementUseCaseFactory!: MaliciousReplyJudgementUseCaseFactory;

  private maliciousReplyContentJudgementInputPort!: MaliciousJudgementUseCaseInputPort<MaliciousReplyResDto>;

  private maliciousReplyFalseReportJudgementInputPort!: MaliciousJudgementUseCaseInputPort<MaliciousReplyResDto>;

  created(){
    this.maliciousReplyUseCaseInputPort = myContainer.get<MaliciousReplyUseCaseInputPort>(TYPES.MaliciousReplyUseCaseInputPort);
    this.maliciousReplyJudgementUseCaseFactory = myContainer.get<MaliciousReplyJudgementUseCaseFactory>(TYPES.MaliciousReplyJudgementUseCaseFactory);
  }

  async mounted(){

    this.maliciousReplyResDto = await this.maliciousReplyUseCaseInputPort.getMaliciousReply(this.idx);
    this.reportCountConverterInputPort = new ReplyReportCountConverter(this.maliciousReplyResDto);
    this.maliciousReplyContentJudgementInputPort= this.maliciousReplyJudgementUseCaseFactory.getInstance(MaliciousJudgementType.MaliciousContent, this.idx);
    this.maliciousReplyFalseReportJudgementInputPort = this.maliciousReplyJudgementUseCaseFactory.getInstance(MaliciousJudgementType.FalseReport, this.idx);

    this.initLoad = true;
  }

  get replyUuid(): String {
    return this.maliciousReplyResDto.replyUuid;
  }


}
</script>

<style scoped>

</style>
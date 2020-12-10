<template>
  <div>
    <div v-if="isLoaded">
      <div >
        <v-textarea :value="replyText" readonly label="댓글 내용">
        </v-textarea>
      </div>
      <div>
        <v-text-field :value="replyBallUuid" readonly label="Ball 고유 번호">

        </v-text-field>
        <v-text-field :value="replyBallName" readonly label="ball 이름">

        </v-text-field>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import FBallReplyUseCaseInputPort from "@/ManagerBis/FBallReply/Domain/UseCase/FBallReplyUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import FBallReplyResDto from "@/ManagerBis/FBallReply/Dto/FBallReplyResDto";

@Component
export default class FBallReplyDetailComponent extends Vue {

  @Prop(String)
  replyUuid!: string;

  private fBallReplyUseCaseInputPort!: FBallReplyUseCaseInputPort;

  fBallReplyResDto = new FBallReplyResDto();

  isLoaded = false;

  created(){
    this.fBallReplyUseCaseInputPort = myContainer.get<FBallReplyUseCaseInputPort>(TYPES.FBallReplyUseCaseInputPort);
  }

  async mounted(){
    this.fBallReplyResDto = await this.fBallReplyUseCaseInputPort.getItem(this.replyUuid);
    this.isLoaded = true;
  }

  get replyText(): String {
    return this.fBallReplyResDto.replyText;
  }

  get replyBallUuid(): String {
    return  this.fBallReplyResDto.ballUuid.ballUuid;
  }

  get replyBallName(): String {
    return this.fBallReplyResDto.ballUuid.ballName;
  }

}
</script>

<style scoped>

</style>
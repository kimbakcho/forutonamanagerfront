<template>
  <div>
    <v-btn color="primary" @click="onJudgment">
      {{ buttonMessage }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="300">
      <v-card >
        <v-card-text>
          {{ dialogMessage }}
        </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-end">
            <div>
              <v-btn @click="onJudgmentConfirm()">
                예
              </v-btn>
            </div>
            <div>
              <v-btn @click="onJudgmentCancel()">
                아니요
              </v-btn>
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import MaliciousBallUseCaseInputPort from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import {MaliciousJudgementType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousJudgementType";

@Component
export default class MaliciousJudgmentButton extends Vue {
  @Prop(Number)
  idx!: Number;

  @Prop()
  maliciousJudgementType!: MaliciousJudgementType;

  @Prop(String)
  dialogMessage!: String;

  @Prop(String)
  buttonMessage!: String

  dialog:Boolean = false;

  maliciousBallUseCaseInputPort!:MaliciousBallUseCaseInputPort;

  created(){
    this.maliciousBallUseCaseInputPort = myContainer.get<MaliciousBallUseCaseInputPort>(TYPES.MaliciousBallUseCaseInputPort);
  }

  async onJudgment(){
    this.dialog = true;
  }

  async onJudgmentConfirm(){
    console.log("onJudgmentConfirm")
    await this.maliciousBallUseCaseInputPort.updateJudgement(this.idx,this.maliciousJudgementType);
    this.dialog = false;
  }
  onJudgmentCancel(){
    this.dialog = false;
  }

}
</script>

<style scoped>

</style>
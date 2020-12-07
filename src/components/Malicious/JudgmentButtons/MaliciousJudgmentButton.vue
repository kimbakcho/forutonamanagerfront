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
import MaliciousJudgementUseCaseInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/Judgement/MaliciousJudgementUseCaseInputPort";

@Component
export default class MaliciousJudgmentButton extends Vue {
  @Prop(Number)
  idx!: Number;

  @Prop(String)
  dialogMessage!: String;

  @Prop(String)
  buttonMessage!: String

  @Prop()
  maliciousJudgementUseCaseInputPort!: MaliciousJudgementUseCaseInputPort<any>;

  dialog:Boolean = false;


  async onJudgment(){
    this.dialog = true;
  }

  async onJudgmentConfirm(){
    console.log("onJudgmentConfirm")
    await this.maliciousJudgementUseCaseInputPort.judgement();
    this.dialog = false;
  }
  onJudgmentCancel(){
    this.dialog = false;
  }

}
</script>

<style scoped>

</style>
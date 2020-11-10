<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <div class="title">
        {{ getTermsName() }}
      </div>
      <v-btn @click="onModify">
        수정하기
      </v-btn>
    </div>
    <div class="mt-3">
      <QuillBasicEditor v-model="content">

      </QuillBasicEditor>
    </div>
    <ModifyDialog ref="modifyDialog" @confirm="onConfirm">

    </ModifyDialog>
    <ModifyConfirmDialog ref="modifyConfirmDialog">

    </ModifyConfirmDialog>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import QuillBasicEditor from "@/components/WYSIWYGEditor/QuillBasicEditor.vue";
// eslint-disable-next-line no-unused-vars
import TermsConditionsUseCaseInputPort
  from "@/ManagerBis/TermsConditions/Domain/UseCase/TermsConditionsUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import TermsConditionsResDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsResDto";
import ModifyDialog from "@/components/TermsConditions/ModifyDialog.vue";
import ModifyConfirmDialog from "@/components/TermsConditions/ModifyConfirmDialog.vue";
// eslint-disable-next-line no-unused-vars
import ModifyDialogInputPort from "@/components/TermsConditions/ModifyDialogInputPort";
// eslint-disable-next-line no-unused-vars
import ModifyConfirmDialogInputPort from "@/components/TermsConditions/ModifyConfirmDialogInputPort";
import TermsConditionsUpdateDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsUpdateDto";

@Component({
  components: {
    QuillBasicEditor,
    ModifyDialog,
    ModifyConfirmDialog
  }
})
export default class TermsConditionView extends Vue {
  @Prop(String)
  termsIdx!: string;

  @Ref("modifyDialog")
  modifyDialog!: ModifyDialogInputPort;

  @Ref("modifyConfirmDialog")
  modifyConfirmDialog!: ModifyConfirmDialogInputPort;

  _termsConditionsUseCaseInputPort!: TermsConditionsUseCaseInputPort;

  _termsConditionsResDto?: TermsConditionsResDto;

  content: string = "";

  created(){
    this._termsConditionsUseCaseInputPort = myContainer.get<TermsConditionsUseCaseInputPort>(TYPES.TermsConditionsUseCaseInputPort);
  }

  async mounted() {
      this._termsConditionsResDto = await this._termsConditionsUseCaseInputPort.getTermsConditions(Number(this.termsIdx));
      this.content = this._termsConditionsResDto.termsContent;
      this.$forceUpdate();
  }

  getTermsName(): string{
    if(this._termsConditionsResDto == undefined){
      return "";
    }else {
      return this._termsConditionsResDto.termsName
    }

  }

  async onConfirm() {
    const termsConditionsUpdateDto = new TermsConditionsUpdateDto();
    termsConditionsUpdateDto.idx = Number(this.termsIdx);
    termsConditionsUpdateDto.termsContent = this.content;
    if(this._termsConditionsResDto !== undefined){
      termsConditionsUpdateDto.termsName = this._termsConditionsResDto.termsName;
    }else {
      throw Error("termsConditionsResDto not recv error")
    }
    await this._termsConditionsUseCaseInputPort.updateTermsConditions(termsConditionsUpdateDto);
    this.modifyConfirmDialog.openDialog();
  }

  onModify(){
    this.modifyDialog.openDialog();
  }


}
</script>

<style scoped>

</style>
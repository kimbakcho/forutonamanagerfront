<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <div>
        {{ getTermsName() }}
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import QuillBasicEditor from "@/components/WYSIWYGEditor/QuillBasicEditor.vue";
// eslint-disable-next-line no-unused-vars
import TermsConditionsUseCaseInputPort
  from "@/ManagerBis/TermsConditions/Domain/UseCase/TermsConditionsUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import TermsConditionsResDto from "@/ManagerBis/TermsConditions/Dto/TermsConditionsResDto";

@Component({
  components: {
    QuillBasicEditor
  }
})
export default class TermsConditionView extends Vue {
  @Prop(Number)
  termsIdx!: number;

  _termsConditionsUseCaseInputPort!: TermsConditionsUseCaseInputPort;

  termsConditionsResDto!: TermsConditionsResDto;

  created(){
    this._termsConditionsUseCaseInputPort = myContainer.get<TermsConditionsUseCaseInputPort>(TYPES.TermsConditionsUseCaseInputPort);
  }

  async mounted() {
      this.termsConditionsResDto = await this._termsConditionsUseCaseInputPort.getTermsConditions(this.termsIdx);

      this.$forceUpdate();
  }

  getTermsName(): string{
    return this.termsConditionsResDto.termsName
  }


}
</script>

<style scoped>

</style>
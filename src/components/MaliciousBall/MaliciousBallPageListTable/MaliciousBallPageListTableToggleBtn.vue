<template>
  <div>
    <div class="ma-4">
      <v-btn-toggle
          borderless
          v-model="toggleValue"
      >
        <v-btn value="BEFORE_JUDGMENT">
          판정 전 ({{ getBeforeJudgementCount() }})
        </v-btn>

        <v-btn value="MALICIOUS_CONTENT">
          악성 컨텐츠
        </v-btn>

        <v-btn value="FALSE_REPORT">
          허위 신고
        </v-btn>

      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import MaliciousBallPageListTableStatue
  from "@/components/MaliciousBall/MaliciousBallPageListTable/MaliciousBallPageListTableStatue";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import {MaliciousBallSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousBallSearchType";


@Component
export default class MaliciousBallPageListTableToggleBtn extends Vue {

  _maliciousBallPageListTableStatue!: MaliciousBallPageListTableStatue;

  created() {
    this._maliciousBallPageListTableStatue = myContainer.get<MaliciousBallPageListTableStatue>(TYPES.MaliciousBallPageListTableStatue);
  }

  get toggleValue(): MaliciousBallSearchType {
    return this._maliciousBallPageListTableStatue.searchType;
  }

  set toggleValue(value: MaliciousBallSearchType) {
    this._maliciousBallPageListTableStatue.searchType = value;
    this.changeToggle(value);
  }

  getBeforeJudgementCount(){
    return this._maliciousBallPageListTableStatue.beforeJudgementCount;
  }

  @Emit("changeToggle")
  changeToggle(value: MaliciousBallSearchType){
    return value;
  }

}
</script>

<style scoped>

</style>
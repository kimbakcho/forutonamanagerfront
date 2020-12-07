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
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
// eslint-disable-next-line no-unused-vars
import MaliciousPageListTableStatus from "@/components/Malicious/Table/MaliciousPageListTableStatus";


@Component
export default class MaliciousPageListTableToggleBtn extends Vue {

  @Prop()
  maliciousPageListTableStatus!: MaliciousPageListTableStatus;

  get toggleValue(): MaliciousSearchType {
    return this.maliciousPageListTableStatus.searchType;
  }

  set toggleValue(value: MaliciousSearchType) {
    this.maliciousPageListTableStatus.searchType = value;
    this.changeToggle(value);
  }


  getBeforeJudgementCount(){
    return this.maliciousPageListTableStatus.beforeJudgementCount;
  }

  @Emit("changeToggle")
  changeToggle(value: MaliciousSearchType){
    return value;
  }

}
</script>

<style scoped>

</style>
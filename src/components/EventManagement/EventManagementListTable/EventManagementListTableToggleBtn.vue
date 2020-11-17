<template>
  <div class="ma-4">
    <v-btn-toggle
        borderless
        v-model="toggleValue"
    >
      <v-btn value="ALL">
        전체
      </v-btn>

      <v-btn value="BEFORE">
        진행 전
      </v-btn>

      <v-btn value="PLAY">
        진행중
      </v-btn>

      <v-btn value="END">
        종료
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import EventManagementListTableStatue
  from "@/components/EventManagement/EventManagementListTable/EventManagementListTableStatue";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";

@Component
export default class EventManagementListTableToggleBtn extends Vue {

  _eventManagementListTableStatue!: EventManagementListTableStatue;

  created() {
    this._eventManagementListTableStatue = myContainer.get<EventManagementListTableStatue>(TYPES.EventManagementListTableStatue);
  }

  get toggleValue(): EventSearchType {
    return this._eventManagementListTableStatue.eventSearchType;
  }

  set toggleValue(value: EventSearchType) {
    this._eventManagementListTableStatue.eventSearchType = value;
    this.changeToggle(value);
  }

  @Emit("changeToggle")
  changeToggle(value: EventSearchType){
    return value;
  }
}
</script>

<style scoped>

</style>
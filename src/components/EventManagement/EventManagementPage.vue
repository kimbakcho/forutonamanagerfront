<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="title ma-4">
        이벤트 관리
      </div>
      <div>
        <v-btn class="ma-4" color="primary" to="Doc">
          새 이벤트
        </v-btn>
      </div>
    </div>
    <EventManagementListTable>

    </EventManagementListTable>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import EventManagementListTable from "@/components/EventManagement/EventManagementListTable/EventManagementListTable.vue";

@Component({
  components:{
    EventManagementListTable
  }
})
export default class EventManagementPage extends Vue {

}
</script>

<style scoped>

</style>
<template>
  <div>
    <div class="title">
      Ball 컨텐츠 신고관리
    </div>
    <div>
      <MaliciousBallPageListTable>

      </MaliciousBallPageListTable>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousBallPageListTable
  from "@/components/MaliciousBall/MaliciousBallPageListTable/MaliciousBallPageListTable.vue";

@Component({
  components:{
    MaliciousBallPageListTable
  }
})
export default class MaliciousBallPage extends Vue {

}
</script>

<style scoped>

</style>
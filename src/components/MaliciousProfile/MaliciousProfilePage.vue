<template>
  <div>
    <div class="title">
      Profile 신고관리
    </div>
    <div>
      <MaliciousProfilePageListTable>

      </MaliciousProfilePageListTable>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousProfilePageListTable
  from "@/components/MaliciousProfile/MaliciousProfilePageListTable/MaliciousProfilePageListTable.vue";

@Component({
  components:{
    MaliciousProfilePageListTable
  }
})
export default class MaliciousProfilePage extends Vue {

}
</script>

<style scoped>

</style>
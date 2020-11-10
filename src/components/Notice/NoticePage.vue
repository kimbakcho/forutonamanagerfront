<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="title ma-4">
        공지 사항
      </div>
      <v-btn class="ma-4 title" color="primary" to="Doc">
        새 공지사항
      </v-btn>
    </div>
    <div class="table ma-4" >
      <NoticeListTable>

      </NoticeListTable>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NoticeListTable from "@/components/Notice/NoticeListTable.vue";

@Component({
  components:{
    NoticeListTable
  }
})
export default class NoticePage extends Vue {

}
</script>

<style scoped>

</style>
<template>
  <div>
    <div class="title">
      댓글 신고관리
    </div>
    <div>
      <MaliciousReplyPageListTable>

      </MaliciousReplyPageListTable>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousReplyPageListTable
  from "@/components/MaliciousReply/MaliciousReplyPageListTable/MaliciousReplyPageListTable.vue";

@Component(
    {
      components:{
        MaliciousReplyPageListTable
      }
    }
)
export default class MaliciousReplyPage extends Vue {

}
</script>

<style scoped>

</style>
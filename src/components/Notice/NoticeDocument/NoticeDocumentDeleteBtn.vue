<template>
  <div>
    <v-btn color="secondary" @click="dialogFlag = true">
      삭제 하기
    </v-btn>
    <v-dialog max-width="400" v-model="dialogFlag">
      <v-card>
        <v-card-text class="title pa-4">
          정말로 삭제 하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogFlag = false">
            아니요
          </v-btn>
          <v-btn @click="deleteConfirm" color="primary">
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class NoticeDocumentDeleteBtn extends Vue {
  dialogFlag = false;

  @Emit("deleteConfirm")
  deleteConfirm(){

  }

}
</script>

<style scoped>

</style>
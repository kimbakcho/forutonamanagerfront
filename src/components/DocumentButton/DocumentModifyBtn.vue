<template>
  <div>
    <v-btn color="primary" @click="dialogFlag = true">
      수정 하기
    </v-btn>
    <v-dialog max-width="400" v-model="dialogFlag">
      <v-card>
        <v-card-text class="title pa-4">
          정말로 수정 하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogFlag = false">
            아니요
          </v-btn>
          <v-btn @click="modifyConfirm" color="primary">
            수정
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class DocumentModifyBtn extends Vue {
  dialogFlag = false;

  @Emit("modifyConfirm")
  modifyConfirm(){

  }
}
</script>

<style scoped>

</style>
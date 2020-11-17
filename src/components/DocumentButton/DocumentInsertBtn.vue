<template>
  <div>
    <v-btn class="title" color="primary" @click="dialogFlag = true">
      등록 하기
    </v-btn>
    <v-dialog max-width="400" v-model="dialogFlag">
      <v-card>
        <v-card-text class="title pa-4">
          정말로 등록 하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogFlag = false">
            아니요
          </v-btn>
          <v-btn @click="insertConfirm" color="primary">
            등록
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class DocumentInsertBtn extends Vue {
  dialogFlag = false;

  @Emit("insertConfirm")
  insertConfirm(): void{
    return ;
  }
}
</script>

<style scoped>

</style>
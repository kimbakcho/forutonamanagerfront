<template>
  <div>
    <v-dialog max-width="400" v-model="dialog">
      <v-card>
        <v-card-text class="title pa-4">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="confirm">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import DocumentConfirmDialogInputPort
  from "@/components/DocumentDialog/DocumentConfirmDialogInputPort";

@Component
export default class DocumentConfirmDialog  extends Vue implements DocumentConfirmDialogInputPort{

  message = "";

  dialog= false

  @Emit("confirm")
  confirm(){

  }

  openDialog(message: string): void {
    this.message = message;
    this.dialog = true;
  }
}
</script>

<style scoped>

</style>
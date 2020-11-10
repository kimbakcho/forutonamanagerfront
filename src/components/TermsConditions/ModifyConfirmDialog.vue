<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          수정 하였습니다.
        </v-card-text>
        <v-card-actions>
          <v-btn @click="onConfirm">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import ModifyConfirmDialogInputPort from "@/components/TermsConditions/ModifyConfirmDialogInputPort";

@Component
export default class ModifyConfirmDialog extends Vue implements  ModifyConfirmDialogInputPort{
  dialog = false;

  openDialog(): void {
    this.dialog = true
  }

  closeDialog(): void {
    this.dialog = false;
  }

  onConfirm(){
    this.closeDialog();
  }

}
</script>

<style scoped>

</style>
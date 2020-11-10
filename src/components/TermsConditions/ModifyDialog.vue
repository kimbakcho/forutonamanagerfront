<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          정말로 수정 하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">
            아니요
          </v-btn>
          <v-btn @click="onConfirm">
            등록
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import ModifyDialogInputPort from "@/components/TermsConditions/ModifyDialogInputPort";

@Component
export default class ModifyDialog extends Vue implements ModifyDialogInputPort {

  dialog = false;

  openDialog(): void {
    this.dialog = true
  }

  closeDialog(): void {
    this.dialog = false;
  }

  onConfirm() {
    this.closeDialog();
    this._emitConfirm();
  }

  @Emit("confirm")
  _emitConfirm() {
    this.$emit("confirm");
  }

}
</script>

<style scoped>

</style>
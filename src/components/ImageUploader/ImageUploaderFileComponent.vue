<template>
  <div>
    <v-form ref="ImageUploadForm">
      <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          :placeholder="placeholder"
          prepend-icon="mdi-camera"
          :label="label"
          @change="onChangeImages"

      ></v-file-input>
    </v-form>
      <v-img id="imageDiv"
             contain
             v-if="hasImage()" :src="imageUrl"
      ></v-img>
      <div v-else id="emptyDiv" class="d-flex align-center justify-center">
        <div>
          이미지 업로드가 필요 합니다.
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn class="ma-4" color="primary" @click="deleteImageFile">
          삭제
        </v-btn>
      </div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import ImageUploaderFileComponentInputPort from "@/components/ImageUploader/ImageUploaderFileComponentInputPort";

@Component
export default class ImageUploaderFileComponent extends Vue implements ImageUploaderFileComponentInputPort {

  @Prop(String)
  previewImageUrl?: string;

  @Prop(String)
  label!: string;

  @Prop(String)
  placeholder!: string;

  @Ref("ImageUploadForm")
  imageUploadForm!: HTMLFormElement;

  imageUrl?: string = "";

  currentFile?: File;

  deleteFlag = false;

  deleteFileUrl?: string;


  created() {
    if (this.previewImageUrl != undefined) {
      this.imageUrl = this.previewImageUrl;
    }
  }

  hasImage(): boolean {
    if (this.imageUrl != undefined && this.imageUrl.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  rules = [
    (value: any) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
  ]

  onChangeImages(e: File|undefined) {
    this.currentFile = e
    if(this.currentFile != undefined){
      this.imageUrl = URL.createObjectURL(this.currentFile);
      if(this.previewImageUrl != undefined){
        this.deleteFileUrl = this.previewImageUrl;
        this.deleteFlag = true;
      }
    }
  }

  getFile(): File | undefined{
    return this.currentFile;
  }

  hasFile(): boolean {
    if (this.currentFile != undefined) {
      return true;
    } else {
      return false;
    }
  }

  deleteImageFile() {
    this.currentFile = undefined;
    this.imageUrl = undefined;
    if(this.previewImageUrl != undefined){
      this.deleteFileUrl = this.previewImageUrl;
      this.deleteFlag = true;
    }
    this.imageUploadForm.reset();
    this.$forceUpdate();
  }

}
</script>

<style scoped>
#emptyDiv {
  width: 100%;
  height: 100%;
  border: black solid 1px;
}

#imageDiv {
  width: 100%;
  height: 100%;
  border: black solid 1px;
}
</style>
<template>
  <div>
    <div>
      <v-file-input  @change="onChangeFile" :label="label">

      </v-file-input>
    </div>
    <div v-if="hasDownLoadFile()" class="d-flex">
      <a download :href="downLoadFile" target="_blank" >webViewFile</a>
      <v-btn @click="deleteFile">
        삭제
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import SingleFileUploadInputPort from "@/components/SingleFileUpload/SingleFileUploadInputPort";

@Component
export default class SingleFileUpload extends Vue implements SingleFileUploadInputPort{

  @Prop(String)
  preDownLoadFile?: string

  @Prop(String)
  label?: string;

  downLoadFile = "";

  currentFile?: File;

  deleteFileUrl?: string;

  deleteFlag = false;


  created(){
    if(this.preDownLoadFile != undefined && this.preDownLoadFile.length > 0){
      this.downLoadFile = this.preDownLoadFile;
    }
  }

  onChangeFile(e: File|undefined){
    this.currentFile = e
  }

  hasFile(): boolean {
    if (this.currentFile != undefined) {
      return true;
    } else {
      return false;
    }
  }

  getFile(): File | undefined{
    return this.currentFile;
  }

  deleteFile(){
    this.downLoadFile = "";
    if(this.preDownLoadFile != undefined){
      this.deleteFileUrl = this.preDownLoadFile;
      this.deleteFlag = true;
    }
  }

  hasDownLoadFile(): boolean{
    if(this.downLoadFile != undefined && this.downLoadFile.length > 0){
      return true;
    }else {
      return false;
    }
  }

  @Watch("preDownLoadFile")
  watchPreDownLoadFile(value: string){
    if(value != undefined && value.length > 0){
      this.downLoadFile = value;
    }
  }

}
</script>

<style scoped>

</style>
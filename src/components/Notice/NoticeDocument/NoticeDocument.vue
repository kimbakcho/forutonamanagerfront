<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="ma-4 title">
        {{ isInsertMode() ? "공지사항 등록" : "공지사항 상세" }}
      </div>
      <div class="d-flex">
        <DocumentInsertBtn  class="ma-4" v-if="isInsertMode()" @insertConfirm="insertConfirm">

        </DocumentInsertBtn>

        <DocumentModifyBtn  class="ma-4" v-if="!isInsertMode()" @modifyConfirm="modifyConfirm">

        </DocumentModifyBtn>

        <DocumentDeleteBtn class="ma-4" v-if="!isInsertMode()" @deleteConfirm="deleteConfirm">

        </DocumentDeleteBtn>
      </div>
    </div>
    <div>
      <v-text-field class="ma-4" label="여기에 제목을 입력하세요" v-model="title">

      </v-text-field>
    </div>
    <div class="d-flex align-center">
      <div class="ml-4 mr-4">
        {{ "공개 상태" }}
      </div>
      <div>
        <v-btn-toggle v-model="openFlag">
          <v-btn :value="true">
            공개
          </v-btn>
          <v-btn :value="false">
            비공개
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <div class="ma-4">
      <QuillBasicEditor v-model="content">

      </QuillBasicEditor>
    </div>

    <DocumentConfirmDialog ref="ConfirmDialog" @confirm="onConfirm">

    </DocumentConfirmDialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import DocumentConfirmDialog
  from "@/components/DocumentDialog/DocumentConfirmDialog.vue";
import QuillBasicEditor from "@/components/WYSIWYGEditor/QuillBasicEditor.vue";
// eslint-disable-next-line no-unused-vars
import NoticeUseCaseInputPort from "@/ManagerBis/Notice/Domain/UseCase/NoticeUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import InsertNoticeReqDto from "@/ManagerBis/Notice/Dto/InsertNoticeReqDto";
// eslint-disable-next-line no-unused-vars
import DocumentConfirmDialogInputPort
  from "@/components/DocumentDialog/DocumentConfirmDialogInputPort";
import DocumentModifyBtn from "@/components/DocumentButton/DocumentModifyBtn.vue";
import DocumentDeleteBtn from "@/components/DocumentButton/DocumentDeleteBtn.vue";
import UpdateNoticeReqDto from "@/ManagerBis/Notice/Dto/UpdateNoticeReqDto";
import DocumentInsertBtn from "@/components/DocumentButton/DocumentInsertBtn.vue";

@Component(
    {
      components:{
        DocumentInsertBtn,
        DocumentModifyBtn,
        DocumentDeleteBtn,
        DocumentConfirmDialog,
        QuillBasicEditor,
      }
    }
)
export default class NoticeDocument extends Vue {
  @Prop(Number)
  idx!: number;

  @Ref("ConfirmDialog")
  noticeDocumentConfirmDialog!: DocumentConfirmDialogInputPort;

  title = "";
  content = "";
  openFlag = true;

  _noticeUseCaseInputPort!: NoticeUseCaseInputPort;

  created(){
    this._noticeUseCaseInputPort = myContainer.get<NoticeUseCaseInputPort>(TYPES.NoticeUseCaseInputPort);
  }

  mounted(){
    if(!this.isInsertMode()){
      this.getNotice(this.idx);
    }
  }
  async getNotice(idx: number):Promise<void>{
    const noticeResDto = await this._noticeUseCaseInputPort.getNotice(idx);
    this.title = noticeResDto.title;
    this.openFlag = noticeResDto.openFlag;
    this.content = noticeResDto.content;
    this.$forceUpdate();
  }

  isInsertMode() {
    return isNaN(this.idx);
  }

  async insertConfirm(): Promise<void>{
    const insertNoticeReqDto = new InsertNoticeReqDto();
    insertNoticeReqDto.title = this.title;
    insertNoticeReqDto.content = this.content;
    insertNoticeReqDto.openFlag = this.openFlag;
    await this._noticeUseCaseInputPort.insertNotice(insertNoticeReqDto);
    this.noticeDocumentConfirmDialog.openDialog("등록하였습니다.");
  }

  async modifyConfirm(): Promise<void>{
    if(this.isInsertMode()){
      throw new Error("idx is undefined that can't modify Notice")
    }
    const updateNoticeReqDto = new UpdateNoticeReqDto();
    updateNoticeReqDto.content = this.content;
    updateNoticeReqDto.idx = this.idx;
    updateNoticeReqDto.openFlag = this.openFlag;
    updateNoticeReqDto.title = this.title;
    await this._noticeUseCaseInputPort.updateNotice(updateNoticeReqDto);
    this.noticeDocumentConfirmDialog.openDialog("수정되었습니다.");
  }

  async deleteConfirm(): Promise<void>{
    if(this.isInsertMode()){
      throw new Error("idx is undefined can't delete Notice");
    }
    await this._noticeUseCaseInputPort.deleteNotice(this.idx);
    this.noticeDocumentConfirmDialog.openDialog("삭제되었습니다.");
  }

  onConfirm(){
    this.$router.back();
  }

}
</script>

<style scoped>

</style>
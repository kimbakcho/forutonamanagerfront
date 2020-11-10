<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="ma-4 title">
        {{ isInsertMode() ? "공지사항 등록" : "공지사항 상세" }}
      </div>
      <div class="d-flex">
        <NoticeDocumentInsertBtn  class="ma-4" v-if="isInsertMode()" @insertConfirm="insertConfirm">

        </NoticeDocumentInsertBtn>
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

    <NoticeDocumentConfirmDialog ref="ConfirmDialog" @confirm="onConfirm">

    </NoticeDocumentConfirmDialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import NoticeDocumentInsertBtn from "@/components/Notice/NoticeDocument/NoticeDocumentInsertBtn.vue";
import NoticeDocumentConfirmDialog
  from "@/components/Notice/NoticeDocument/NoticeDocumentConfirmDialog/NoticeDocumentConfirmDialog.vue";
import QuillBasicEditor from "@/components/WYSIWYGEditor/QuillBasicEditor.vue";
// eslint-disable-next-line no-unused-vars
import NoticeUseCaseInputPort from "@/ManagerBis/Notice/Domain/UseCase/NoticeUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import InsertNoticeReqDto from "@/ManagerBis/Notice/Dto/InsertNoticeReqDto";
// eslint-disable-next-line no-unused-vars
import NoticeDocumentConfirmDialogInputPort
  from "@/components/Notice/NoticeDocument/NoticeDocumentConfirmDialog/NoticeDocumentConfirmDialogInputPort";

@Component(
    {
      components:{
        NoticeDocumentInsertBtn,
        NoticeDocumentConfirmDialog,
        QuillBasicEditor
      }
    }
)
export default class NoticeDocument extends Vue {
  @Prop(Number)
  idx?: number;

  @Ref("ConfirmDialog")
  noticeDocumentConfirmDialog!: NoticeDocumentConfirmDialogInputPort;

  title = "";
  content = "";
  openFlag = true;

  _noticeUseCaseInputPort!: NoticeUseCaseInputPort;

  created(){
    this._noticeUseCaseInputPort = myContainer.get<NoticeUseCaseInputPort>(TYPES.NoticeUseCaseInputPort);
  }

  isInsertMode() {
    return this.idx == undefined
  }

  async insertConfirm(): Promise<void>{
    const insertNoticeReqDto = new InsertNoticeReqDto();
    insertNoticeReqDto.title = this.title;
    insertNoticeReqDto.content = this.content;
    insertNoticeReqDto.openFlag = this.openFlag;
    await this._noticeUseCaseInputPort.insertNotice(insertNoticeReqDto);
    this.noticeDocumentConfirmDialog.openDialog("등록하였습니다.");
  }

  onConfirm(){
    this.$router.back();
  }

}
</script>

<style scoped>

</style>
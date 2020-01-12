<template>
  <div class="NoticeWritePage">
    <v-col>
      <v-row justify="center">
        <v-col cols="11">
          <v-row class="d-flex mb-4">
            <div class="headline">공지사항 등록</div>
            <v-spacer></v-spacer>
            <v-dialog persistent v-model="registerflag" width="300" v-if="idx==null">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">등록하기</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-col>
                    <v-row class="title mt-4 mb-4">
                      <div>정말로 등록하겠습니까?</div>
                    </v-row>
                    <v-row justify="end">
                      <v-btn color="primary" @click="registerflag=false">아니요</v-btn>
                      <v-btn
                        class="ml-4"
                        :loading="registerdocloading"
                        @click="registerdoc"
                        color="primary"
                      >등록</v-btn>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog persistent v-model="modifyflag" width="300" v-if="idx!=null">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">수정</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-col>
                    <v-row class="title mt-4 mb-4">
                      <div>정말로 수정하시겠습니까?</div>
                    </v-row>
                    <v-row justify="end">
                      <v-btn color="primary" @click="modifyflag=false">아니요</v-btn>
                      <v-btn
                        class="ml-4"
                        :loading="modifyflagloading"
                        @click="onmodify"
                        color="primary"
                      >수정</v-btn>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog persistent v-model="deleteflag" width="300" v-if="idx!=null">
              <template v-slot:activator="{ on }">
                <v-btn class="ml-4" color="primary" v-on="on">삭제</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-col>
                    <v-row class="title mt-4 mb-4">
                      <div>정말로 삭제하시겠습니까?</div>
                    </v-row>
                    <v-row justify="end">
                      <v-btn color="primary" @click="deleteflag=false">아니요</v-btn>
                      <v-btn
                        class="ml-4"
                        :loading="deleteflagloading"
                        @click="ondelete"
                        color="primary"
                      >삭제</v-btn>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row>
            <v-text-field
              loading="contentloading"
              v-model="pageitem.pageName"
              label="여기에 제목을 입력 하세요."
            ></v-text-field>
          </v-row>
          <v-row>
            <VueEditor
              ref="vueeditor"
              v-model="pageitem.pageContent"
              :editorOptions="editorSettings"
            ></VueEditor>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog persistent v-model="registercheckdialog" width="300">
      <v-card>
        <v-card-text>
          <v-col>
            <v-row>등록하였습니다.</v-row>
            <v-row justify="end">
              <v-btn color="primary" @click="onregistercehck">확인</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="modifycheckdialog" width="300">
      <v-card>
        <v-card-text>
          <v-col>
            <v-row>수정 되었습니다.</v-row>
            <v-row justify="end">
              <v-btn color="primary" @click="onmodifycheck">확인</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="deletecheckdialog" width="300">
      <v-card>
        <v-card-text>
          <v-col>
            <v-row>삭제 되었습니다.</v-row>
            <v-row justify="end">
              <v-btn color="primary" @click="ondeletecheck">확인</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import {
  VueEditor,
  Quill,
  VueEditorConstructor,
  VueEditorData
} from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import { base64StringToBlob } from "blob-util";
import Noticepage from "@/components/NoticePage/Noticepage";
import globalstate from "../../store/modules/globalstate";
@Component({
  components: {
    VueEditor
  }
})
export default class NoticeDocPage extends Vue {
  @Ref("vueeditor") vueeditor!: VueEditorConstructor;

  @Prop(String) readonly idx!: string;

  contentloading = false;
  editorSettings: any = {
    modules: {
      imageDropAndPaste: {
        handler: this.imageHandler
      },
      imageResize: true
    },
    placeholder: "여기에 내용을 입력 하세요."
  };
  registerdocloading = false;
  modifyflag = false;
  modifyflagloading = false;
  pageitem: Noticepage = new Noticepage();

  registerflag = false;
  registercheckdialog = false;

  modifycheckdialog = false;

  deleteflag = false;
  deleteflagloading = false;
  deletecheckdialog = false;
  created() {
    Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
    Quill.register("modules/imageResize", ImageResize);
    this.init();
  }

  async init() {
    this.contentloading = true;
    if (this.idx != null) {
      this.pageitem.idx = Number(this.idx);
      this.pageitem = await Noticepage.getPageItem(this.pageitem);
    }
    this.contentloading = false;
  }
  mounted() {
    let quill = this.vueeditor.$data.quill;
  }
  imageHandler(imageDataUrl: any, type: any) {
    let quill = this.vueeditor.$data.quill;
    let range = quill.getSelection();
    if (range != null) {
      quill.insertEmbed(range.index, "image", imageDataUrl);
    }
  }
  async registerdoc() {
    this.registerdocloading = true;
    if (globalstate.Logininfo != null) {
      this.pageitem.pageWriter = globalstate.Logininfo.uid;
      await this.pageitem.writeNoiceDoc();
    }
    this.registerdocloading = false;
    this.registerflag = false;
    this.registercheckdialog = true;
  }
  onregistercehck() {
    this.registercheckdialog = false;
    this.$router.push("/notice/main");
  }
  async onmodify() {
    this.modifyflagloading = true;
    await this.pageitem.updatedoc();
    this.modifyflag = false;
    this.modifyflagloading = false;
    this.modifycheckdialog = true;
  }
  onmodifycheck() {
    this.modifycheckdialog = false;
    this.$router.push("/notice/main");
  }
  async ondelete() {
    this.deleteflagloading = true;
    await this.pageitem.deletedoc();
    this.deleteflagloading = false;
    this.deletecheckdialog = true;
  }
  ondeletecheck() {
    this.deletecheckdialog = false;
    this.$router.push("/notice/main");
  }
}
</script>

<style lang="scss">
.quillWrapper {
  width: 100%;
}
</style>

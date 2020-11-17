<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="title ma-4">
        {{ isInsertMode() ? "이벤트 등록" : "이벤트 상세" }}
      </div>
      <div class="d-flex">
        <DocumentInsertBtn class="ma-4" v-if="isInsertMode()" @insertConfirm="insertConfirm">

        </DocumentInsertBtn>

        <DocumentModifyBtn class="ma-4" v-if="!isInsertMode()" @modifyConfirm="modifyConfirm">

        </DocumentModifyBtn>

        <DocumentDeleteBtn class="ma-4" v-if="!isInsertMode()" @deleteConfirm="deleteConfirm">

        </DocumentDeleteBtn>
      </div>
    </div>
    <v-form>
      <div class="d-flex">

        <v-select
            class="flex-grow-0 ml-4"
            :items="categoryItems"
            label="카테고리"
            v-model="category"
            outlined
        ></v-select>

        <v-text-field
            class="flex-grow-1 ml-4 mr-4"
            v-model="title"
            label="여기에 제목을 입력하세요"
            :rules="titleRule"
            counter="50"
        >
        </v-text-field>
      </div>
      <div>
        <v-textarea
          class="ma-4"
          label="여기에 부제를 입력하세요"
          v-model="subTitle"
          counter="200"
        >
        </v-textarea>
      </div>
      <div>
        <div class="d-flex align-center mb-4" >
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
        <div class="d-flex align-center">
          <div class="ml-4 mr-4">
            {{ "댓글/답글" }}
          </div>
          <div>
            <v-btn-toggle v-model="replyAllowFlag">
              <v-btn :value="true">
                허용
              </v-btn>
              <v-btn :value="false">
                불허
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <CustomTextFieldDateTimePicker v-model="eventStartDateTime" label="이벤트 시작">

        </CustomTextFieldDateTimePicker>

      </div>
    </v-form>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import DocumentDeleteBtn from "@/components/DocumentButton/DocumentDeleteBtn.vue";
import DocumentInsertBtn from "@/components/DocumentButton/DocumentInsertBtn.vue";
import DocumentModifyBtn from "@/components/DocumentButton/DocumentModifyBtn.vue";
import DocumentConfirmDialog from "@/components/DocumentDialog/DocumentConfirmDialog.vue";
import {EventCategoryType} from "@/ManagerBis/EventManagement/Domain/Value/EventCategoryType";
import { DateTime } from "luxon";
import CustomTextFieldDateTimePicker from "@/components/DateTimePicker/CustomTextFieldDateTimePicker.vue";
@Component({
  components: {
    DocumentDeleteBtn,
    DocumentInsertBtn,
    DocumentModifyBtn,
    DocumentConfirmDialog,
    CustomTextFieldDateTimePicker,

  }
})
export default class EventManagementDocument extends Vue {
  @Prop(Number)
  idx!: number;

  category = EventCategoryType.DEFAULT;

  title = "";
  titleRule = [
    (v:any) => !!v || "제목이 필요합니다."
  ];

  subTitle= "";

  categoryItems = [
    {
      text: "기본",
      value: EventCategoryType.DEFAULT
    }
  ];

  openFlag = true;

  replyAllowFlag = true;

  eventStartDateTime = ""

  created(){
    this.eventStartDateTime = DateTime.local().toFormat("yyyy-MM-ddTHH:mm:ss");


  }


  isInsertMode() {
    return isNaN(this.idx);
  }

  insertConfirm() {

  }

  modifyConfirm() {

  }

  deleteConfirm() {

  }

}
</script>

<style scoped>

</style>
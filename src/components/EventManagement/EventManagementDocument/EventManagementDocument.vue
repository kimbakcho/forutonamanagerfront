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
      <div class="d-flex align-center">
        <div>
          시작 일시
        </div>
        <CustomTextFieldDateTimePicker v-model="eventStartDateTime" label="이벤트 시작">

        </CustomTextFieldDateTimePicker>
        <div>
          종료 일시
        </div>
        <CustomTextFieldDateTimePicker v-model="eventEndDateTime" label="이벤트 종료">

        </CustomTextFieldDateTimePicker>
      </div>
      <div class="ml-4 mt-4 mr-4 mb-8">
        <GoogleMap id="googleMap" ref="googleMap" @changeCurrentAddress="changeCurrentAddress">

        </GoogleMap>
      </div>
      <div class="d-flex align-center ma-4">
        <div>
          상세 주소
        </div>
        <v-text-field class="ml-4 mr-4" v-model="detailAddress" counter="100" >

        </v-text-field>
      </div>
      <div class="d-flex">
        <ImageUploaderFileComponent class="ma-4" label="리스트 썸네일" placeholder="파일 업로드" id="listThumbnailImage">

        </ImageUploaderFileComponent>

        <ImageUploaderFileComponent class="ma-4"  label="상세 썸네일" placeholder="파일 업로드" id="detailthumbnailImage">

        </ImageUploaderFileComponent>
      </div>

    </v-form>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import DocumentDeleteBtn from "@/components/DocumentButton/DocumentDeleteBtn.vue";
import DocumentInsertBtn from "@/components/DocumentButton/DocumentInsertBtn.vue";
import DocumentModifyBtn from "@/components/DocumentButton/DocumentModifyBtn.vue";
import DocumentConfirmDialog from "@/components/DocumentDialog/DocumentConfirmDialog.vue";
import {EventCategoryType} from "@/ManagerBis/EventManagement/Domain/Value/EventCategoryType";
import { DateTime } from "luxon";
import CustomTextFieldDateTimePicker from "@/components/DateTimePicker/CustomTextFieldDateTimePicker.vue";
import GoogleMap from "@/components/GoogleMap/GoogleMap.vue";
// eslint-disable-next-line no-unused-vars
import GoogleMapInputPort from "@/components/GoogleMap/GoogleMapInputPort";
import ImageUploaderFileComponent from "@/components/ImageUploader/ImageUploaderFileComponent.vue";
@Component({
  components: {
    DocumentDeleteBtn,
    DocumentInsertBtn,
    DocumentModifyBtn,
    DocumentConfirmDialog,
    CustomTextFieldDateTimePicker,
    GoogleMap,
    ImageUploaderFileComponent

  }
})
export default class EventManagementDocument extends Vue {
  @Prop(Number)
  idx!: number;

  @Ref("googleMap")
  googleMap!: GoogleMapInputPort;

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

  eventEndDateTime = ""

  detailAddress = ""

  created(){
    this.eventStartDateTime = DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ss");
    this.eventEndDateTime = DateTime.local().plus({day:1}).toFormat("yyyy-MM-dd'T'HH:mm:ss");
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

  changeCurrentAddress(address: string){
    this.detailAddress = address;
  }

}
</script>

<style scoped>
#googleMap{
  width: 1200px;
  height: 600px;
}
#listThumbnailImage{
  width: 400px;
  height: 400px;
}

#detailthumbnailImage{
  width: 400px;
  height: 400px;
}
</style>
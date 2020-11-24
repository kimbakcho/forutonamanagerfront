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
        <GoogleMap id="googleMap" ref="googleMap" @changeCurrentAddress="changeCurrentAddress" @mapLoaded="mapLoaded">

        </GoogleMap>
      </div>
      <div class="d-flex align-center ma-4">
        <div>
          상세 주소
        </div>
        <v-text-field class="ml-4 mr-4" v-model="detailAddress" counter="100" >

        </v-text-field>
      </div>
      <div class="d-flex" id="imagePanel">
        <ImageUploaderFileComponent ref="listThumbnailImage" class="ma-4"
                                    :previewImageUrl="preListThumbnailImage"
                                    label="리스트 썸네일" placeholder="파일 업로드" id="listThumbnailImage">

        </ImageUploaderFileComponent>

        <ImageUploaderFileComponent ref="detailThumbnailImage" class="ma-4"
                                    :previewImageUrl="preDetailThumbnailImage"
                                    label="상세 썸네일" placeholder="파일 업로드" id="detailThumbnailImage">

        </ImageUploaderFileComponent>
      </div>
      <div>
        <div>
          상세 설명
        </div>
        <QuillBasicEditor class="ma-4" v-model = "detailContent">

        </QuillBasicEditor>
      </div>
      <div>
        <SingleFileUpload ref="webViewUpload" class="ma-4" id="WebViewUpload" label="웹뷰파일"
                          :preDownLoadFile="preWebViewDownLoadFile">

        </SingleFileUpload>
      </div>

    </v-form>
    <DocumentConfirmDialog ref="confirmDialog" @confirm="onConfirm">

    </DocumentConfirmDialog>
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
import QuillBasicEditor from "@/components/WYSIWYGEditor/QuillBasicEditor.vue";
import SingleFileUpload from "@/components/SingleFileUpload/SingleFileUpload.vue";
// eslint-disable-next-line no-unused-vars
import ImageUploaderFileComponentInputPort from "@/components/ImageUploader/ImageUploaderFileComponentInputPort";
// eslint-disable-next-line no-unused-vars
import SingleFileUploadInputPort from "@/components/SingleFileUpload/SingleFileUploadInputPort";
// eslint-disable-next-line no-unused-vars
import EventManagementUseCaseInputPort
  from "@/ManagerBis/EventManagement/Domain/UseCase/EventManagementUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import EventManagementInsertReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementInsertReqDto";
// eslint-disable-next-line no-unused-vars
import DocumentConfirmDialogInputPort from "@/components/DocumentDialog/DocumentConfirmDialogInputPort";
import CustomLatLng from "@/ManagerBis/Common/CustomLatLng";
import EventManagementUpdateReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementUpdateReqDto";
@Component({
  components: {
    DocumentDeleteBtn,
    DocumentInsertBtn,
    DocumentModifyBtn,
    DocumentConfirmDialog,
    CustomTextFieldDateTimePicker,
    GoogleMap,
    ImageUploaderFileComponent,
    QuillBasicEditor,
    SingleFileUpload
  }
})
export default class EventManagementDocument extends Vue {
  @Prop(Number)
  idx!: number;

  @Ref("googleMap")
  googleMap!: GoogleMapInputPort;

  @Ref("listThumbnailImage")
  listThumbnailImage!: ImageUploaderFileComponentInputPort;

  @Ref("detailThumbnailImage")
  detailThumbnailImage!: ImageUploaderFileComponentInputPort;

  @Ref("webViewUpload")
  webViewUpload!: SingleFileUploadInputPort;

  @Ref("confirmDialog")
  confirmDialog!: DocumentConfirmDialogInputPort;

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

  eventStartDateTime = "";

  eventEndDateTime = "";

  detailAddress = "";

  detailContent = "";

  preWebViewDownLoadFile = "";

  preListThumbnailImage = "";

  preDetailThumbnailImage = "";

  initMarkerPosition?: CustomLatLng;

  _eventManagementUseCaseInputPort!: EventManagementUseCaseInputPort;


  created(){
    this.eventStartDateTime = DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ss");
    this.eventEndDateTime = DateTime.local().plus({day:1}).toFormat("yyyy-MM-dd'T'HH:mm:ss");
    this._eventManagementUseCaseInputPort = myContainer.get<EventManagementUseCaseInputPort>(TYPES.EventManagementUseCaseInputPort);
  }

  async mounted(){
    if(!this.isInsertMode()){
      await this._loadDocument();
    }
  }

  isInsertMode() {
    return isNaN(this.idx);
  }

  async insertConfirm() {
    const reqDto = new EventManagementInsertReqDto();
    this.setDataReqDto(reqDto);

    const eventManagementResDto = await this._eventManagementUseCaseInputPort.insert(reqDto);

    await this.updateListThumbnailImage(eventManagementResDto.idx);

    await this.updateDetailThumbnailImage(eventManagementResDto.idx);

    await this.updateWebViewFile(eventManagementResDto.idx);

    this.confirmDialog.openDialog("등록 되었습니다.");

  }

  async modifyConfirm() {
    const reqDto = new EventManagementUpdateReqDto(this.idx);
    this.setDataReqDto(reqDto);

    const eventManagementResDto = await this._eventManagementUseCaseInputPort.update(reqDto);

    await this.updateListThumbnailImage(eventManagementResDto.idx);

    await this.updateDetailThumbnailImage(eventManagementResDto.idx);

    await this.updateWebViewFile(eventManagementResDto.idx);

    this.confirmDialog.openDialog("수정 되었습니다.");

  }

  setDataReqDto(reqDto: EventManagementInsertReqDto){
    reqDto.title = this.title;
    reqDto.allowComments = this.replyAllowFlag;
    reqDto.isOpen = this.openFlag;
    reqDto.category = this.category;
    reqDto.detailedDescription = this.detailContent;
    reqDto.eventEndDateTime = this.eventEndDateTime;
    reqDto.eventStartDateTime = this.eventStartDateTime;
    reqDto.eventStartPositionLng =  this.googleMap.getCurrentLatLng().lng();
    reqDto.eventStartPositionLat =  this.googleMap.getCurrentLatLng().lat();
    reqDto.detailAddress = this.detailAddress;
    reqDto.subTitle = this.subTitle
  }

  async deleteConfirm() {
    await this._eventManagementUseCaseInputPort.delete(this.idx);
    this.confirmDialog.openDialog("삭제 되었습니다.");
  }

  async updateListThumbnailImage(eventIdx: number): Promise<void>{
    if(this.listThumbnailImage.hasFile()){
      const listThumbnailImageFile = this.listThumbnailImage.getFile();
      if(listThumbnailImageFile!= undefined){
        await this._eventManagementUseCaseInputPort.uploadListThumbnailImage(listThumbnailImageFile,eventIdx);
      }
    }else if(this.listThumbnailImage.imageUrl == undefined || this.listThumbnailImage.imageUrl.length == 0){
      await this._eventManagementUseCaseInputPort.uploadListThumbnailImage(null,eventIdx);
    }
  }

  async updateDetailThumbnailImage(eventIdx: number): Promise<void>{
    if(this.detailThumbnailImage.hasFile()){
      const detailThumbnailImage = this.detailThumbnailImage.getFile();
      if(detailThumbnailImage!= undefined){
        await this._eventManagementUseCaseInputPort.uploadDetailPageThumbnail(detailThumbnailImage,eventIdx);
      }
    }else if(this.detailThumbnailImage.imageUrl == undefined || this.detailThumbnailImage.imageUrl.length == 0){
      await this._eventManagementUseCaseInputPort.uploadDetailPageThumbnail(null,eventIdx);
    }
  }

  async updateWebViewFile(eventIdx: number) {
    if(this.webViewUpload.hasFile()){
      const webViewFile = this.webViewUpload.getFile();
      if(webViewFile!= undefined){
        await this._eventManagementUseCaseInputPort.uploadWebViewArea(webViewFile,eventIdx);
      }
    } else if(this.webViewUpload.downLoadFile == undefined || this.webViewUpload.downLoadFile.length == 0){
      await this._eventManagementUseCaseInputPort.uploadWebViewArea(null,eventIdx);
    }
  }

  onConfirm() {
    this.$router.back();
  }

  changeCurrentAddress(address: string){
    this.detailAddress = address;
  }

  async _loadDocument(){
    const resDto = await this._eventManagementUseCaseInputPort.getIdx(this.idx);
    this.category = resDto.category;
    this.title = resDto.title;
    this.subTitle = resDto.subTitle;
    this.openFlag =resDto.isOpen;
    this.replyAllowFlag = resDto.allowComments;
    this.eventStartDateTime = resDto.eventStartDateTime;
    this.eventEndDateTime = resDto.eventEndDateTime;
    this.detailContent = resDto.detailedDescription;
    this.preListThumbnailImage = resDto.listThumbnail;
    this.preDetailThumbnailImage = resDto.detailPageThumbnail;
    this.preWebViewDownLoadFile = resDto.webViewArea;

    const initMarker = new CustomLatLng(resDto.eventStartPositionLat,resDto.eventStartPositionLng);
    this.initMarkerPosition = initMarker;
    this._loadInitMarker()

    this.detailAddress = resDto.detailAddress;



  }

  _loadInitMarker() {
    this.googleMap.initMarker(this.initMarkerPosition);
  }

  mapLoaded(){
    this._loadInitMarker();
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
#detailThumbnailImage{
  width: 400px;
  height: 400px;
}
#imagePanel{
  height: 550px;
}
#WebViewUpload{
  width: 400px;
}
</style>
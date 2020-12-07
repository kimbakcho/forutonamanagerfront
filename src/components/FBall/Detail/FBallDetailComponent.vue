<template>
  <div>
    <div v-if="initLoad">
      <div class="title">
        <v-text-field class="ma-4" readonly label="볼 제목" :value="ballName" hide-details>

        </v-text-field>
      </div>
      <div class="d-flex justify-space-between">
        <div class="ml-4">
          <v-text-field readonly label="제작자" :value="ballMaker">

          </v-text-field>
        </div>

        <div class="d-flex">
          <v-text-field class="ml-4 mr-4 ballHits" label="횟수" :value="ballHits" >

          </v-text-field>
          <v-text-field class="ml-4 mr-4 ballMakeTime" label="생성일" :value="ballMakeTime" >

          </v-text-field>
        </div>
      </div>
      <div>
        <v-carousel v-model="imagePageNumber" >
          <v-carousel-item v-for="desImage in detailImages" :key="desImage.index">
            <div>
              <v-img
                  :src="desImage.src"
                  max-height="500px"
              >
              </v-img>
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <v-textarea class="ma-4" label="상세 설명" readonly :value="detailContentText">

        </v-textarea>
      </div>
      <div class="ml-4 mr-4">
        <v-text-field label="youtube" :value="youtubeUrl">

        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import FBallUseCaseInputPort from "@/ManagerBis/FBall/Domain/UseCase/FBallUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";
// eslint-disable-next-line no-unused-vars
import FBallDescription, {DesImage} from "@/ManagerBis/FBall/Dto/FBallDescription";
// eslint-disable-next-line no-unused-vars
import FBallDescriptionConverterInputPort from "@/ManagerBis/FBall/Domain/UseCase/FBallDescriptionConverterInputPort";

@Component
export default class FBallDetailComponent extends Vue {

  @Prop(String)
  ballUuid!: String;

  initLoad:Boolean = false;

  imagePageNumber: Number = 0;

  private fBallResDto: FBallResDto = new FBallResDto();

  private fBallDescription: FBallDescription = new FBallDescription();

  private _fBallUseCaseInputPort!:FBallUseCaseInputPort;

  private _fBallDescriptionConverterInputPort!: FBallDescriptionConverterInputPort;

  created(){
    this._fBallUseCaseInputPort = myContainer.get<FBallUseCaseInputPort>(TYPES.FBallUseCaseInputPort);

    this._fBallDescriptionConverterInputPort = myContainer.get<FBallDescriptionConverterInputPort>(TYPES.FBallDescriptionConverterInputPort);
  }

  async mounted(){
    this.fBallResDto = await this._fBallUseCaseInputPort.getFBall(this.ballUuid);
    this.fBallDescription = this._fBallDescriptionConverterInputPort.getDescription(this.fBallResDto);
    this.initLoad = true
  }


  get ballName(): String{
    return this.fBallResDto.ballName;
  }

  get ballHits(): Number{
    return this.fBallResDto.ballHits;
  }

  get ballMakeTime(): String{
    return this.fBallResDto.makeTime;
  }

  get ballMaker(): String{
    return this.fBallResDto.uid.nickName;
  }

  get detailContentText(): String{
    return this.fBallDescription.text;
  }

  get detailImages(): DesImage[]{
    return this.fBallDescription.desimages;
  }

  get youtubeUrl(): String{
    return `https://www.youtube.com/watch?v=${this.fBallDescription.youtubeVideoId}`;
  }

}
</script>

<style scoped>
.ballHits {
  width: 40px;
}
.ballMakeTime {
  width: 160px;
}
</style>

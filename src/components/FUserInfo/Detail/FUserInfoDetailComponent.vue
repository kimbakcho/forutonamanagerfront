<template>
  <div>
    <div v-if="isLoaded">
      <v-row>
        <v-col cols="4">
          <v-avatar size="100px">
            <img :src="profileImageUrl">
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-text-field :value="nickName" readonly label="닉네임">

            </v-text-field>
          </v-row>
          <v-textarea :value="selfIntroduce" readonly label="자기소개">

          </v-textarea>

        </v-col>
      </v-row>
      <v-row>
        <div class="ml-4">
          추후 배경 이미지
        </div>
      </v-row>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import FUserInfoUseCaseInputPort from "@/ManagerBis/FUserInfo/Domain/UseCase/FUserInfoUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import FUserInfoResDto from "@/ManagerBis/FUserInfo/Dto/FUserInfoResDto";

@Component
export default class FUserInfoDetailComponent extends Vue {
  @Prop(String)
  uid!: String;

  private fUserInfoUseCaseInputPort!: FUserInfoUseCaseInputPort;

  private isLoaded = false;

  private fUserInfoResDto: FUserInfoResDto = new FUserInfoResDto()

  created(){
    this.fUserInfoUseCaseInputPort = myContainer.get<FUserInfoUseCaseInputPort>(TYPES.FUserInfoUseCaseInputPort);
  }

  async mounted(){
    this.fUserInfoResDto = await this.fUserInfoUseCaseInputPort.getFUserInfoResDto(this.uid);

    this.isLoaded = true;
  }

  get profileImageUrl(): String{
    return this.fUserInfoResDto.profilePictureUrl;
  }
  get nickName(): String {
    return this.fUserInfoResDto.nickName;
  }

  get selfIntroduce(): String{
    return this.fUserInfoResDto.selfIntroduction;
  }
}
</script>

<style scoped>

</style>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Notice/Page">
          <v-list-item-action>
            <v-icon>
              mdi-alert-circle
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>공지 사항</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/EventManagement/Page">
          <v-list-item-action>
            <v-icon>
              mdi-calendar
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>이벤트 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
            :value="false"
            prepend-icon="mdi-presentation"
        >
          <template v-slot:activator>
            <v-list-item-title>신고 관리</v-list-item-title>
          </template>
          <v-list-item link to="/MaliciousBall/Page">
            <v-list-item-title v-text="'Ball 신고 관리'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/MaliciousProfile/Page">
            <v-list-item-title v-text="'Profile 신고 관리'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/MaliciousReply/Page">
            <v-list-item-title v-text="'Reply 신고 관리'"></v-list-item-title>
          </v-list-item>

        </v-list-group>
        <v-list-group
            :value="false"
            prepend-icon="mdi-presentation"
        >
          <template v-slot:activator>
            <v-list-item-title>약관 및 정책</v-list-item-title>
          </template>

          <v-list-item link to="/TermsConditionView/15">
            <v-list-item-title v-text="'서비스 이용약관'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/TermsConditionView/16">
            <v-list-item-title v-text="'개인정보 처리방침'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/TermsConditionView/17">
            <v-list-item-title v-text="'위치정보 처리방침'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/TermsConditionView/67">
            <v-list-item-title v-text="'운영 정책'"></v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <SignStateBtn :loginManager="loginManager" ></SignStateBtn>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath"> </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SignStateBtn from "@/components/SignState/SignStateBtn.vue";
// eslint-disable-next-line no-unused-vars
import AxiosInitSetting from "@/AxiosInitSetting";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import LoginManager, {LoginManagerComponent} from "@/ManagerBis/Login/LoginUseCase/LoginManager";

@Component({
  components: {
    SignStateBtn
  }
})
export default class App extends Vue implements LoginManagerComponent{

  drawer: boolean | null = null;

  axiosInitSetting!: AxiosInitSetting;
  loginManager!: LoginManager;

  created() {
    this.axiosInitSetting = myContainer.get<AxiosInitSetting>(TYPES.AxiosInitSetting);
    this.axiosInitSetting.init();
    this.loginManager = myContainer.get<LoginManager>(TYPES.LoginManager);
  }

  mounted(){
    this.loginManager.addListener(this);
    this.loginManager.init();
  }


  onLogin(): void {
    this.$forceUpdate();
  }

  onUser(): void {
    this.$forceUpdate();
  }

}
</script>

<style lang="scss">
</style>

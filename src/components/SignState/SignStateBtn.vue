<template>
  <div class="SignStateBtn" :key="globalUiKeyVuex.loginBtnKey">
    <v-btn small v-if="getIsSignOut()" icon @click="gotoLoginPage">
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <div v-if="getIsSignIn()" class="d-flex align-center">
      <div>{{ getUserName() }}</div>
      <v-btn icon small @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">

import GlobalUiKeyVuex from "../../store/GlobalUiKeyVuex";
import {Component, Prop, Vue} from "vue-property-decorator";

import UserInfoVuex from "../../store/UserInfoVuex";
import { LoginManager } from "vueoauth2login";

@Component
export default class SignStateBtn extends Vue {

  @Prop(LoginManager)
  loginManager!: LoginManager;

  globalUiKeyVuex = GlobalUiKeyVuex;

  created() {

  }
  async logout() {
    this.loginManager.logout();
    location.reload();
  }

  getIsSignIn(): boolean {
    return this.loginManager.isLogin;
  }

  getIsSignOut(): boolean {
    return !this.getIsSignIn()
  }

  gotoLoginPage(){
    this.loginManager.goLoginPage();
  }

  getUserName(): string {
    return UserInfoVuex.userInfo.userName;
  }
}
</script>

<style lang="scss">
</style>

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
import {Component, Vue} from "vue-property-decorator";

import UserInfoVuex from "../../store/UserInfoVuex";

import Preference from "@/Preference";
@Component
export default class SignStateBtn extends Vue {



  globalUiKeyVuex = GlobalUiKeyVuex;

  created() {

  }
  async logout() {
    location.href = Preference.logoutPageUrl;
  }

  getIsSignIn(): boolean {
    return false;
  }

  getIsSignOut(): boolean {
    return !this.getIsSignIn()
  }

  async gotoLoginPage() {
    location.href= Preference.loginPageUrl;
  }


  getUserName(): string {
    return UserInfoVuex.userInfo.userName;
  }
}
</script>

<style lang="scss">
</style>

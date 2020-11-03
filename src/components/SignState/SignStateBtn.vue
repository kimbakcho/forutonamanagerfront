<template>
  <div class="SignStateBtn" :key="globalUiKeyVuex.loginBtnKey">
    <v-btn small v-if="!isLogin()" icon @click="login()">
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <div v-if="isLogin()" class="d-flex align-center">
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
// eslint-disable-next-line no-unused-vars
import LoginManager, {LoginManagerComponent} from "@/ManagerBis/Login/LoginUseCase/LoginManager";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";

@Component
export default class SignStateBtn extends Vue implements LoginManagerComponent{


  globalUiKeyVuex = GlobalUiKeyVuex;

  _loginManager!: LoginManager;

  created() {
    this._loginManager = myContainer.get<LoginManager>(TYPES.LoginManager);
  }

  mounted(){
    this._loginManager.addListener(this);
  }

  login(){
    this._loginManager.login();
  }

  logout(){
    this._loginManager.logout();
  }

  onLogin(): void {
    this.$forceUpdate();
  }

  isLogin(): boolean{
    return this._loginManager.isLogin;
  }

  getUserName(): string{
    return this._loginManager.user.userName
  }

  onUser(): void {
    this.$forceUpdate();
  }

}
</script>

<style lang="scss">
</style>

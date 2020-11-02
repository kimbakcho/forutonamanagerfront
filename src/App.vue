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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <SignStateBtn :loginManager="loginManager" ></SignStateBtn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
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
    console.log("onLogin");
  }

}
</script>

<style lang="scss">
</style>

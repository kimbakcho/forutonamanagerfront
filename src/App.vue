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
import {OAuth2ClientInfo, LoginManager, TokenManager} from "vueoauth2login";
import Preference from './Preference';
import AppVuex from "@/store/AppVuex";
import AuthTokenListener from "@/ManagerBis/AuthManager/AuthTokenListener";
import AuthLoginListener from "@/ManagerBis/AuthManager/AuthLoginListener";
import LoginMakeUrl from "@/ManagerBis/AuthManager/LoginMakeUrl";
@Component({
  components: {
    SignStateBtn
  }
})
export default class App extends Vue {
  drawer: boolean | null = null;

  oAuth2ClientInfo = new OAuth2ClientInfo(Preference.clientId, Preference.redirectUrl
      , Preference.scope, Preference.state);

  loginManager!: LoginManager;

  async created() {
    console.log("app Created")
    const tokenManager = new TokenManager(Preference.accessTokenKey,Preference.reFreshTokenKey);

    tokenManager.addListeners(new AuthTokenListener());

    this.loginManager = new LoginManager(tokenManager ,
        new LoginMakeUrl(), this.oAuth2ClientInfo,Preference.reFreshTokenUrl,Number(Preference.reFreshTokenTimeout));

    AppVuex.setLoginManager(this.loginManager);

    this.loginManager.addListeners(new AuthLoginListener());

    await this.loginManager.init();
  }
  mounted(){
    console.log("app mounted")
  }
}
</script>

<style lang="scss">
</style>

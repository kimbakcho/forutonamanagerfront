<template>
  <div class="Login">
    <div class="Logincard">
      <v-card min-width="300">
        <v-toolbar flat color="primary" class="title">Login</v-toolbar>
        <v-card-text class="pb-0">
          <v-text-field label="ID" v-model="ID" @keydown="ontextFieldkeydown"></v-text-field>
          <v-text-field label="PW" v-model="Password" type="password" @keydown="ontextFieldkeydown"></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-col class="pt-0 pb-0">
            <v-row class="d-flex">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onLogin" :loading="isLoginloding">Login</v-btn>
            </v-row>
          </v-col>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="faildialog" max-width="500px">
      <v-card max-width="500px">패스워드나 ID가 틀렸습니다.</v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GlobalSatete from "@/store/modules/globalstate";
import Userinfo from "../components/Userinfo";

@Component({})
export default class Login extends Vue {
  ID: string = "";
  Password: string = "";
  isLoginloding = false;
  faildialog = false;
  async onLogin() {
    this.isLoginloding = true;
    let info = new Userinfo();
    info.uid = this.ID;
    info.password = this.Password;
    try {
      let loginresult = await GlobalSatete.onLogin(info);
      if (loginresult != null) {
        this.$router.back();
      } else {
        this.faildialog = true;
      }
      if (GlobalSatete.RefreshTokenTimer === null) {
        GlobalSatete.setRefreshTokenTimer(
          setInterval(this.RefreshTokenFunc, 1800000)
        );
      }
    } catch (error) {
      this.faildialog = true;
    }

    this.isLoginloding = false;
  }

  async RefreshTokenFunc() {
    let refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token != "undefined" && refresh_token != null) {
      await GlobalSatete.onReFreshToken(refresh_token);
    }
  }

  async ontextFieldkeydown(value: KeyboardEvent) {
    if (value.key === "Enter") {
      this.onLogin();
    }
  }
}
</script>

<style lang="scss">
.Logincard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

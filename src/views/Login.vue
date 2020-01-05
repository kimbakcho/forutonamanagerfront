<template>
  <div class="Login">
    <div class="Logincard">
      <v-card min-width="300">
        <v-toolbar flat color="primary" class="title">
          Login
        </v-toolbar>
        <v-card-text class="pb-0">
          <v-text-field label="ID" v-model="ID"> </v-text-field>
          <v-text-field label="PW" v-model="Password" type="password">
          </v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-col class="pt-0 pb-0">
            <v-row class="d-flex">
              <v-spacer> </v-spacer>
              <v-btn color="primary" @click="onLogin">
                Login
              </v-btn>
            </v-row>
          </v-col>
        </v-card-actions>
      </v-card>
    </div>
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

  async onLogin() {
    console.log(this.Password);
    let info = new Userinfo();
    info.uid = this.ID;
    info.password = this.Password;
    await GlobalSatete.onLogin(info);

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

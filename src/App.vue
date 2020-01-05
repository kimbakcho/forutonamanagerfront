<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/FCMManagememt">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>FCM</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Forutona</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn to="/Login" color="secondary">
        Login
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { deserialize } from "class-transformer";
import GlobalSatete from "@/store/modules/globalstate";
import Userinfo from "@/components/Userinfo";
@Component({})
export default class App extends Vue {
  drawer: boolean = true;
  created() {
    let accesstoken = localStorage.getItem("accesstoken");
    console.log("accesstoken =" + accesstoken);
    if (accesstoken != null) {
      let decodebase64 = accesstoken.split(".")[1];
      let decode = atob(decodebase64);
      let parsecode = JSON.parse(decode);
      let info = new Userinfo();
      info.uid = parsecode.uid;
      info.nickname = parsecode.nickname;
      info.accesstoken = accesstoken;
      GlobalSatete.Login(info);
      console.log(decode);
    }
  }
}
</script>

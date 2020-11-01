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

@Component({
  components: {
    SignStateBtn
  }
})
export default class App extends Vue {
  drawer: boolean | null = null;


  created() {


  }

  async init(){

  }

}
</script>

<style lang="scss">
</style>

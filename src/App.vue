<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Forutona</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="6">
            <v-card>
              <vue-flux
                :options="vfOptions"
                :images="vfImages"
                :transitions="vfTransitions"
                ref="slider"
              >
                <template v-slot:preloader>
                  <flux-preloader />
                </template>

                <template v-slot:caption>
                  <flux-caption />
                </template>

                <template v-slot:controls>
                  <flux-controls />
                </template>

                <template v-slot:pagination>
                  <flux-pagination />
                </template>

                <template v-slot:index>
                  <flux-index />
                </template>
              </vue-flux>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import {
  VueFlux,
  FluxCaption,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader
} from "vue-flux";

@Component({
  components: {
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader
  }
})
export default class App extends Vue {
  drawer: boolean = true;
  vfOptions: any = {
    autoplay: true
  };
  vfImages: any = [
    require("./assets/mainlogo.png"),
    require("./assets/logo2.png"),
    require("./assets/logo3.png")
  ];
  vfTransitions: any = ["fade", "cube", "book", "wave"];
}
</script>

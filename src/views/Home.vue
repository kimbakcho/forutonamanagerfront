<template>
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
export default class Home extends Vue {
  vfOptions: any = {
    autoplay: true
  };
  vfImages: any = [
    require("@/assets/mainlogo.png"),
    require("@/assets/logo2.png"),
    require("@/assets/logo3.png")
  ];
  vfTransitions: any = ["fade", "cube", "book", "wave"];
}
</script>

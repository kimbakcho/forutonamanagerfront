import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#F32735",
        secondary: "#FF4438",
        accent: "#723CED"
      }
    }
  }
});

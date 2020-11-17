<template>
  <div id="customTextFieldTimePicker">
    <v-menu
        ref="rMenu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
          v-if="menu"
          v-model="time"
          format="24hr"
          full-width
          @click:minute="onSaveClick(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";

@Component
export default class CustomTextFieldTimePicker extends Vue {
  @Prop(String)
  value!: string;


  @Ref("rMenu")
  rMenu!: any;

  menu = false;

  time = "";

  created(){
    this.time = this.value;
  }

  onSaveClick(time: string){
    this.rMenu.save(time);
    this.$emit("input",time);
  }

  @Watch("value")
  changeValue(value: string){
    this.time = value;
  }

}
</script>

<style scoped>
#customTextFieldTimePicker{
  max-width: 120px;
}
</style>
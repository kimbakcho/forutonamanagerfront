<template>
  <div id="customTextFieldDatePicker">
    <v-menu
        ref="rMenu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="date"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="date"
          no-title
          locale="ko"
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="menu = false"
        >
          Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="onSaveClick(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";

@Component
export default class CustomTextFieldDatePicker extends Vue {

  @Prop(String)
  value!: string;

  @Prop(String)
  label!: string;

  @Ref("rMenu")
  rMenu!: any;

  menu = false;

  date = "";

  created(){
    this.date = this.value;
  }

  onSaveClick(date: string){
    this.rMenu.save(date);
    this.$emit("input",date);
  }


  @Watch("value")
  changeValue(value: string){
    this.date = value;
  }

}
</script>

<style scoped>
#customTextFieldDatePicker{
  max-width: 120px;
}
</style>
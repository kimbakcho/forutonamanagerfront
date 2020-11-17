<template>
  <div class="d-flex">

    <CustomTextFieldDatePicker @input="changeDateTime" v-model="date" :label="label">

    </CustomTextFieldDatePicker>
    <CustomTextFieldTimePicker @input="changeDateTime" v-model="time">

    </CustomTextFieldTimePicker>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {DateTime} from "luxon";
import CustomTextFieldDatePicker from "@/components/DateTimePicker/CustomTextFieldDatePicker.vue";
import CustomTextFieldTimePicker from "@/components/DateTimePicker/CustomTextFieldTimePicker.vue";

@Component(
    {
      components:{
        CustomTextFieldDatePicker,
        CustomTextFieldTimePicker
      }
    }
)
export default class CustomTextFieldDateTimePicker extends Vue {

  @Prop(String)
  value!: string;

  @Prop(String)
  label!: string;

  date = "";

  time = "";

  created(){
    this.setField(this.value);
  }

  setField(dateTime: string) {
    const tempDateTime = DateTime.fromFormat(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
    this.date = tempDateTime.toFormat("yyyy-MM-dd");
    this.time = tempDateTime.toFormat("HH:mm")
  }


  @Watch("value")
  changeValue(value: string){
    this.setField(value);
  }

  changeDateTime(){
    const value = `${this.date}T${this.time}:00`
    this.$emit("input",value)
  }

}
</script>

<style scoped>

</style>

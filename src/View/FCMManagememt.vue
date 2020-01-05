<template>
  <v-container class="fill-height" fluid>
    <div class="d-flex">
      <v-text-field label="title" v-model="title"></v-text-field>
      <v-text-field label="message" class="ml-2" v-model="body"></v-text-field>
      <v-btn color="primary" @click="sendmessage">보내기</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class FCMManagememt extends Vue {
  title: string = "";
  body: string = "";
  async sendmessage() {
    axios.post("/forutonamanagementbackend/api/v1/FCM/sendMessage", "", {
      params: {
        title: this.title,
        body: this.body
      }
    });
  }
}
</script>


<template>
  <div class="NoticeMain">
    <v-col>
      <v-row justify="center">
        <v-col cols="11">
          <v-row>
            <div class="headline font-weight-bold">공지사항</div>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/notice/docpage">
              <v-icon>add</v-icon>새 공지사항
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <NoticePageTable></NoticePageTable>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NoticePageTable from "@/components/NoticePage/NoticePageTable.vue";
@Component({
  components: {
    NoticePageTable
  }
})
export default class NoticeMain extends Vue {}
</script>

<style lang="scss">
</style>
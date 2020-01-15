<template>
  <div class="IssuecubePage">
    <v-col>
      <v-row justify="center">
        <v-col cols="11">
          <v-row class="d-flex">
            <v-select
              style="max-width:100px"
              label="검색종류"
              :items="searchitems"
              v-model="searchitem"
            ></v-select>
            <v-text-field
              class="ml-4"
              style="max-width:300px"
              placeholder="여기에 검색어를 입력하세요"
              label="검색어"
              v-model="searchtext"
            ></v-text-field>
            <v-btn color="primary" class="ml-4" @click="onsearchclick">검색</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
interface TableHeader {
  text: string;
  value: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  filterable?: boolean;
  divider?: boolean;
  class?: string | string[];
  width?: string | number;
  filter?: (value: any, search: string, item: any) => boolean;
  sort?: (a: any, b: any) => number;
}
interface DataOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  sortDesc: boolean[];
  groupBy: string[];
  groupDesc: boolean[];
  multiSort: boolean;
  mustSort: boolean;
}
@Component({})
export default class IssuecubePage extends Vue {
  searchitems = [
    {
      text: "제목",
      value: "cubeName"
    },
    {
      text: "제작자",
      value: "nickName"
    },
    {
      text: "위치",
      value: "placeAddress"
    }
  ];
  itemperpagelist = [
    {
      text: "10",
      value: 10
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];
  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ["makeTime"],
    sortDesc: [false],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false
  };
  searchitem = "cubeName";
  searchtext = "";
  totalpagelength = 0;
  pagenationpage = 1;
  onsearchclick() {}
}
</script>

<style lang="scss">
</style>
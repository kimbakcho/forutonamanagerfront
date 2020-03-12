<template>
  <div class="ActiveUserPage">
    <v-row justify="center">
      <v-col cols="11">
        <v-row class="d-flex">
          <div class="headline">활동 유저</div>
        </v-row>
        <v-row align="center" class="d-flex mt-4">
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
          <v-btn color="primary" class="ml-4" @click="onsearchclick"
            >검색</v-btn
          >
        </v-row>

        <v-row>
          <v-col cols="12" class="ma-0 pa-0">
            <v-card>
              <v-data-table
                :options.sync="options"
                :items="items"
                :loading="isloading"
                :headers="header"
                :server-items-length="totalitemcount"
              >
                <template v-slot:item.joinTime="{ item }">
                  {{ item.joinTime.toLocal().toFormat("yyyy-MM-dd HH:mm:ss") }}
                </template>
              </v-data-table>
              <v-pagination
                @input="onchangepage"
                v-model="pagenationpage"
                :length="totalpagelength"
              ></v-pagination>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import FcubeUserinfo from "@/components/UserInfoPage/FcubeUserinfo";
import FcubeUserSearchdto from "@/components/UserInfoPage/FcubeUserSearchdto";
import { DateTime } from "luxon";
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
export default class ActiveUserPage extends Vue {
  searchitems = [
    {
      text: "닉네임",
      value: "nickName"
    },
    {
      text: "아이디",
      value: "email"
    },
    {
      text: "연락처",
      value: "phonenumber"
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
  searchitem = "nickName";
  header: TableHeader[] = [
    {
      text: "닉네임",
      value: "nickName",
      sortable: false
    },
    {
      text: "계정타입",
      value: "uid",
      sortable: false
    },
    {
      text: "아이디",
      value: "email",
      sortable: false
    },
    {
      text: "연락처",
      value: "phonenumber",
      sortable: false
    },
    {
      text: "국적",
      value: "isoCode",
      sortable: false
    },
    {
      text: "성별",
      value: "sex"
    },
    {
      text: "가입일",
      value: "joinTime"
    },
    {
      text: "최근 접속일",
      value: "positionUpdateTime"
    }
  ];
  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ["joinTime"],
    sortDesc: [false],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false
  };
  isloading = false;
  items: FcubeUserinfo[] = [];
  totalpagelength = 0;
  searchtext = "";
  pagenationpage = 1;
  totalitemcount = 0;
  mounted() {
    this.init();
  }
  async init() {}
  @Watch("options", { immediate: true, deep: true })
  async onoptions(value: DataOptions) {
    this.pagenationpage = this.options.page;
    this.onsearch(value);
  }
  onsearchclick() {
    this.onsearch(this.options);
  }
  onchangepage(value: number) {
    this.options.page = value;
  }
  async onsearch(value: DataOptions) {
    this.isloading = true;
    let fcubeUserSearchdto: FcubeUserSearchdto = {
      offset: (value.page - 1) * value.itemsPerPage,
      limit: value.itemsPerPage,
      sortBy: value.sortBy[0],
      sortDesc: value.sortDesc[0],
      searchtype: this.searchitem,
      searchtext: this.searchtext
    };
    this.options.page = value.page;
    this.totalitemcount = await FcubeUserinfo.getFcubeUserinfolength(
      fcubeUserSearchdto
    );
    this.totalpagelength = Math.trunc(this.totalitemcount / value.itemsPerPage);
    this.items = await FcubeUserinfo.getFcubeUserinfos(fcubeUserSearchdto);

    this.isloading = false;
  }
}
</script>

<style lang="scss"></style>

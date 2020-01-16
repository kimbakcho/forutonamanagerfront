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
          <v-row>
            <v-select
              style="max-width:50px"
              v-model="options.itemsPerPage"
              :items="itemperpagelist"
            ></v-select>
            <v-spacer></v-spacer>
            <v-dialog persistent v-model="deletecheckdialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">큐브 삭제</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-col>
                    <v-row class="headline">정말로 삭제 하시겠습니까?</v-row>
                    <v-row justify="end">
                      <v-btn color="primary" @click="deletecheckdialog=false">아니요</v-btn>
                      <v-btn color="primary" class="ml-4" @click="ondeletecube">삭제</v-btn>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row>
            <v-col cols="12" class="ma-0 pa-0">
              <v-card>
                <v-data-table
                  v-model="selected"
                  show-select
                  item-key="cubeuuid"
                  :options.sync="options"
                  :items="items"
                  :loading="isloading"
                  :headers="header"
                  hide-default-footer
                >
                  <template v-slot:item.activationTime="{ item }">
                    {{
                    Math.trunc(item.activationTime.diffNow("hour").hours)
                    }}
                  </template>
                  <template
                    v-slot:item.makeTime="{ item }"
                  >{{item.makeTime.toFormat("yyyy-MM-dd HH:mm:ss")}}</template>
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
    </v-col>
    <v-dialog v-model="deletecheckdialog2" width="500">
      <v-card>
        <v-card-text>
          <v-col>
            <v-row class="headline">삭제하였습니다.</v-row>
            <v-row justify="end">
              <v-btn color="primary" @click="deletecheckdialog2 = false">확인</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Fcubequestpageview from "@/components/CubePage/Fcubequestpageview";
import FcubequestpageviewSearchdto from "@/components/CubePage/FcubequestpageviewSearchdto";
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
  header: TableHeader[] = [
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
    },
    {
      text: "View",
      value: "cubeHits",
      sortable: true
    },
    {
      text: "좋아요",
      value: "cubeLikes",
      sortable: true
    },
    {
      text: "싫어요",
      value: "cubeDisLikes",
      sortable: true
    },
    {
      text: "참가자",
      value: "joinPlayer",
      sortable: true
    },
    {
      text: "보상P",
      value: "makeExp"
    },
    {
      text: "남은 생존 시간(시)",
      value: "activationTime",
      sortable: true
    },
    {
      text: "등록일",
      value: "makeTime",
      sortable: true
    }
  ];
  searchitem = "cubeName";
  searchtext = "";
  totalpagelength = 0;
  pagenationpage = 1;
  deletecheckdialog = false;
  selected: Fcubequestpageview[] = [];
  items: Fcubequestpageview[] = [];
  deletecheckdialog2 = false;
  isloading = false;
  onsearchclick() {
    this.onsearch(this.options);
  }
  async ondeletecube() {
    for (let i = 0; i < this.selected.length; i++) {
      await this.selected[i].deletefcubeitem();
    }
    this.onsearch(this.options);
    this.deletecheckdialog = false;
    this.deletecheckdialog2 = true;
  }
  onchangepage(value: number) {
    this.options.page = value;
  }
  @Watch("options", { immediate: true, deep: true })
  async onoptions(value: DataOptions) {
    this.onsearch(value);
  }
  async onsearch(value: DataOptions) {
    this.isloading = true;
    let fcubeUserSearchdto: FcubequestpageviewSearchdto = {
      offset: (value.page - 1) * value.itemsPerPage,
      limit: value.itemsPerPage,
      sortBy: value.sortBy[0],
      sortDesc: value.sortDesc[0],
      searchtype: this.searchitem,
      searchtext: this.searchtext,
      cubeType: "issuecube"
    };
    this.options.page = value.page;
    let temptotalpagelength: number = await Fcubequestpageview.getFcubeQuestPageViewlength(
      fcubeUserSearchdto
    );
    this.isloading = false;
    this.totalpagelength =
      Math.trunc(temptotalpagelength / value.itemsPerPage) + 1;
    this.items = await Fcubequestpageview.getFcubequestpageviews(
      fcubeUserSearchdto
    );

    

    this.isloading = false;
  }
}
</script>

<style lang="scss">
</style>
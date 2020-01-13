<template>
  <div class="NoticePageTable">
    <v-data-table
      hide-default-footer
      :headers="headers"
      :options.sync="options"
      :loading="isloading"
      :items="items"
    >
      <template v-slot:item.pageName="{ item }">
        <router-link :to="'/notice/docpage/' + item.idx">{{item.pageName}}</router-link>
      </template>
      <template v-slot:item.writeDate="{ item }">{{item.writeDate.toFormat("yyyy-MM-dd HH:mm:ss")}}</template>
    </v-data-table>
    <v-pagination @input="onchangepage" v-model="pagenationpage" :length="totalpagelength"></v-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Noticepage from "./Noticepage";
import NoticePageSearchDto from "./NoticePageSearchDto";
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
export default class NoticePageTable extends Vue {
  headers: TableHeader[] = [
    {
      text: "번호",
      value: "idx",
      width: 80
    },
    {
      text: "공지사항 제목",
      value: "pageName",
      sortable: false
    },
    {
      text: "작성자",
      value: "pageWriter",
      sortable: false,
      width: 100
    },
    {
      text: "등록일",
      value: "writeDate",
      width: 200
    }
  ];
  pagenationpage = 1;
  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ["idx"],
    sortDesc: [false],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false
  };
  items: Noticepage[] = [];
  isloading = false;
  totalpagelength: number = 0;
  @Watch("options", { immediate: true, deep: true })
  async onoptions(value: DataOptions) {
    this.isloading = true;
    let noticePageSearchDto: NoticePageSearchDto = {
      offset: (value.page - 1) * value.itemsPerPage,
      limit: value.itemsPerPage,
      sortBy: value.sortBy[0],
      sortDesc: value.sortDesc[0]
    };
    let temptotalpagelength: number = await Noticepage.getNoticepagelength();
    this.totalpagelength = Math.trunc(temptotalpagelength / 10) + 1;
    this.items = await Noticepage.getNoticepageList(noticePageSearchDto);
    this.isloading = false;
  }
  mounted() {
    this.init();
  }
  onchangepage(value: number) {
    this.options.page = value;
  }
  async init() {}
}
</script>

<style lang="scss">
</style>
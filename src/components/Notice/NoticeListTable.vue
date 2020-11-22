<template>
  <div>
    <v-data-table
      :headers="headers"
      @update:options="onOptions"
      :server-items-length.sync="serverItemsLength"
      :options.sync="options"
      :items="currentItem"
    >
      <template v-slot:item.openFlag="{ item }"  >
        {{ item.openFlag ? "게시" : "미개시" }}
      </template>
      <template v-slot:item.title="{ item }">
        <router-link :to="getDocLink(item.idx)"> {{ item.title }} </router-link>
      </template>

    </v-data-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {DataOptions, DataTableHeader} from "vuetify";
// eslint-disable-next-line no-unused-vars
import NoticeUseCaseInputPort from "@/ManagerBis/Notice/Domain/UseCase/NoticeUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import Pageable from "@/ManagerBis/Common/Pageable";
// eslint-disable-next-line no-unused-vars
import PageWrap from "@/ManagerBis/Common/PageWrap";
// eslint-disable-next-line no-unused-vars
import NoticeResDto from "@/ManagerBis/Notice/Dto/NoticeResDto";

@Component
export default class NoticeListTable extends Vue {
  headers: DataTableHeader[] = [
    {
      text: "번호",
      value: "idx",
      sortable: true,
      width: 80
    },
    {
      text: "공지사항 제목",
      value: "title",
      sortable: false,
    },
    {
      text: "게시 상태",
      value: "openFlag",
      sortable: true,
      width: 120
    },
    {
      text: "작성자",
      value: "writerUid.userName",
      sortable: true,
      width: 120
    },
    {
      text: "등록일시",
      value: "modifyDate",
      sortable: true,
      width: 200
    }
  ];

  options: DataOptions = {
    page : 1,
    itemsPerPage: 10,
    sortBy: ["modifyDate"],
    sortDesc: [true],
  }

  serverItemsLength = 0;

  currentItem: NoticeResDto[] = [];

  _noticeUseCaseInputPort!:NoticeUseCaseInputPort;


  created(){
    this._noticeUseCaseInputPort = myContainer.get<NoticeUseCaseInputPort>(TYPES.NoticeUseCaseInputPort);
  }

  async _getCurrentPageNotice(options: DataOptions): Promise<void>{
    const pageable = new Pageable();
    pageable.page = options.page -1;
    pageable.size = options.itemsPerPage;
    if(options.sortBy.length > 0){
      const order = options.sortDesc[0] ? "DESC" : "ASC";
      pageable.sort = options.sortBy[0]+","+ order;
    }else {
      pageable.sort = ""
    }
    const noticeResDtoPageWrap = await this._noticeUseCaseInputPort.getNotices(pageable);
    this.currentItem = noticeResDtoPageWrap.content;
    this.serverItemsLength = noticeResDtoPageWrap.totalElements;
  }

  // eslint-disable-next-line no-unused-vars
  onOptions(options: DataOptions){
    this._getCurrentPageNotice(options);
  }

  getDocLink(idx: number){
    return `/Notice/Doc?idx=${idx}`;
  }

}
</script>

<style scoped>

</style>
<template>
  <div>
    <EventManagementListTableToggleBtn @changeToggle="changeToggle">

    </EventManagementListTableToggleBtn>
    <div>
      <v-data-table
        :headers="headers"
        :items="eventManagementResDtos"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items-per-page.sync="pageSize"
        :server-items-length="getServerItemsLength()"
      >

      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import EventManagementListTableToggleBtn
  from "@/components/EventManagement/EventManagementListTable/EventManagementListTableToggleBtn.vue";
// eslint-disable-next-line no-unused-vars
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";
// eslint-disable-next-line no-unused-vars
import EventManagementUseCaseInputPort
  from "@/ManagerBis/EventManagement/Domain/UseCase/EventManagementUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import EventManagementListTableStatue
  from "@/components/EventManagement/EventManagementListTable/EventManagementListTableStatue";
import Pageable from "@/ManagerBis/Common/Pageable";
// eslint-disable-next-line no-unused-vars
import EventManagementResDto from "@/ManagerBis/EventManagement/Dto/EventManagementResDto";
// eslint-disable-next-line no-unused-vars
import {DataTableHeader} from "vuetify";

@Component(
    {
      components: {
        EventManagementListTableToggleBtn
      }
    }
)
export default class EventManagementListTable extends Vue {

  _eventManagementUseCaseInputPort!: EventManagementUseCaseInputPort;
  _eventManagementListTableStatue!: EventManagementListTableStatue;
  eventManagementResDtos: EventManagementResDto[] = [];

  headers: DataTableHeader[] = [
    {
      text: "이벤트 번호",
      value: "idx",
      width: "100",
      sortable: true
    },
    {
      text: "카테 고리",
      value: "category",
      width: "100",
      sortable: true
    },
    {
      text: "제목",
      value: "title",
      sortable: true,
    },
    {
      text: "작성자",
      value: "writerUid.userName",
      sortable: true,
    },
    {
      text: "이벤트 시작",
      value: "eventStartDateTime",
      sortable: true,
    },
    {
      text: "이벤트 종료",
      value: "eventEndDateTime",
      sortable: true,
    },
    {
      text: "이벤트 종료",
      value: "eventEndDateTime",
      sortable: true,
    },
    {
      text: "조회수",
      value: "views",
      sortable: true
    },
    {
      text: "공개상태",
      value: "isOpen",
      sortable: true
    },
    {
      text: "진행상태",
      value: "empty",
      sortable: false
    }

  ]

  created() {
    this._eventManagementUseCaseInputPort = myContainer.get<EventManagementUseCaseInputPort>(TYPES.EventManagementUseCaseInputPort);
    this._eventManagementListTableStatue = myContainer.get<EventManagementListTableStatue>(TYPES.EventManagementListTableStatue);
  }

  mounted(){
    this._getTableList();
  }

  async _getTableList(): Promise<void>{
    const pageable = new Pageable();
    pageable.page = this._eventManagementListTableStatue.page - 1;
    pageable.size = this._eventManagementListTableStatue.pageSize;
    pageable.setSort(this._eventManagementListTableStatue.sortBy,this._eventManagementListTableStatue.sortDesc);
    const pageWrap = await this._eventManagementUseCaseInputPort.get(this._eventManagementListTableStatue.eventSearchType,pageable);
    this.eventManagementResDtos = pageWrap.content;
    this._eventManagementListTableStatue.serverItemsLength = pageWrap.totalElements;
    this.$forceUpdate();
  }

  get sortBy(): string {
    return this._eventManagementListTableStatue.sortBy;
  }

  set sortBy(value: string) {
    this._eventManagementListTableStatue.sortBy = value;
  }

  get sortDesc(): boolean {
    return this._eventManagementListTableStatue.sortDesc;
  }

  set sortDesc(value: boolean) {
    this._eventManagementListTableStatue.sortDesc = value;
  }

  get pageSize(): number {
    return this._eventManagementListTableStatue.pageSize;
  }

  set pageSize(value: number)  {
    this._eventManagementListTableStatue.pageSize = value;
  }

  getServerItemsLength() {
    return  this._eventManagementListTableStatue.serverItemsLength;
  }

  // eslint-disable-next-line no-unused-vars
  changeToggle(value: EventSearchType){
    this._getTableList();
  }

}
</script>

<style scoped>

</style>
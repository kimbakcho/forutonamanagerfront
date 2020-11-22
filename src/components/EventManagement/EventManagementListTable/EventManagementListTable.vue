<template>
  <div>
    <EventManagementListTableToggleBtn @changeToggle="changeToggle">

    </EventManagementListTableToggleBtn>
    <div>
      <v-data-table
        :headers="headers"
        :items="eventManagementResDtos"
        :server-items-length="getServerItemsLength()"
        :options.sync="_eventManagementListTableStatue.dataOptions"
        @update:options="_getTableList"
      >
        <template v-slot:item.title = "{ item }">
          <router-link :to="'./Doc?idx='+String(item.idx)"> {{item.title}} </router-link>
        </template>
        <template v-slot:item.processState = "{ item }">
          {{ getProcessState(item) }}
        </template>

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
import {DataOptions, DataTableHeader} from "vuetify";
import {DateTime} from "luxon";

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
      width: "100"
    },
    {
      text: "이벤트 시작",
      value: "eventStartDateTime",
      sortable: true,
      width: "100"
    },
    {
      text: "이벤트 종료",
      value: "eventEndDateTime",
      sortable: true,
      width: "100"
    },
    {
      text: "조회수",
      value: "views",
      sortable: true,
      width: "100"
    },
    {
      text: "공개상태",
      value: "isOpen",
      sortable: true,
      width: "100"
    },
    {
      text: "진행상태",
      value: "processState",
      sortable: false,
      width: "100"
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
    const dataOptions = this._eventManagementListTableStatue.dataOptions;
    if(dataOptions == undefined){
      return ;
    }

    const pageable = new Pageable();
    pageable.page = dataOptions.page - 1;
    pageable.size = dataOptions.itemsPerPage;
    if(dataOptions.sortBy.length > 0){
      pageable.setSort(dataOptions.sortBy[0],dataOptions.sortDesc[0]);
    }
    const pageWrap = await this._eventManagementUseCaseInputPort.get(this._eventManagementListTableStatue.eventSearchType,pageable);
    this.eventManagementResDtos = pageWrap.content;
    this._eventManagementListTableStatue.serverItemsLength = pageWrap.totalElements;
    this.$forceUpdate();
  }


  getServerItemsLength() {
    return  this._eventManagementListTableStatue.serverItemsLength;
  }

  // eslint-disable-next-line no-unused-vars
  changeToggle(value: EventSearchType){
    this._getTableList();
  }

  getProcessState(resDto: EventManagementResDto): string{
    const eventStartDateTime = DateTime.fromFormat(resDto.eventStartDateTime,"yyyy-MM-dd'T'HH:mm:ss");
    const eventEndDateTime = DateTime.fromFormat(resDto.eventEndDateTime,"yyyy-MM-dd'T'HH:mm:ss");

    if(eventStartDateTime.diffNow("seconds").seconds < 0
       && eventEndDateTime.diffNow("seconds").seconds > 0){
      return "진행중"
    }else if(eventStartDateTime.diffNow("seconds").seconds > 0){
      return "진행전"
    }else if(eventEndDateTime.diffNow("seconds").seconds < 0){
      return "완료"
    } else {
      return "??"
    }
  }

}
</script>

<style scoped>

</style>
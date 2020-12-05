<template>
  <div>
    <div>
      <MaliciousBallPageListTableToggleBtn
          :key="_maliciousBallPageListTableStatue.beforeJudgementCount"
          @changeToggle="getTableList()">

      </MaliciousBallPageListTableToggleBtn>
    </div>
    <div>
      <v-data-table
          :headers="headers"
          :items="maliciousBallResDtos"
          :server-items-length="getServerItemsLength()"
          :options.sync="_maliciousBallPageListTableStatue.dataOptions"
          @update:options="getTableList"
      >
        <template v-slot:item.ballName="{ item }">
          <router-link :to="getDetailPageLink(item)" >
            {{ item.ballName }}
          </router-link>
        </template>
      </v-data-table>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousBallPageListTableToggleBtn
  from "@/components/MaliciousBall/MaliciousBallPageListTable/MaliciousBallPageListTableToggleBtn.vue";
// eslint-disable-next-line no-unused-vars
import MaliciousBallUseCaseInputPort from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallUseCaseInputPort";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import {DataTableHeader} from "vuetify";
// eslint-disable-next-line no-unused-vars
import MaliciousBallPageListTableStatue
  from "@/components/MaliciousBall/MaliciousBallPageListTable/MaliciousBallPageListTableStatue";
import Pageable from "@/ManagerBis/Common/Pageable";
// eslint-disable-next-line no-unused-vars
import MaliciousBallResDto from "@/ManagerBis/Malicious/Dto/MaliciousBallResDto";
import {MaliciousBallSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousBallSearchType";

@Component(
    {
      components:{
        MaliciousBallPageListTableToggleBtn
      }
    }
)
export default class MaliciousBallPageListTable extends Vue {

  private _maliciousBallUseCaseInputPort!: MaliciousBallUseCaseInputPort;

  private _maliciousBallPageListTableStatue!: MaliciousBallPageListTableStatue;

  maliciousBallResDtos: MaliciousBallResDto[] = []

  headers: DataTableHeader[] = [
    {
      text: "접수 번호",
      value: "idx",
      width: "100",
      sortable: true
    },
    {
      text: "ball 고유번호",
      value: "ballUuid",
      width: "200",
    },
    {
      text: "ball 제목",
      value: "ballName",
      width: "200",
    },
    {
      text: "제작자",
      value: "makerNickName",
      width: "100",
    },
    {
      text: "Ball 등록일시",
      value: "ballMakeTime",
      width: "100",
    },
    {
      text: "조회수",
      value: "ballHits",
      width: 100,
    },
    {
      text: "신고 횟수",
      value: "totalNumberReports",
      width: 100,
      sortable: true
    }
  ]

  created(){
    this._maliciousBallUseCaseInputPort = myContainer.get<MaliciousBallUseCaseInputPort>(TYPES.MaliciousBallUseCaseInputPort);
    this._maliciousBallPageListTableStatue = myContainer.get<MaliciousBallPageListTableStatue>(TYPES.MaliciousBallPageListTableStatue);
  }

  mounted(){
    this.getTableList();
  }
  private async getTableList(): Promise<void>{
    const dataOptions = this._maliciousBallPageListTableStatue.dataOptions;
    if(dataOptions == undefined){
      return ;
    }
    const pageable = new Pageable();
    pageable.page = dataOptions.page - 1;
    pageable.size = dataOptions.itemsPerPage;
    if(dataOptions.sortBy.length > 0){
      pageable.setSort(dataOptions.sortBy[0],dataOptions.sortDesc[0]);
    }
    const pageWrap = await this._maliciousBallUseCaseInputPort
        .getPage(this._maliciousBallPageListTableStatue.searchType,pageable);
    this.maliciousBallResDtos = pageWrap.content;
    this._maliciousBallPageListTableStatue.serverItemsLength = pageWrap.totalElements;
    if(this._maliciousBallPageListTableStatue.searchType == MaliciousBallSearchType.BEFORE_JUDGMENT){
      this._maliciousBallPageListTableStatue.beforeJudgementCount = pageWrap.totalElements;
    }
    this.$forceUpdate();

  }
  getServerItemsLength() {
    return  this._maliciousBallPageListTableStatue.serverItemsLength;
  }


  getDetailPageLink(item: MaliciousBallResDto) {
    return `Detail?idx=${item.idx}`
  }

}
</script>

<style scoped>

</style>
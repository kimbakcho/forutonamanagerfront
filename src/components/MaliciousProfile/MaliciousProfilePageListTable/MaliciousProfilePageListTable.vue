<template>
  <div>
    <div>
      <MaliciousPageListTableToggleBtn
          :key="maliciousPageListTableStatus.beforeJudgementCount"
          :maliciousPageListTableStatus="maliciousPageListTableStatus"
          @changeToggle="getTableList()">

      </MaliciousPageListTableToggleBtn>

    </div>
    <div>
      <v-data-table
          :headers="headers"
          :items="maliciousProfilePageItemResDto"
          :server-items-length="getServerItemsLength()"
          :options.sync="maliciousPageListTableStatus.dataOptions"
          @update:options="getTableList"
      >
        <template v-slot:item.nickName="{ item }">
          <router-link :to="getDetailPageLink(item)" >
            {{ item.nickName }}
          </router-link>
        </template>
      </v-data-table>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousPageListTableToggleBtn from "@/components/Malicious/Table/MaliciousPageListTableToggleBtn.vue";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
// eslint-disable-next-line no-unused-vars
import MaliciousPageListTableStatus from "@/components/Malicious/Table/MaliciousPageListTableStatus";

// eslint-disable-next-line no-unused-vars
import MaliciousProfileUseCaseInputPort
  from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileUseCaseInputPort";

// eslint-disable-next-line no-unused-vars
import MaliciousProfileResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfileResDto";
import Pageable from "@/ManagerBis/Common/Pageable";
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
// eslint-disable-next-line no-unused-vars
import {DataTableHeader} from "vuetify";
// eslint-disable-next-line no-unused-vars
import MaliciousProfilePageItemResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfilePageItemResDto";

@Component(
    {
      components: {
        MaliciousPageListTableToggleBtn: MaliciousPageListTableToggleBtn
      }
    }
)
export default class MaliciousProfilePageListTable extends Vue {

  private maliciousProfileUseCaseInputPort!: MaliciousProfileUseCaseInputPort;

  private maliciousPageListTableStatus!: MaliciousPageListTableStatus;

  maliciousProfilePageItemResDto: MaliciousProfilePageItemResDto[] = []

  headers: DataTableHeader[] = [
    {
      text: "접수 번호",
      value: "idx",
      width: "100",
      sortable: true
    },
    {
      text: "user 고유번호",
      value: "userUid",
      width: "200",
    },
    {
      text: "닉네임",
      value: "nickName",
      width: "200",
    },
    {
      text: "가입 날짜",
      value: "joinTime",
      width: "100",
    },
    {
      text: "Flower Count",
      value: "followerCount",
      width: "100",
    },
    {
      text: "신고 횟수",
      value: "totalNumberReports",
      width: 100,
      sortable: true
    }
  ]

  created(){
    this.maliciousProfileUseCaseInputPort = myContainer
        .get<MaliciousProfileUseCaseInputPort>(TYPES.MaliciousProfileUseCaseInputPort);
    this.maliciousPageListTableStatus = myContainer
        .get<MaliciousPageListTableStatus>(TYPES.MaliciousProfilePageListTableStatue);
  }


  private async getTableList(): Promise<void>{
    const dataOptions = this.maliciousPageListTableStatus.dataOptions;
    if(dataOptions == undefined){
      return ;
    }
    const pageable = new Pageable();
    pageable.page = dataOptions.page - 1;
    pageable.size = dataOptions.itemsPerPage;
    if(dataOptions.sortBy.length > 0){
      pageable.setSort(dataOptions.sortBy[0],dataOptions.sortDesc[0]);
    }
    const pageWrap = await this.maliciousProfileUseCaseInputPort
        .getPage(this.maliciousPageListTableStatus.searchType,pageable);
    this.maliciousProfilePageItemResDto = pageWrap.content;
    this.maliciousPageListTableStatus.serverItemsLength = pageWrap.totalElements;
    if(this.maliciousPageListTableStatus.searchType == MaliciousSearchType.BEFORE_JUDGMENT){
      this.maliciousPageListTableStatus.beforeJudgementCount = pageWrap.totalElements;
    }
    this.$forceUpdate();
  }

  getServerItemsLength() {
    return  this.maliciousPageListTableStatus.serverItemsLength;
  }

  getDetailPageLink(item: MaliciousProfilePageItemResDto) {
    return `Detail?idx=${item.idx}`
  }
}
</script>

<style scoped>

</style>
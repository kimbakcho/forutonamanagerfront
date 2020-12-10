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
          :items="maliciousReplyPageItemResDtos"
          :server-items-length="getServerItemsLength()"
          :options.sync="maliciousPageListTableStatus.dataOptions"
          @update:options="getTableList"
      >
        <template v-slot:item.replyText="{ item }">
          <router-link :to="getDetailPageLink(item)" >
            {{ item.replyText }}
          </router-link>
        </template>
      </v-data-table>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MaliciousPageListTableToggleBtn from "@/components/Malicious/Table/MaliciousPageListTableToggleBtn.vue";
import MaliciousPageListTableStatus from "@/components/Malicious/Table/MaliciousPageListTableStatus";
import myContainer from "@/inversify.config";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import Pageable from "@/ManagerBis/Common/Pageable";
import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import MaliciousReplyUseCaseInputPort from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyUseCaseInputPort";
import MaliciousReplyPageItemResDto from "@/ManagerBis/Malicious/Dto/Reply/MaliciousReplyPageItemResDto";
import {DataTableHeader} from "vuetify";
import MaliciousProfilePageItemResDto from "@/ManagerBis/Malicious/Dto/Profile/MaliciousProfilePageItemResDto";

@Component(
    {
      components: {
        MaliciousPageListTableToggleBtn: MaliciousPageListTableToggleBtn
      }
    }
)
export default class MaliciousReplyPageListTable extends Vue {
  private maliciousPageListTableStatus!: MaliciousPageListTableStatus;
  private maliciousReplyUseCaseInputPort!: MaliciousReplyUseCaseInputPort;

  maliciousReplyPageItemResDtos: MaliciousReplyPageItemResDto[] = [];

  headers: DataTableHeader[] = [
    {
      text: "접수 번호",
      value: "idx",
      width: "100",
      sortable: true
    },
    {
      text: "댓글 고유번호",
      value: "replyUuid",
      width: "200",
    },
    {
      text: "댓글 내용",
      value: "replyText",
      width: "200",
    },
    {
      text: "댓글 작성자",
      value: "replyUserNickName",
      width: "100",
    },
    {
      text: "댓글 업로드 시간",
      value: "replyUploadTime",
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
    this.maliciousPageListTableStatus = myContainer.get<MaliciousPageListTableStatus>(TYPES.MaliciousReplyPageListTableStatus);
    this.maliciousReplyUseCaseInputPort = myContainer.get<MaliciousReplyUseCaseInputPort>(TYPES.MaliciousReplyUseCaseInputPort);
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
    const pageWrap = await this.maliciousReplyUseCaseInputPort
        .getPage(this.maliciousPageListTableStatus.searchType,pageable);
    this.maliciousReplyPageItemResDtos = pageWrap.content;
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
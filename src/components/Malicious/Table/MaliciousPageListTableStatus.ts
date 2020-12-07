import {MaliciousSearchType} from "@/ManagerBis/Malicious/Domain/Value/MaliciousSearchType";
import {DataOptions} from "vuetify";
import {injectable} from "inversify";

@injectable()
export default class MaliciousPageListTableStatus {
    searchType = MaliciousSearchType.BEFORE_JUDGMENT
    beforeJudgementCount: number = 0;
    dataOptions: DataOptions;
    serverItemsLength = 0;
    constructor() {
        this.dataOptions = {
            sortDesc:[true],
            sortBy:['totalNumberReports'],
            itemsPerPage: 10,
            page: 1,
            groupBy: [],
            groupDesc: [],
            multiSort: false,
            mustSort: false
        };
    }
}
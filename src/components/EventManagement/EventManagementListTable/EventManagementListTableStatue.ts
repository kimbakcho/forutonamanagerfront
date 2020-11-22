import {injectable} from "inversify";
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";
import {DataOptions} from "vuetify";

@injectable()
export default class EventManagementListTableStatue {
    eventSearchType = EventSearchType.ALL;
    dataOptions: DataOptions;
    serverItemsLength = 0;
    constructor() {
        this.dataOptions = {
            sortDesc:[true],
            sortBy:['eventStartDateTime'],
            itemsPerPage: 10,
            page: 1,
            groupBy: [],
            groupDesc: [],
            multiSort: false,
            mustSort: false
        };
    }

}
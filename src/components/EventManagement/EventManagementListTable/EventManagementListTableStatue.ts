import {injectable} from "inversify";
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";

@injectable()
export default class EventManagementListTableStatue {
    eventSearchType = EventSearchType.ALL;
    page = 1;
    sortBy = "eventStartDateTime"
    sortDesc = true
    pageSize = 10;
    serverItemsLength = 0;
}
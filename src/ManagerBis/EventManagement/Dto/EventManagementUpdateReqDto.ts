import EventManagementInsertReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementInsertReqDto";

export default class EventManagementUpdateReqDto extends EventManagementInsertReqDto {
    idx: number;
    constructor(idx: number) {
        super();
        this.idx = idx;
    }
}
import {EventCategoryType} from "@/ManagerBis/EventManagement/Domain/Value/EventCategoryType";

export default class EventManagementInsertReqDto {
    category!: EventCategoryType;
    title!: string;
    subTitle!: string;
    isOpen!: boolean;
    allowComments!: boolean;
    eventStartDateTime!: string;
    eventEndDateTime!: string;
    eventStartPositionLat!: number;
    eventStartPositionLng!: number;
    detailedDescription!: string;
    detailAddress!: string;

}
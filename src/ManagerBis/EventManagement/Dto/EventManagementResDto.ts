import {EventCategoryType} from "@/ManagerBis/EventManagement/Domain/Value/EventCategoryType";
import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class EventManagementResDto {
    idx!: number;
    category!: EventCategoryType;
    title!: string;
    subTitle!: string;
    isOpen!: boolean;
    allowComments!: boolean;
    eventStartDateTime!: string;
    eventEndDateTime!: string;
    views!: number;
    eventStartPositionLat!: number;
    eventStartPositionLng!: number;
    detailAddress!: string;
    listThumbnail!: string;
    detailPageThumbnail!: string;
    detailedDescription!: string;
    webViewArea!: string;
    writerUid!: MUserInfoResDto;
}
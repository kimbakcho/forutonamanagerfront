import EventManagementInsertReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementInsertReqDto";
import EventManagementResDto from "@/ManagerBis/EventManagement/Dto/EventManagementResDto";
import Pageable from "@/ManagerBis/Common/Pageable";
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import EventManagementUpdateReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementUpdateReqDto";

export default interface EventManagementRepository {
    save(reqDto: EventManagementInsertReqDto): Promise<EventManagementResDto>;
    findByEventSearchType(eventSearchType: EventSearchType,pageable: Pageable): Promise<PageWrap<EventManagementResDto>>;
    findById(idx: number): Promise<EventManagementResDto>;
    deleteById(idx: number): Promise<void>;
    update(reqDto: EventManagementUpdateReqDto): Promise<EventManagementResDto>;
    uploadListThumbnailImage(imageFile :File,eventIdx: number): Promise<EventManagementResDto>;
    uploadDetailPageThumbnail(imageFile: File,eventIdx: number): Promise<EventManagementResDto>;
    uploadWebViewArea(webViewFile: File,eventIdx: number): Promise<EventManagementResDto>;

}
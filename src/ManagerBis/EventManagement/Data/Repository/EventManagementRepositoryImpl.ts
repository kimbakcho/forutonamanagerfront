import EventManagementRepository from "@/ManagerBis/EventManagement/Domain/Repository/EventManagementRepository";
import {injectable} from "inversify";
import EventManagementResDto from "@/ManagerBis/EventManagement/Dto/EventManagementResDto";
import EventManagementInsertReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementInsertReqDto";
import axios from "axios"
import Preference from "@/Preference";
import {plainToClass} from "class-transformer";
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import EventManagementUpdateReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementUpdateReqDto";

@injectable()
export default class EventManagementRepositoryImpl implements EventManagementRepository {
    async findById(idx: number): Promise<EventManagementResDto> {
        const response = await axios.get<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement/idx`,{
            params:{
                "idx": idx
            }
        });
        return response.data;
    }

    async save(reqDto: EventManagementInsertReqDto): Promise<EventManagementResDto> {
        const response = await axios.post<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement`, reqDto);
        return plainToClass(EventManagementResDto, response.data)
    }

    async findByEventSearchType(eventSearchType: EventSearchType, pageable: Pageable): Promise<PageWrap<EventManagementResDto>> {
        const response = await axios.get<PageWrap<EventManagementResDto>>(`${Preference.backEndUrl}/eventManagement`,
            {
                params: {
                    "eventSearchType": eventSearchType,
                    "page": pageable.page,
                    "size": pageable.size,
                    "sort": pageable.sort
                }
            });
        return response.data
    }

    async deleteById(idx: number): Promise<void> {
        await axios.delete(`${Preference.backEndUrl}/eventManagement`, {
            params: {
                "idx": idx
            }
        });
    }

    async update(reqDto: EventManagementUpdateReqDto): Promise<EventManagementResDto> {
        const response = await axios.put<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement`, reqDto)
        return plainToClass(EventManagementResDto, response.data)
    }

    async uploadListThumbnailImage(imageFile: File,eventIdx: number): Promise<EventManagementResDto> {
        const formData = new FormData();
        formData.append("listThumbnail", imageFile);
        const response = await axios.post<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement/listThumbnail`, formData,
            {
                params:{
                    "eventIdx": eventIdx
                },
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        return plainToClass(EventManagementResDto,response.data);
    }

    async uploadDetailPageThumbnail(imageFile: File,eventIdx: number): Promise<EventManagementResDto> {
        const formData = new FormData();
        formData.append("detailPageThumbnail", imageFile);
        formData.append("eventIdx",String(eventIdx));
        const response = await axios.post<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement/detailPageThumbnail`, formData,
            {
                params:{
                    "eventIdx": eventIdx
                },
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        return plainToClass(EventManagementResDto,response.data);
    }

    async uploadWebViewArea(webViewFile: File,eventIdx: number): Promise<EventManagementResDto> {
        const formData = new FormData();
        formData.append("webViewArea", webViewFile);
        formData.append("eventIdx",String(eventIdx));
        const response = await axios.post<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement/webViewArea`, formData,
            {
                params:{
                    "eventIdx": eventIdx
                },
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        return plainToClass(EventManagementResDto,response.data);
    }




}
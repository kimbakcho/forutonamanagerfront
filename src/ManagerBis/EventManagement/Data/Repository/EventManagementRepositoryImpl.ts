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
        await axios.delete(`${Preference.backEndUrl}/eventManagement`,{
            params:{
                "idx": idx
            }
        });
    }

    async update(reqDto: EventManagementUpdateReqDto): Promise<EventManagementResDto> {
        const response = await axios.put<EventManagementResDto>(`${Preference.backEndUrl}/eventManagement`, reqDto)
        return plainToClass(EventManagementResDto, response.data)
    }

}
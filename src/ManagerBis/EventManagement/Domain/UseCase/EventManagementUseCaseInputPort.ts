import EventManagementInsertReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementInsertReqDto";
import EventManagementResDto from "@/ManagerBis/EventManagement/Dto/EventManagementResDto";
import {EventSearchType} from "@/ManagerBis/EventManagement/Domain/Value/EventSearchType";
import Pageable from "@/ManagerBis/Common/Pageable";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import EventManagementUpdateReqDto from "@/ManagerBis/EventManagement/Dto/EventManagementUpdateReqDto";
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import EventManagementRepository from "@/ManagerBis/EventManagement/Domain/Repository/EventManagementRepository";

export default interface EventManagementUseCaseInputPort {
    insert(reqDto: EventManagementInsertReqDto): Promise<EventManagementResDto>;
    get(eventSearchType: EventSearchType,pageable: Pageable): Promise<PageWrap<EventManagementResDto>>;
    delete(idx: number): Promise<void>;
    update(reqDto: EventManagementUpdateReqDto): Promise<EventManagementResDto>;
}

@injectable()
export class EventManagementUseCase implements EventManagementUseCaseInputPort{

    _eventManagementRepository :EventManagementRepository;

    constructor(@inject(TYPES.EventManagementRepository) eventManagementRepository: EventManagementRepository) {
        this._eventManagementRepository = eventManagementRepository;
    }

    async delete(idx: number): Promise<void> {
        await this._eventManagementRepository.deleteById(idx);
    }

    async get(eventSearchType: EventSearchType, pageable: Pageable): Promise<PageWrap<EventManagementResDto>> {
        return this._eventManagementRepository.findByEventSearchType(eventSearchType,pageable);
    }

    async insert(reqDto: EventManagementInsertReqDto): Promise<EventManagementResDto> {
        return this._eventManagementRepository.save(reqDto);
    }

    async update(reqDto: EventManagementUpdateReqDto): Promise<EventManagementResDto> {
        return this._eventManagementRepository.update(reqDto);
    }

}
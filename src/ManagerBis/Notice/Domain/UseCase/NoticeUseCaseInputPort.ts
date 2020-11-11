import NoticeResDto from "@/ManagerBis/Notice/Dto/NoticeResDto";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import Pageable from "@/ManagerBis/Common/Pageable";
import InsertNoticeReqDto from "@/ManagerBis/Notice/Dto/InsertNoticeReqDto";
import UpdateNoticeReqDto from "@/ManagerBis/Notice/Dto/UpdateNoticeReqDto";
import NoticeRepository from '../Repository/NoticeRepository';
import {inject, injectable} from "inversify";
import TYPES from "@/ManagerBis/ManagerBisTypes";

export default interface NoticeUseCaseInputPort {
    getNotices(pageable: Pageable): Promise<PageWrap<NoticeResDto>>;
    insertNotice(insertNoticeReqDto: InsertNoticeReqDto): Promise<NoticeResDto>;
    updateNotice(updateNoticeReqDto: UpdateNoticeReqDto): Promise<NoticeResDto>;
    deleteNotice(idx: number): Promise<void>;
    getNotice(idx: number): Promise<NoticeResDto>;
}
@injectable()
export class NoticeUseCase implements NoticeUseCaseInputPort{

    _noticeRepository: NoticeRepository;

    constructor(@inject(TYPES.NoticeRepository)noticeRepository: NoticeRepository) {
        this._noticeRepository = noticeRepository;
    }

    async getNotices(pageable: Pageable): Promise<PageWrap<NoticeResDto>> {
        return await this._noticeRepository.findByAll(pageable);
    }

    async deleteNotice(idx: number): Promise<void> {
        return await  this._noticeRepository.deleteById(idx);
    }

    async insertNotice(insertNoticeReqDto: InsertNoticeReqDto): Promise<NoticeResDto> {
        return await this._noticeRepository.save(insertNoticeReqDto);
    }

    async updateNotice(updateNoticeReqDto: UpdateNoticeReqDto): Promise<NoticeResDto> {
        return await this._noticeRepository.updateNotice(updateNoticeReqDto);
    }

    async getNotice(idx: number): Promise<NoticeResDto> {
       return await this._noticeRepository.findById(idx);
    }

}
import NoticeResDto from "@/ManagerBis/Notice/Dto/NoticeResDto";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import InsertNoticeReqDto from "@/ManagerBis/Notice/Dto/InsertNoticeReqDto";
import UpdateNoticeReqDto from "@/ManagerBis/Notice/Dto/UpdateNoticeReqDto";
import Pageable from "@/ManagerBis/Common/Pageable";

export default interface NoticeRepository {
    findByAll(pageable: Pageable): Promise<PageWrap<NoticeResDto>>;
    save(insertNoticeReqDto: InsertNoticeReqDto): Promise<NoticeResDto>;
    updateNotice(updateNoticeReqDto: UpdateNoticeReqDto): Promise<NoticeResDto>;
    deleteById(idx: number): Promise<void>
}
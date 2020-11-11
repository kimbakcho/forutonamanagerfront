import NoticeRepository from "@/ManagerBis/Notice/Domain/Repository/NoticeRepository";
import PageWrap from "@/ManagerBis/Common/PageWrap";
import NoticeResDto from "@/ManagerBis/Notice/Dto/NoticeResDto";
import {injectable} from "inversify";
import axios from "axios";
import Preference from "@/Preference";
import {plainToClass} from "class-transformer";
import InsertNoticeReqDto from "@/ManagerBis/Notice/Dto/InsertNoticeReqDto";
import UpdateNoticeReqDto from "@/ManagerBis/Notice/Dto/UpdateNoticeReqDto";
import Pageable from "@/ManagerBis/Common/Pageable";

@injectable()
export default class NoticeRepositoryImpl implements NoticeRepository {

    async findByAll(pageable: Pageable): Promise<PageWrap<NoticeResDto>> {
        const response = await axios.get<PageWrap<NoticeResDto>>(`${Preference.backEndUrl}/notice`,{
            params: pageable
        });
        return response.data;
    }

    async save(insertNoticeReqDto: InsertNoticeReqDto): Promise<NoticeResDto> {
        const response = await axios.post<NoticeResDto>(`${Preference.backEndUrl}/notice`, insertNoticeReqDto);
        return plainToClass(NoticeResDto, response.data);
    }

    async updateNotice(updateNoticeReqDto: UpdateNoticeReqDto): Promise<NoticeResDto> {
        const response = await axios.put<NoticeResDto>(`${Preference.backEndUrl}/notice`, updateNoticeReqDto);
        return plainToClass(NoticeResDto, response.data);
    }

    async deleteById(idx: number): Promise<void> {
        await axios.delete<NoticeResDto>(`${Preference.backEndUrl}/notice`,
            {
                params: {
                    "idx": idx
                }
            });
    }

    async findById(idx: number): Promise<NoticeResDto> {
        const response = await axios.get<NoticeResDto>(`${Preference.backEndUrl}/notice/Idx`,{
            params: {
                "idx": idx
            }
        });
        return plainToClass(NoticeResDto,response.data) ;
    }
}
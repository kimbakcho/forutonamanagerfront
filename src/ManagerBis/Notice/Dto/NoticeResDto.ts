import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";

export default class NoticeResDto {
    idx!: number;
    title!: string;
    content!: string;
    openFlag!: boolean;
    writerUid!: MUserInfoResDto;
    modifyDate!: string;
}
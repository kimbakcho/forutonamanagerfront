import FBallReplyRepository from "@/ManagerBis/FBallReply/Domain/Repository/FBallReplyRepository";
import FBallReplyResDto from "@/ManagerBis/FBallReply/Dto/FBallReplyResDto";
import {injectable} from "inversify";
import axios from "axios";
import Preference from "@/Preference";
import {plainToClass} from "class-transformer";

@injectable()
export default class FBallReplyRepositoryImpl implements FBallReplyRepository{

    async findById(replyUuid: String): Promise<FBallReplyResDto> {
        const response = await axios.get<FBallReplyResDto>(`${Preference.backEndUrl}/FBallReply/ReplyUuid`,{
            params:{
                "replyUuid": replyUuid
            }
        });
        return plainToClass(FBallReplyResDto,response.data);
    }





}
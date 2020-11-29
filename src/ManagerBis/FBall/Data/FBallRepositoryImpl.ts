import FBallRepository from "@/ManagerBis/FBall/Domain/Repository/FBallRepository";
import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";
import axios from "axios";
import {plainToClass, TransformPlainToClass} from "class-transformer";
import {injectable} from "inversify";
import Preference from "@/Preference";

@injectable()
export default class FBallRepositoryImpl implements FBallRepository{

    async findById(ballUuid: string): Promise<FBallResDto> {
        const response = await axios.get<FBallResDto>(`${Preference.backEndUrl}/FBall/BallUuid`,{
            params:{
                "ballUuid": ballUuid
            }
        });
        return plainToClass(FBallResDto,response.data);
    }

}
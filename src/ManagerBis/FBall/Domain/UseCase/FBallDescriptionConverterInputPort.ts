import FBallResDto from "@/ManagerBis/FBall/Dto/FBallResDto";
import FBallDescription from "@/ManagerBis/FBall/Dto/FBallDescription";
import {plainToClass} from "class-transformer";
import {injectable} from "inversify";

export default interface FBallDescriptionConverterInputPort {
    getDescription(fBallResDto: FBallResDto): FBallDescription;
}
@injectable()
export class FBallDescriptionConverter implements FBallDescriptionConverterInputPort{

    getDescription(fBallResDto: FBallResDto): FBallDescription {
        return plainToClass(FBallDescription,JSON.parse(String(fBallResDto.description)));
    }

}
import {Container} from "inversify";
import {OAuth2Repository} from "@/ManagerBis/MUserInfo/Domain/Repository/OAuth2Repository";
import TYPES from "@/ManagerBis/ManagerBisTypes";
import {OAuth2RepositoryImpl} from "@/ManagerBis/MUserInfo/Data/Repository/OAuth2RepositoryImpl";
import {ReFreshTokenTimer, ReFreshTokenTimerImpl} from "@/ManagerBis/MUserInfo/Domain/UserCase/ReFreshTokenTimer";
import {LogoutUseCase, LogoutUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/LogoutUseCaseInputPort";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";
import {MUserInfoRepositoryImpl} from "@/ManagerBis/MUserInfo/Data/Repository/MUserInfoRepositoryImpl";
import {SignUpCase, SignUpCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignUpCaseInputPort";
import {SignInUseUse, SignInUseUseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignInUseUseInputPort";


const container = new Container();

container.bind<OAuth2Repository>(TYPES.OAuth2Repository).to(OAuth2RepositoryImpl);
container.bind<ReFreshTokenTimer>(TYPES.ReFreshTokenTimer).to(ReFreshTokenTimerImpl);
container.bind<LogoutUseCaseInputPort>(TYPES.LogoutUseCaseInputPort).to(LogoutUseCase);
container.bind<MUserInfoRepository>(TYPES.MUserInfoRepository).to(MUserInfoRepositoryImpl);
container.bind<SignUpCaseInputPort>(TYPES.SignUpUseCaseInputPort).to(SignUpCase);
container.bind<SignInUseUseInputPort>(TYPES.SignInUseUseInputPort).to(SignInUseUse)


export default container;
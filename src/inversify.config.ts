import "reflect-metadata";
import {Container} from "inversify";

import TYPES from "@/ManagerBis/ManagerBisTypes";
import {MUserInfoRepository} from "@/ManagerBis/MUserInfo/Domain/Repository/MUserInfoRepository";
import {MUserInfoRepositoryImpl} from "@/ManagerBis/MUserInfo/Data/Repository/MUserInfoRepositoryImpl";
import {SignUpCase, SignUpCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignUpCaseInputPort";

import {
    MUserInfoUseCase,
    MUserInfoUseCaseInputPort
} from "@/ManagerBis/MUserInfo/Domain/UserCase/MUserInfoUseCaseInputPort";
import LoginUseCaseInputPort, {LoginUseCase} from "@/ManagerBis/Login/LoginUseCase/LoginUseCaseInputPort";
import AxiosInitSetting from "@/AxiosInitSetting";
import LoginManager from "@/ManagerBis/Login/LoginUseCase/LoginManager";
import {LoginManagerImpl} from "@/ManagerBis/Login/LoginUseCase/LoginManagerImpl";
import TermsConditionsRepository from "@/ManagerBis/TermsConditions/Domain/Repository/TermsConditionsRepository";
import TermsConditionsRepositoryImpl from "@/ManagerBis/TermsConditions/Data/Repository/TermsConditionsRepositoryImpl";
import TermsConditionsUseCaseInputPort
    , {TermsConditionsUseCase} from "@/ManagerBis/TermsConditions/Domain/UseCase/TermsConditionsUseCaseInputPort";
import NoticeRepository from "@/ManagerBis/Notice/Domain/Repository/NoticeRepository";
import NoticeRepositoryImpl from "@/ManagerBis/Notice/Data/Repository/NoticeRepositoryImpl";
import NoticeUseCaseInputPort, {NoticeUseCase} from "@/ManagerBis/Notice/Domain/UseCase/NoticeUseCaseInputPort";
import EventManagementRepository from "@/ManagerBis/EventManagement/Domain/Repository/EventManagementRepository";
import EventManagementRepositoryImpl from "@/ManagerBis/EventManagement/Data/Repository/EventManagementRepositoryImpl";
import EventManagementUseCaseInputPort
    , {EventManagementUseCase} from "@/ManagerBis/EventManagement/Domain/UseCase/EventManagementUseCaseInputPort";
import EventManagementListTableStatue
    from "@/components/EventManagement/EventManagementListTable/EventManagementListTableStatue";
import MaliciousBallRepository from "@/ManagerBis/Malicious/Domain/Repository/Ball/MaliciousBallRepository";
import MaliciousBallRepositoryImpl from "@/ManagerBis/Malicious/Data/Repository/Ball/MaliciousBallRepositoryImpl";
import MaliciousBallUseCaseInputPort, {MaliciousBallUseCase} from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallUseCaseInputPort";
import FBallRepository from "@/ManagerBis/FBall/Domain/Repository/FBallRepository";
import FBallRepositoryImpl from "@/ManagerBis/FBall/Data/FBallRepositoryImpl";
import FBallUseCaseInputPort, {FBallUseCase} from "@/ManagerBis/FBall/Domain/UseCase/FBallUseCaseInputPort";

import FBallDescriptionConverterInputPort, {FBallDescriptionConverter} from "@/ManagerBis/FBall/Domain/UseCase/FBallDescriptionConverterInputPort";
import MaliciousBallJudgementUseCaseFactory
    from "@/ManagerBis/Malicious/Domain/UseCase/Ball/MaliciousBallJudgementUseCaseFactory";
import MaliciousProfileRepository from "@/ManagerBis/Malicious/Domain/Repository/Profile/MaliciousProfileRepository";
import MaliciousProfileRepositoryImpl
    from "@/ManagerBis/Malicious/Data/Repository/Profile/MaliciousProfileRepositoryImpl";
import MaliciousProfileUseCaseInputPort
    , {MaliciousProfileUseCase} from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileUseCaseInputPort";
import MaliciousProfileJudgementUseCaseFactory
    from "@/ManagerBis/Malicious/Domain/UseCase/Profile/MaliciousProfileJudgementUseCaseFactory";

import MaliciousPageListTableStatus from "@/components/Malicious/Table/MaliciousPageListTableStatus";
import FUserInfoRepository from "@/ManagerBis/FUserInfo/Domain/Repository/FUserInfoRepository";
import FUserInfoRepositoryImpl from "@/ManagerBis/FUserInfo/Data/Repository/FUserInfoRepositoryImpl";
import FUserInfoUseCaseInputPort, {FUserInfoUseCase} from "@/ManagerBis/FUserInfo/Domain/UseCase/FUserInfoUseCaseInputPort";
import MaliciousReplyRepository from "@/ManagerBis/Malicious/Domain/Repository/Reply/MaliciousReplyRepository";
import MaliciousReplyRepositoryImpl from "@/ManagerBis/Malicious/Data/Repository/Reply/MaliciousReplyRepositoryImpl";
import MaliciousReplyUseCaseInputPort, {MaliciousReplyUseCase} from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyUseCaseInputPort";
import MaliciousReplyJudgementUseCaseFactory
    from "@/ManagerBis/Malicious/Domain/UseCase/Reply/MaliciousReplyJudgementUseCaseFactory";
import FBallReplyRepository from "@/ManagerBis/FBallReply/Domain/Repository/FBallReplyRepository";
import FBallReplyRepositoryImpl from "@/ManagerBis/FBallReply/Data/Repository/FBallReplyRepositoryImpl";
import FBallReplyUseCaseInputPort, {FBallReplyUseCase} from "@/ManagerBis/FBallReply/Domain/UseCase/FBallReplyUseCaseInputPort";


const myContainer = new Container();

myContainer.bind<MUserInfoRepository>(TYPES.MUserInfoRepository).to(MUserInfoRepositoryImpl).inSingletonScope();
myContainer.bind<SignUpCaseInputPort>(TYPES.SignUpUseCaseInputPort).to(SignUpCase).inSingletonScope();
myContainer.bind<MUserInfoUseCaseInputPort>(TYPES.MUserInfoUseCaseInputPort).to(MUserInfoUseCase).inSingletonScope();
myContainer.bind<LoginUseCaseInputPort>(TYPES.LoginUseCaseInputPort).to(LoginUseCase).inSingletonScope();
myContainer.bind<LoginManager>(TYPES.LoginManager).to(LoginManagerImpl).inSingletonScope();
myContainer.bind<AxiosInitSetting>(TYPES.AxiosInitSetting).to(AxiosInitSetting).inSingletonScope();
myContainer.bind<TermsConditionsRepository>(TYPES.TermsConditionsRepository).to(TermsConditionsRepositoryImpl).inSingletonScope();
myContainer.bind<TermsConditionsUseCaseInputPort>(TYPES.TermsConditionsUseCaseInputPort).to(TermsConditionsUseCase).inSingletonScope();
myContainer.bind<NoticeRepository>(TYPES.NoticeRepository).to(NoticeRepositoryImpl).inSingletonScope();
myContainer.bind<NoticeUseCaseInputPort>(TYPES.NoticeUseCaseInputPort).to(NoticeUseCase).inSingletonScope();
myContainer.bind<EventManagementRepository>(TYPES.EventManagementRepository).to(EventManagementRepositoryImpl).inSingletonScope();
myContainer.bind<EventManagementUseCaseInputPort>(TYPES.EventManagementUseCaseInputPort).to(EventManagementUseCase).inSingletonScope();
myContainer.bind<EventManagementListTableStatue>(TYPES.EventManagementListTableStatue).to(EventManagementListTableStatue).inSingletonScope();
myContainer.bind<MaliciousBallRepository>(TYPES.MaliciousBallRepository).to(MaliciousBallRepositoryImpl).inSingletonScope();
myContainer.bind<MaliciousBallUseCaseInputPort>(TYPES.MaliciousBallUseCaseInputPort).to(MaliciousBallUseCase).inSingletonScope();
myContainer.bind<FBallRepository>(TYPES.FBallRepository).to(FBallRepositoryImpl).inSingletonScope();
myContainer.bind<FBallUseCaseInputPort>(TYPES.FBallUseCaseInputPort).to(FBallUseCase).inSingletonScope();
myContainer.bind<MaliciousPageListTableStatus>(TYPES.MaliciousBallPageListTableStatue).to(MaliciousPageListTableStatus).inSingletonScope();
myContainer.bind<FBallDescriptionConverterInputPort>(TYPES.FBallDescriptionConverterInputPort).to(FBallDescriptionConverter);
myContainer.bind<MaliciousBallJudgementUseCaseFactory>(TYPES.MaliciousBallJudgementUseCaseFactory).to(MaliciousBallJudgementUseCaseFactory);
myContainer.bind<MaliciousProfileRepository>(TYPES.MaliciousProfileRepository).to(MaliciousProfileRepositoryImpl).inSingletonScope();
myContainer.bind<MaliciousProfileUseCaseInputPort>(TYPES.MaliciousProfileUseCaseInputPort).to(MaliciousProfileUseCase).inSingletonScope();
myContainer.bind<MaliciousProfileJudgementUseCaseFactory>(TYPES.MaliciousProfileJudgementUseCaseFactory).to(MaliciousProfileJudgementUseCaseFactory);
myContainer.bind<MaliciousPageListTableStatus>(TYPES.MaliciousProfilePageListTableStatue).to(MaliciousPageListTableStatus).inSingletonScope();
myContainer.bind<FUserInfoRepository>(TYPES.FUserInfoRepository).to(FUserInfoRepositoryImpl).inSingletonScope();
myContainer.bind<FUserInfoUseCaseInputPort>(TYPES.FUserInfoUseCaseInputPort).to(FUserInfoUseCase).inSingletonScope();
myContainer.bind<MaliciousReplyRepository>(TYPES.MaliciousReplyRepository).to(MaliciousReplyRepositoryImpl).inSingletonScope();
myContainer.bind<MaliciousReplyUseCaseInputPort>(TYPES.MaliciousReplyUseCaseInputPort).to(MaliciousReplyUseCase).inSingletonScope();
myContainer.bind<MaliciousReplyJudgementUseCaseFactory>(TYPES.MaliciousReplyJudgementUseCaseFactory).to(MaliciousReplyJudgementUseCaseFactory).inSingletonScope();
myContainer.bind<MaliciousPageListTableStatus>(TYPES.MaliciousReplyPageListTableStatus).to(MaliciousPageListTableStatus).inSingletonScope();
myContainer.bind<FBallReplyRepository>(TYPES.FBallReplyRepository).to(FBallReplyRepositoryImpl).inSingletonScope();
myContainer.bind<FBallReplyUseCaseInputPort>(TYPES.FBallReplyUseCaseInputPort).to(FBallReplyUseCase).inSingletonScope();
export default myContainer;
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
export default myContainer;
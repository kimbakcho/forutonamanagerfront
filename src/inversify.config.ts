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


const myContainer = new Container();

myContainer.bind<MUserInfoRepository>(TYPES.MUserInfoRepository).to(MUserInfoRepositoryImpl);
myContainer.bind<SignUpCaseInputPort>(TYPES.SignUpUseCaseInputPort).to(SignUpCase);
myContainer.bind<MUserInfoUseCaseInputPort>(TYPES.MUserInfoUseCaseInputPort).to(MUserInfoUseCase);


export default myContainer;
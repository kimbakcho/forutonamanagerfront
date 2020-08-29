
import store from '@/store';
import {MUserInfoResDto} from "@/ManagerBis/MUserInfo/Dto/MUserInfoResDto";
import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
@Module({
    namespaced: true,
    name: 'UserInfoVuex',
    store,
    dynamic: true,
})
class UserInfoVuex extends VuexModule {

    userInfo: MUserInfoResDto = new MUserInfoResDto();

    @Mutation
    updateUserInfo(userInfoDto: MUserInfoResDto) {
        this.userInfo = userInfoDto;
    }


}
export default getModule(UserInfoVuex);

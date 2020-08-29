import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from "vuex-module-decorators";

import store from '@/store';
@Module({
    namespaced: true,
    name: 'GlobalUiKeyVuex',
    store,
    dynamic: true,
})
class GlobalUiKeyVuex extends VuexModule {

    loginBtnKey = 0;

    @Mutation
    updateBtnKey() {
        this.loginBtnKey++;
    }


}
export default getModule(GlobalUiKeyVuex);

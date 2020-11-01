
import store from '@/store';
import {getModule, Module, VuexModule} from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: 'AppVuex',
    store,
    dynamic: true,
})
class AppVuex extends VuexModule {



}
export default getModule(AppVuex);
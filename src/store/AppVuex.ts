
import store from '@/store';
import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {LoginManager} from "vueoauth2login";
@Module({
    namespaced: true,
    name: 'AppVuex',
    store,
    dynamic: true,
})
class AppVuex extends VuexModule {

    loginManager: LoginManager|Object = new Object();


    @Mutation
    setLoginManager(value: LoginManager): void{
        console.log("setLoginManager");
        this.loginManager = value;
    }

}
export default getModule(AppVuex);
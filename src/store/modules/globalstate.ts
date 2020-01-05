import Vue from "vue";
import Vuex from "vuex";
import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
  MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import Userinfo from "@/components/Userinfo";

export interface IGlobalState {
  app_toolbar_search_text: String;
  Logininfo: Userinfo;
}

@Module({
  store,
  name: "GlobalSatete",
  namespaced: true,
  dynamic: true
})
class GlobalSatete extends VuexModule implements IGlobalState {
  app_toolbar_search_text: String = "";
  Logininfo = new Userinfo();

  @Mutation
  set_app_toolbar_search_text(Value: String) {
    this.app_toolbar_search_text = Value;
  }

  @Mutation
  Login(Userinfo: Userinfo) {
    this.Logininfo = Userinfo;
    localStorage.setItem("accesstoken", Userinfo.accesstoken);
  }

  @Action({ commit: "Login" })
  async onLogin(info: Userinfo) {
    return await Userinfo.Login(info.uid, info.password);
  }
}
export default getModule(GlobalSatete);

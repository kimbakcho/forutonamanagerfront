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
import axios from "axios";

export interface IGlobalState {
  app_toolbar_search_text: String;
  Logininfo: Userinfo | null;
  RefreshTokenTimer: number | null;
}

@Module({
  store,
  name: "GlobalSatete",
  namespaced: true,
  dynamic: true
})
class GlobalSatete extends VuexModule implements IGlobalState {
  app_toolbar_search_text: String = "";
  Logininfo: Userinfo | null = null;
  RefreshTokenTimer: number | null = null;

  @Mutation
  set_app_toolbar_search_text(Value: String) {
    this.app_toolbar_search_text = Value;
  }

  @Mutation
  Login(Userinfo: Userinfo) {
    this.Logininfo = Userinfo;
    axios.defaults.headers["Authorization"] = "Bearer " + Userinfo.accesstoken;
    localStorage.setItem("accesstoken", Userinfo.accesstoken);
  }

  @Mutation
  Logout() {
    this.Logininfo = null;
    axios.defaults.headers["Authorization"] = "";
    localStorage.removeItem("accesstoken");
  }

  @Mutation
  ReFreshToken(token: string) {
    if (this.Logininfo != null) {
      if (token === undefined) {
        //Logout 처리
        this.Logininfo = null;
        axios.defaults.headers["Authorization"] = "";
        localStorage.removeItem("accesstoken");
      } else {
        this.Logininfo.accesstoken = token;
        axios.defaults.headers["Authorization"] = "Bearer " + token;
        localStorage.setItem("accesstoken", token);
      }
    }
  }

  @Mutation
  setRefreshTokenTimer(Timer: number | null) {
    this.RefreshTokenTimer = Timer;
  }

  @Action({ commit: "ReFreshToken" })
  async onReFreshToken() {
    if (this.Logininfo != null) {
      return await this.Logininfo.RefrashToken();
    } else {
      return null;
    }
  }

  @Action({ commit: "Login" })
  async onLogin(info: Userinfo) {
    return await Userinfo.Login(info.uid, info.password);
  }
}
export default getModule(GlobalSatete);

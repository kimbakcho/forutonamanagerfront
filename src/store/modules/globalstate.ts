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

@Module({
  store,
  name: "GlobalSatete",
  dynamic: true
})
class GlobalSatete extends VuexModule {
  app_toolbar_search_text: String = "";
  Logininfo: Userinfo | null = null;
  RefreshTokenTimer: number | null = null;

  @Mutation
  set_app_toolbar_search_text(Value: String) {
    this.app_toolbar_search_text = Value;
  }

  @Mutation
  Login(userinfo: Userinfo) {
    this.Logininfo = userinfo;
    if (this.Logininfo != null) {
      axios.defaults.headers["Authorization"] =
        "Bearer " + userinfo.access_token;
      localStorage.setItem("access_token", userinfo.access_token);
      localStorage.setItem("refresh_token", userinfo.refresh_token);
    }
  }

  @Mutation
  Logout() {
    this.Logininfo = null;
    axios.defaults.headers["Authorization"] = "";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  @Mutation
  ReFreshToken(userinfo: Userinfo) {
    this.Logininfo = userinfo;
    if (this.Logininfo != null) {
      axios.defaults.headers["Authorization"] =
        "Bearer " + userinfo.access_token;
      localStorage.setItem("access_token", userinfo.access_token);
      localStorage.setItem("refresh_token", userinfo.refresh_token);
    } else {
      axios.defaults.headers["Authorization"] = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  @Mutation
  setRefreshTokenTimer(Timer: number | null) {
    this.RefreshTokenTimer = Timer;
  }

  @Action({ commit: "ReFreshToken" })
  async onReFreshToken(refresh_token: string) {
    if (refresh_token != null) {
      return await Userinfo.getRefrashToken(refresh_token);
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

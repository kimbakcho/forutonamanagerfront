<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/notice">
          <v-list-item-action>
            <v-icon>notifications</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>FCM</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Home 컨텐츠</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                메인
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                HotPick
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>유저</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                활동유저
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                탈퇴유저
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>큐브</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                퀘스트큐브
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                이슈큐브
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>국내환전신청</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                접수전
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                접수 완료
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                송금완료
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                송금 실패
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>해외환전신청</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                접수전
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                접수완료
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                송금완료
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                송금 실패
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>고객문의</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>FAQ</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>약관및 정책</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                서비스 이용약관
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                개인정보 처리 방침
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <div class="ml-5">
                위치정보 처리 방침
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Forutona</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLogin == true" class="mr-4">
        {{ Logininfo.nickname }} 님 환영 합니다.
      </div>
      <v-btn v-if="isLogin == false" to="/Login" color="secondary">Login</v-btn>
      <v-btn v-else color="secondary" @click="Logout">Logout</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { deserialize } from "class-transformer";
import GlobalSatete from "@/store/modules/globalstate";
import Userinfo from "@/components/Userinfo";
@Component({})
export default class App extends Vue {
  drawer: boolean = true;

  created() {
    this.cinit();
  }
  async cinit() {
    let accesstoken = localStorage.getItem("accesstoken");
    if (accesstoken != "undefined" && accesstoken != null) {
      let decodebase64 = accesstoken.split(".")[1];
      let decode = atob(decodebase64);
      let parsecode = JSON.parse(decode);
      let info = new Userinfo();
      info.uid = parsecode.uid;
      info.nickname = parsecode.nickname;
      info.accesstoken = accesstoken;
      GlobalSatete.Login(info);
      await GlobalSatete.onReFreshToken();
      if (GlobalSatete.RefreshTokenTimer === null) {
        GlobalSatete.setRefreshTokenTimer(
          setInterval(this.RefreshTokenFunc, 1800000)
        );
      }
    }
  }
  Logout() {
    GlobalSatete.Logout();
    if (GlobalSatete.RefreshTokenTimer !== null) {
      clearInterval(GlobalSatete.RefreshTokenTimer);
      GlobalSatete.setRefreshTokenTimer(null);
    }
  }

  async RefreshTokenFunc() {
    if (GlobalSatete.Logininfo != null) {
      await GlobalSatete.onReFreshToken();
    }
  }

  get isLogin(): boolean {
    if (GlobalSatete.Logininfo == null) {
      return false;
    } else {
      return true;
    }
  }
  get Logininfo(): Userinfo | null {
    return GlobalSatete.Logininfo;
  }
}
</script>

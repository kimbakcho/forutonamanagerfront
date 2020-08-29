<template>
    <div class="SignStateBtn" :key="globalUiKeyVuex.loginBtnKey">
        <v-btn small v-if="getIsSignOut()" icon to="/login">
            <v-icon>mdi-login</v-icon>
        </v-btn>
        <div v-if="getIsSignIn()" class="d-flex align-center">
            <div>{{getUserName()}}</div>
            <v-btn icon small @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">


    import GlobalUiKeyVuex from "../../store/GlobalUiKeyVuex";
    import {Component,Vue} from "vue-property-decorator";
    import container from "../../inversify.config";
    import TYPES from "../../ManagerBis/ManagerBisTypes";
    import UserInfoVuex from "../../store/UserInfoVuex";
    // eslint-disable-next-line no-unused-vars
    import {SignInUseUseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignInUseUseInputPort";
    // eslint-disable-next-line no-unused-vars
    import {LogoutUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/LogoutUseCaseInputPort";

    @Component({})
    export default class SignStateBtn extends Vue {
        _signInUseUseInputPort!: SignInUseUseInputPort;
        _logoutUseCaseInputPort!: LogoutUseCaseInputPort;
        globalUiKeyVuex = GlobalUiKeyVuex;

        created() {
            this._signInUseUseInputPort = container.get<SignInUseUseInputPort>(
                TYPES.SignInUseUseInputPort
            );
            this._logoutUseCaseInputPort = container.get<LogoutUseCaseInputPort>(
                TYPES.LogoutUseCaseInputPort
            );
        }
        async logout() {
            await this._logoutUseCaseInputPort.logout();
            GlobalUiKeyVuex.updateBtnKey();
        }

        getIsSignIn(): boolean {
            return this._signInUseUseInputPort.isSignIn();
        }

        getIsSignOut(): boolean {
            return !this._signInUseUseInputPort.isSignIn();
        }

        getUserName(): string {
            return UserInfoVuex.userInfo.userName;
        }
    }
</script>

<style lang="scss">
</style>

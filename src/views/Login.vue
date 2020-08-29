<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom></v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Login"
                                    v-model="ID"
                                    name="login"
                                    prepend-icon="mdi-account"
                                    type="text"
                            ></v-text-field>
                            <v-text-field
                                    v-model="PW"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" to="/SignUp">회원 가입</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import {
        // eslint-disable-next-line no-unused-vars
        LogInIdPwUseCase, LoginUseCaseInputPort
    } from "../ManagerBis/MUserInfo/Domain/UserCase/LoginUseCaseInputPort";
    import container from "../inversify.config";
    import TYPES from "../ManagerBis/ManagerBisTypes";
    import GlobalUiKeyVuex from "../store/GlobalUiKeyVuex";
    // eslint-disable-next-line no-unused-vars
    import { OAuth2Repository } from '@/ManagerBis/MUserInfo/Domain/Repository/OAuth2Repository';
    // eslint-disable-next-line no-unused-vars
    import {SignInUseUseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignInUseUseInputPort";
    // eslint-disable-next-line no-unused-vars
    import {ReFreshTokenTimer} from "@/ManagerBis/MUserInfo/Domain/UserCase/ReFreshTokenTimer";
    // eslint-disable-next-line no-unused-vars
    import {LogoutUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/LogoutUseCaseInputPort";


    @Component({})
    export default class Login extends Vue {
        private _loginUseCaseInputPort!: LoginUseCaseInputPort;

        ID = "";
        PW = "";

        async login() {
            this._loginUseCaseInputPort = new LogInIdPwUseCase(
                this.ID,
                this.PW,
                container.get<OAuth2Repository>(TYPES.OAuth2Repository),
                container.get<SignInUseUseInputPort>(TYPES.SignInUseUseInputPort),
                container.get<ReFreshTokenTimer>(TYPES.ReFreshTokenTimer),
                container.get<LogoutUseCaseInputPort>(TYPES.LogoutUseCaseInputPort)
            );
            try {
                await this._loginUseCaseInputPort.login();
                await this.$router.push({ path: "/" });
                GlobalUiKeyVuex.updateBtnKey();
            } catch (ex) {
                alert(ex.response.data.error_description);
            }
        }
    }
</script>

<style lang="scss">
</style>

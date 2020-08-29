<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <SignStateBtn></SignStateBtn>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import "reflect-metadata";
    import container from "@/inversify.config";
    import {Component, Vue} from "vue-property-decorator";
    import GlobalUiKeyVuex from "@/store/GlobalUiKeyVuex";
    import TYPES from "@/ManagerBis/ManagerBisTypes";
    // eslint-disable-next-line no-unused-vars
    import {OAuth2Repository} from "@/ManagerBis/MUserInfo/Domain/Repository/OAuth2Repository";
    // eslint-disable-next-line no-unused-vars
    import {SignInUseUseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignInUseUseInputPort";
    // eslint-disable-next-line no-unused-vars
    import {ReFreshTokenTimer} from "@/ManagerBis/MUserInfo/Domain/UserCase/ReFreshTokenTimer";
    // eslint-disable-next-line no-unused-vars
    import {LogoutUseCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/LogoutUseCaseInputPort";
    import {LogInRefreshTokenUseCase} from "@/ManagerBis/MUserInfo/Domain/UserCase/LoginUseCaseInputPort";
    import SignStateBtn from "@/components/SignState/SignStateBtn.vue";

    @Component({
        components: {
            SignStateBtn
        }
    })
    export default class App extends Vue {
        drawer: boolean | null = null;

        async created() {
            const loginUseCaseInputPort = new LogInRefreshTokenUseCase(
                container.get<OAuth2Repository>(TYPES.OAuth2Repository),
                container.get<SignInUseUseInputPort>(TYPES.SignInUseUseInputPort),
                container.get<ReFreshTokenTimer>(TYPES.ReFreshTokenTimer),
                container.get<LogoutUseCaseInputPort>(TYPES.LogoutUseCaseInputPort)
            );
            await loginUseCaseInputPort.login();
            GlobalUiKeyVuex.updateBtnKey()
        }
    }
</script>

<style lang="scss">
</style>

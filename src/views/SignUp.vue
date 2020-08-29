<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>회원가입</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom></v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="joinValidForm" v-model="joinValid">
                            <v-text-field
                                    label="ID"
                                    name="ID"
                                    v-model="ID"
                                    prepend-icon="mdi-account"
                                    :rules="IDRules"
                                    type="text"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    label="PW"
                                    name="PW"
                                    :rules="PWRules"
                                    v-model="PW"
                                    prepend-icon="mdi-account-key"
                                    type="password"
                            ></v-text-field>
                            <v-text-field
                                    label="Name"
                                    name="Name"
                                    :rules="NameRules"
                                    v-model="Name"
                                    prepend-icon="mdi-account-box"
                                    type="text"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    label="group"
                                    name="gorup"
                                    v-model="group"
                                    prepend-icon="mdi-account-multiple"
                                    type="text"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="end" class="mr-1 mr-md-3">
                            <v-btn @click="joinAction" color="#60A3E5" dark>
                                <v-icon>mdi-account-multiple-plus</v-icon>회원가입
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Vue, Component, Ref } from "vue-property-decorator";
    import container from "../inversify.config";
    import TYPES from "../ManagerBis/ManagerBisTypes";
    import {SignUpReqDto} from "../ManagerBis/MUserInfo/Dto/SignUpReqDto";
    // eslint-disable-next-line no-unused-vars
    import {SignUpCaseInputPort} from "@/ManagerBis/MUserInfo/Domain/UserCase/SignUpCaseInputPort";


    @Component({})
    export default class SignUp extends Vue {
        @Ref("joinValidForm")
        joinValidForm: any;

        private _signUpUseCaseInputPort!: SignUpCaseInputPort;

        created() {
            this._signUpUseCaseInputPort = container.get<SignUpCaseInputPort>(
                TYPES.SignUpUseCaseInputPort
            );
        }

        ID = "";
        PW = "";
        Name = "";
        group = "";
        joinValid = false;

        IDRules = [(v: string) => !!v || "ID 입력 해 주세요"];
        PWRules = [(v: string) => !!v || "PW 입력 해 주세요"];
        NameRules = [(v: string) => !!v || "Name 입력 해 주세요"];

        async joinAction() {
            this.joinValidForm.validate();
            if (this.joinValid) {
                const reqDto = new SignUpReqDto();
                reqDto.uid = this.ID;
                reqDto.passWord = this.PW;
                reqDto.userName = this.Name;
                reqDto.groupName = this.group;
                try {
                    await this._signUpUseCaseInputPort.signUp(reqDto);
                    await this.$router.push({ path: "/Login" });
                } catch (error) {
                    alert("회원 가입에 문제가 있습니다." + error.response.data.message);
                }
            }
        }
    }
</script>

<style lang="scss">
</style>

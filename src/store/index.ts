import Vue from "vue";
import Vuex from "vuex";
import { IGlobalState } from "./modules/globalstate";

Vue.use(Vuex);
export interface IRootState {
  globalstate: IGlobalState;
}

export default new Vuex.Store<IRootState>({});

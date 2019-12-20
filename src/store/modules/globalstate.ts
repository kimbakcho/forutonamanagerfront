import Vue from 'vue';
import Vuex from 'vuex';
import { Module, VuexModule, Mutation,getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IGlobalState {
    app_toolbar_search_text :String 
}
  
@Module({
    store,
    name: "GlobalSatete",
    namespaced: true,
    dynamic: true
})
class GlobalSatete extends VuexModule implements IGlobalState{
app_toolbar_search_text :String = ''

  @Mutation
    set_app_toolbar_search_text(Value: String) {
    this.app_toolbar_search_text = Value;
  }
}
 export default getModule(GlobalSatete);
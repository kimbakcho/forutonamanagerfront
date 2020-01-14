<template>
  <div class="CubePageMain">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CubePageMain extends Vue {}
</script>

<style lang="scss">
</style>
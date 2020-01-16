<template>
  <div class="FAQPageMain">
    <v-col>
      <v-row justify="center">
        <v-col cols="11">
          <v-row>
            <div class="headline">FAQ</div>
            <v-spacer></v-spacer>
            <v-btn color="primary">새 FAQ</v-btn>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-data-table></v-data-table>
                <v-pagination></v-pagination>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
interface TableHeader {
  text: string;
  value: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  filterable?: boolean;
  divider?: boolean;
  class?: string | string[];
  width?: string | number;
  filter?: (value: any, search: string, item: any) => boolean;
  sort?: (a: any, b: any) => number;
}
interface DataOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  sortDesc: boolean[];
  groupBy: string[];
  groupDesc: boolean[];
  multiSort: boolean;
  mustSort: boolean;
}
@Component({})
export default class FAQPageMain extends Vue {
  pagenationpage = 1;
  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ["idx"],
    sortDesc: [false],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false
  };
    items: [] = [];
  isloading = false;
  totalpagelength: number = 0;
}
</script>

<style lang="scss">
</style>
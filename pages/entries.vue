<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-list>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  components: {},
  async asyncData(context) {
    var items = new Array();
    var row = { id: "a", title: "heyyya" };
    items.push(row);
    row = { id: "2", title: "dkfdk" };
    items.push(row);

    return { items };
  }
};
</script>

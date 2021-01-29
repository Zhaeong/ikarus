<template>
  <v-card class="mx-auto" max-width="700" tile>
    <v-list rounded outlined>
      <v-list-item-group color="primary">
        <v-list-item
          :to="{ name: 'entry', params: { id: item.id } }"
          two-line
          v-for="item in items"
          :key="item.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>

            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  components: {},
  async asyncData(context) {
    var items = new Array();
    var row = {
      id: "a",
      title:
        "heyyya sdfskdjlfjsdlkjfds fsd fsd fsdlk fsd fsd fjsldkf sdl fjsld jfsd f"
    };
    items.push(row);
    row = { id: "2", title: "dkfdk" };
    items.push(row);

    return { items };
  }
};
</script>

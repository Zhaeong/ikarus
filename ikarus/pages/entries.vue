<template>
  <v-card class="mx-auto" max-width="700" tile>
    <v-list rounded outlined>
      <v-list-item-group color="primary">
        <v-list-item
          :to="{
            name: 'entry',
            params: { id: item.id, title: item.title, content: item.content }
          }"
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
    <v-btn fab fixed bottom right color="primary" :to="{ name: 'entry' }">
      +
    </v-btn>
  </v-card>
</template>
<script>
export default {
  components: {},
  async asyncData(context) {
    var url = process.env.BASE_URL + "/api/fire";
    let { data } = await context.$axios.get(url);

    var items = new Array();

    //    var row = { id: "1", title: "sample" };
    //    items.push(row);

    for (var i = 0; i < data.length; i++) {
      var row = {
        id: data[i]._id,
        title: data[i].title,
        content: data[i].content
      };
      items.push(row);
    }
    return { items };
  }
};
</script>

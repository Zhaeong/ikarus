<template>
  <v-layout color="primary">
    <v-col cols="12" sm="9" md="10">
      <div
        :to="{
          name: 'entry',
          params: { id: item.id, title: item.title, content: item.content }
        }"
        two-line
        v-for="item in items"
        :key="item.id"
      >
        <v-card>
          <v-card-title class="title">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="date">
            {{ item.date }}
          </v-card-text>
          <v-card-text class="contents">
            {{ item.content }}
          </v-card-text>
        </v-card>
        <v-divider class="pa-md-1"></v-divider>
      </div>
    </v-col>
  </v-layout>
</template>
<style>
.title {
  padding-bottom: 0;
}
.date {
  padding-bottom: 0;
  font-style: italic;
}
.contents {
  padding-top: 1px;
}
</style>
<script>
export default {
  components: {},
  async asyncData(context) {
    var url = process.env.BASE_URL + "/api/fire";
    let { data } = await context.$axios.get(url);

    var items = new Array();

    for (var i = 0; i < data.length; i++) {
      var row = {
        id: data[i]._id,
        title: data[i].title,
        content: data[i].content,
        date: data[i].date
      };
      items.push(row);
    }
    return { items };
  }
};
</script>

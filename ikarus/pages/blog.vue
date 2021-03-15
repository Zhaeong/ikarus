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
          <v-card-text class="text--primary">
            <!--This is going through the text and splitting on newline since it doesn't by default 
            <div v-for="(text, index) in item.content.split('\n')" :key="index">
              {{ text }}
            </div>
            -->
            <v-textarea
              class="contents"
              v-model="item.content"
              rows="1"
              auto-grow
              readonly
            >
            </v-textarea>
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
  padding-top: 0px;
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

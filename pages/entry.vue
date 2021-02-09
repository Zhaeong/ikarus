<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="title"
      label="Title"
      placeholder="testset"
    ></v-text-field>
    <v-text-field
      v-model="content"
      label="Content"
      placeholder="testset"
    ></v-text-field>
    <v-btn @click="addEntry()" depressed color="primary">
      Add
    </v-btn>
  </v-form>
</template>
<script>
import ErrorAlert from "~/components/ErrorAlert.vue";
export default {
  components: { ErrorAlert },
  async asyncData(context) {
    console.log(context.params);
    var out = context.params.id;
    console.log("inputery: ", out);
    //title = context.params.title;
    return { title: context.params.title, content: context.params.content };
  },
  data() {},
  methods: {
    async addEntry() {
      console.log("yyaaa?");

      console.log(this.title);
      var postData = { title: this.title, content: this.content };

      console.log("posty", postData);
      var url = "/api/add";
      let { data } = await this.$axios.post(url, postData);
      console.log("clientresponse: ", data);
    }
  }
};
</script>

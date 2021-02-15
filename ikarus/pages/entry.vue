<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="title"
      label="Title"
      placeholder="testset"
    ></v-text-field>
    <v-textarea
      v-model="content"
      label="Content"
      placeholder="testset"
    ></v-textarea>
    <v-btn v-show="add" @click="addEntry()" depressed color="primary">
      Add
    </v-btn>
    <v-btn v-show="!add" @click="editEntry()" depressed color="primary">
      Edit
    </v-btn>
    <v-btn v-show="!add" @click="deleteEntry()" depressed color="red">
      Delete
    </v-btn>
    <ErrorAlert ref="erralert" />
    <ConfirmAlert ref="confalert" />
  </v-form>
</template>
<script>
import ErrorAlert from "~/components/ErrorAlert.vue";
import ConfirmAlert from "~/components/ConfirmAlert.vue";
export default {
  components: { ErrorAlert, ConfirmAlert },
  async asyncData(context) {
    var out = context.params.id;

    var isAdd = false;
    var sTitle = "";
    var sContent = "";
    var entryID = -1;
    if (typeof out == "undefined") {
      isAdd = true;
    } else {
      sTitle = context.params.title;
      sContent = context.params.content;
      entryID = context.params.id;
      isAdd = false;
    }

    return {
      add: isAdd,
      id: entryID,
      title: sTitle,
      content: sContent
    };
    //title = context.params.title;
  },
  data() {},
  methods: {
    async addEntry() {
      if (this.title == "" || this.content == "") {
        this.$refs.erralert.open("ERROR", "Title or Content can't be empty");
      } else {
        console.log(this.title);
        var postData = { title: this.title, content: this.content };

        var url = process.env.BASE_URL + "/api/add";
        let { data } = await this.$axios.post(url, postData);
        this.add = false;
      }
    },
    async editEntry() {
      var isEdit = await this.$refs.confalert
        .open("Confirmation", "U sure to edit Brah?")
        .catch(error => {
          console.log("Something Went Wrong with confirmDialog:", error);
        });

      if (isEdit) {
        var postData = {
          id: this.id,
          title: this.title,
          content: this.content
        };

        var url = process.env.BASE_URL + "/api/edit";
        let { data } = await this.$axios.post(url, postData);
        console.log("clientresponse: ", data);
      }
    },
    async deleteEntry() {
      var isDelete = await this.$refs.confalert
        .open("Confirmation", "U sure Brah?")
        .catch(error => {
          console.log("Something Went Wrong with confirmDialog:", error);
        });
      console.log("returnation", isDelete);
      if (isDelete) {
        console.log("imma kill that bitch");
        var postData = { id: this.id };
        var url = process.env.BASE_URL + "/api/delete";
        let { data } = await this.$axios.post(url, postData);
        console.log("clientresponse: ", data);
        //This redirects page to /entries
        this.$router.push("/entries");
      }
    }
  }
};
</script>

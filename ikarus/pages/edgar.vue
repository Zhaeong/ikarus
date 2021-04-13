<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          EDGAR
        </v-card-title>
        <v-card-text> {{ content }} </v-card-text>
        <v-btn @click="getEdgar()" depressed color="primary">
          Get Info
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  async asyncData(context) {
    return { content: "bbb" };
  },
  computed: {
    getLoginInfo() {
      var loginName = this.$store.getters.getLogin;
      return loginName;
    }
  },
  methods: {
    async getEdgar() {
      var url = process.env.BASE_URL + "/api/edgar";
      var retVal = await this.$axios.get(url);
      let data = retVal.data;
      let dataArray = JSON.parse(data);

      console.log(dataArray);
      this.content = dataArray.directory.item[0];
    }
  }
};
</script>

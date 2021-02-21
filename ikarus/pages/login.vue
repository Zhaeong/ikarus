<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="password"
      label="Password"
      placeholder="Password"
    ></v-text-field>
    <v-btn @click="loginUser()" depressed color="primary">
      Login
    </v-btn>

    <ErrorAlert ref="erralert" />
  </v-form>
</template>
<script>
import ErrorAlert from "~/components/ErrorAlert.vue";
export default {
  components: { ErrorAlert },
  async asyncData(context) {
    return {
      user: "",
      password: ""
    };
  },
  data() {},
  methods: {
    async loginUser() {
      console.log("trying to login: ", this.password);
      let postData = { password: this.password };

      let url = process.env.BASE_URL + "/api/login";
      let retVal = await this.$axios.post(url, postData);

      if ("User" in retVal.data && retVal.data.User == "Johnny") {
        let user = retVal.data.User;
        this.$store.commit("setLogin", user);
        this.$router.push("/");
      } else {
        this.$refs.erralert.open("FAILED", "Incorrect Password");
      }
    }
  }
};
</script>

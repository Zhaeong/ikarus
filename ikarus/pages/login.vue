<template>
  <v-form ref="form" lazy-validation>
    <v-text-field v-model="user" label="User" placeholder="User"></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      placeholder="Password"
    ></v-text-field>
    <v-btn @click="loginUser()" depressed color="primary">
      Login
    </v-btn>
  </v-form>
</template>
<script>
export default {
  async asyncData(context) {
    return {
      user: "",
      password: ""
    };
  },
  data() {},
  methods: {
    loginUser() {
      console.log("trying to login: ", this.user);

      this.$store.commit("setLogin");

      console.log("afterVal: ", this.$store.state.isLoggedIn);
    }
  }
};
</script>

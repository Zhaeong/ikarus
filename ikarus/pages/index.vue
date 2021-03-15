<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Hello
        </v-card-title>
        <v-card-text>
          {{ item }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/blog">
            Blog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData(context) {
    var url = process.env.BASE_URL + "/api/title";
    var retVal = await context.$axios.get(url);
    var item = retVal.data;
    if (process.server) {
      console.log("Is server process", item);
    }
    return { item };
  },
  computed: {
    getLoginInfo() {
      var loginName = this.$store.getters.getLogin;
      return loginName;
    }
  }
};
</script>

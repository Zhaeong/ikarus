<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!--
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      -->
      <v-card>
        <v-card-title class="headline">
          Owen Zhang
        </v-card-title>
        <v-card-text>
          {{ item }}
        </v-card-text>

        <v-card-text> heyyy {{ getLoginInfo }} </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
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
    console.log("here?");

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
      //      var isLoggedin = this.$store.state.isLoggedIn;
      var isLoggedin = this.$store.getters.getLogin;
      var mainText = "ERROR";
      if (!isLoggedin) {
        mainText = "not loggged in";
      } else {
        mainText = "logged in";
      }

      console.log("islog: ", this.$store.getters.getLogin);
      return mainText;
    }
  }
};
</script>

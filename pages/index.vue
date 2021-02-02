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
          <p>
            An exploratory personal website made with a modern js framework,
            which is a baffling 40mb after build for serving what is essentially
            text!
          </p>
          {{ item }}
        </v-card-text>
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
    var item = "heyyoo";

    var url = "/api/title";
    let { data } = await context.$axios.get(url);
    console.log("type:", typeof data);
    console.log("here:", data);
    item = data;
    if (process.server) {
      console.log("Is server process");
    }
    return { item };
  }
};
</script>

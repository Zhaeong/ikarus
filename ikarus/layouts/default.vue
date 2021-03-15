<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <template v-if="getLogin">
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      {{ getLoginInfo }}
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    var name = this.$store.getters.getLogin;
    return {
      loginName: name,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Blog",
          to: "/blog"
        },
        {
          icon: "mdi-allergy",
          title: "Login",
          to: "/login"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Ozhang"
    };
  },

  computed: {
    getLoginInfo() {
      var loginName = this.$store.getters.getLogin;
      return loginName;
    },
    getLogin() {
      console.log("calling getLogin Default");
      var loginState = this.$store.getters.getLoginState;
      if (loginState) {
        this.items = [
          {
            icon: "mdi-apps",
            title: "Home",
            to: "/"
          },
          {
            icon: "mdi-chart-bubble",
            title: "Blog",
            to: "/blog"
          },
          {
            icon: "mdi-allergy",
            title: "Entries",
            to: "/entries"
          },
          {
            icon: "mdi-allergy",
            title: "Login",
            to: "/login"
          }
        ];
      }
      //This function seems to only be called when the log state is changed, it's somehow mapped to that varable
      return true;
    }
  }
};
</script>

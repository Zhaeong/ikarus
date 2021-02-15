<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="headline primary">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <div class="text-h5 pa-4">
          {{ message }}
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirmed(true)">
          Yes
        </v-btn>
        <v-btn color="primary" text @click="confirmed(false)">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ConfirmAlert",
  data() {
    return {
      dialog: false,
      title: "",
      message: "",
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(title, message) {
      this.dialog = true;
      console.log("inini:", message);
      this.title = title;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirmed(val) {
      //this.reject("nah brah");
      this.resolve(val);
      this.dialog = false;
    }
  }
};
</script>

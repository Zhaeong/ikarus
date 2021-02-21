<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="headline red lighten-2">
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
        <v-btn color="primary" text @click="dialog = false">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ErrorAlert",
  data() {
    return { dialog: false, title: "", message: "" };
  },
  methods: {
    open(title, message) {
      this.dialog = true;
      console.log("inini:", message);
      this.title = title;
      this.message = message;
    }
  }
};
</script>

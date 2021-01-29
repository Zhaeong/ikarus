<template>
  <v-card class="mx-auto" max-width="700" tile>
    {{ out }}
  </v-card>
</template>
<script>
export default {
  components: {},
  async asyncData(context) {
    console.log(context.params);
    var out = context.params.id;
    return { out };
  }
};
</script>

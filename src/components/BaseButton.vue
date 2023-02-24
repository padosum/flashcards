<template>
  <v-btn variant="outlined" role="button">
    {{ text }}
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
});
</script>

<style scoped></style>

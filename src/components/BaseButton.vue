<template>
  <v-btn role="button" variant="outlined">
    {{ text }}
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
});
</script>

<style scoped></style>

<template>
  <v-btn variant="outlined" :to="`/learn/${route.params.id}`">
    학습 시작하기</v-btn
  >
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>

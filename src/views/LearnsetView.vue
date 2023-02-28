<template>
  <BaseButton text="학습 시작하기" :to="`/learn/${route.params.id}`" />
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>

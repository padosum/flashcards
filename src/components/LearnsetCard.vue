<template>
  <div>안녕하세요</div>
  <div>
    <ul>
      <li>반갑습니다</li>
      <li>하하하하</li>
    </ul>
    <v-btn role="button" data-testid="show-answer-btn">정답 확인하기</v-btn>
    <v-btn variant="outlined" :disabled="submitted">
      5
      <v-tooltip activator="parent" location="bottom">완벽한 응답</v-tooltip>
    </v-btn>

    <v-btn variant="outlined" :disabled="submitted">
      4
      <v-tooltip activator="parent" location="bottom"
        >망설임 끝에 올바른 응답</v-tooltip
      >
    </v-btn>

    <v-btn variant="outlined" :disabled="submitted">
      3
      <v-tooltip activator="parent" location="bottom"
        >올바른 응답이지만 기억해 내기 어려움</v-tooltip
      >
    </v-btn>

    <v-btn variant="outlined" :disabled="submitted">
      2
      <v-tooltip activator="parent" location="bottom"
        >잘못된 응답, 정답을 쉽게 기억할 수는 있음</v-tooltip
      >
    </v-btn>
    <v-btn variant="outlined" :disabled="submitted">
      1
      <v-tooltip activator="parent" location="bottom"
        >잘못된 응답, 올바른 응답을 기억함</v-tooltip
      >
    </v-btn>
    <v-btn variant="outlined" :disabled="submitted">
      0
      <v-tooltip activator="parent" location="bottom"
        >전혀 기억이 안남</v-tooltip
      >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Card } from '@/types/interfaces';

const submitted = ref(true);
defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
});
</script>

<style scoped></style>

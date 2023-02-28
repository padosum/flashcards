<template>
  <div class="d-flex flex-column pa-3 w-100">
    <h2 class="text-h5 font-weight-black">{{ card.title }}</h2>
    <v-textarea
      label="내 답변"
      :disabled="showBack"
      variant="outlined"
      clearable
      auto-grow
      class="pa-3"
      rows="2"
    ></v-textarea>
    <div class="d-flex justify-center" v-if="!showBack">
      <BaseButton
        text="정답 확인하기"
        variant="outlined"
        data-testid="show-answer-btn"
        @click="showBack = !showBack"
      />
    </div>
    <div class="d-flex flex-column pa-3" v-else>
      <v-card variant="outlined">
        <v-card-title class="font-weight-bold">정답</v-card-title>
        <v-card-text class="text-left">
          <p v-html="backHtml" class="rounded-pill markdown-body"></p>
        </v-card-text>
      </v-card>

      <p class="mt-6 mb-2 text-body-2 text-left">
        정답과 유사한 정도에 따라 점수를 매기세요.
      </p>
      <div class="d-flex flex-wrap justify-space-around btn-wrapper">
        <BaseButton
          v-for="score in SCORES"
          :key="score.score"
          :text="score.score"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          <v-tooltip activator="parent" location="bottom" :disabled="submitted">
            {{ score.tooltip }}
          </v-tooltip>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';

import { ref, computed, type PropType } from 'vue';
import type { Card } from '@/types/interfaces';
import { useDisplay } from 'vuetify';
import { useMarkdownIt } from '@/plugins/markdownit';

import { SCORES } from '@/constants';

const showBack = ref(false);
const submitted = ref(false);

const submit = () => {
  submitted.value = true;
};

const prop = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const md = useMarkdownIt();
const backHtml = md.renderer.render(prop.card.back, md.options, {});

const { name } = useDisplay();

const size = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm':
      return 'x-small';
    default:
      return 'default';
  }
});
</script>

<style scoped>
.btn-wrapper {
  row-gap: 8px;
  column-count: 3;
}
</style>

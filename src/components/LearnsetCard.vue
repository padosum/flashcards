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
      <v-btn
        variant="outlined"
        data-testid="show-answer-btn"
        @click="showBack = !showBack"
      >
        정답 확인하기
      </v-btn>
    </div>
    <div class="d-flex flex-column pa-3" v-else>
      <v-card variant="outlined">
        <v-card-title class="font-weight-bold">정답</v-card-title>
        <v-card-text class="text-left">
          <p v-html="backHtml" class="rounded-pill"></p>
        </v-card-text>
      </v-card>

      <p class="mt-6 mb-2 text-body-2 text-left">
        정답과 유사한 정도에 따라 점수를 매기세요.
      </p>
      <div class="d-flex flex-wrap justify-space-around btn-wrapper">
        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          5
          <v-tooltip
            activator="parent"
            :size="size"
            location="bottom"
            :disabled="submitted"
          >
            완벽한 응답
          </v-tooltip>
        </v-btn>

        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          4
          <v-tooltip activator="parent" location="bottom" :disabled="submitted"
            >망설임 끝에 올바른 응답</v-tooltip
          >
        </v-btn>

        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          3
          <v-tooltip activator="parent" location="bottom" :disabled="submitted"
            >올바른 응답이지만 기억해 내기 어려움</v-tooltip
          >
        </v-btn>

        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          2
          <v-tooltip activator="parent" location="bottom" :disabled="submitted"
            >잘못된 응답, 정답을 쉽게 기억할 수는 있음</v-tooltip
          >
        </v-btn>
        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          1
          <v-tooltip activator="parent" location="bottom" :disabled="submitted"
            >잘못된 응답, 올바른 응답을 기억함</v-tooltip
          >
        </v-btn>
        <v-btn
          variant="outlined"
          :size="size"
          :disabled="submitted"
          @click="submit"
        >
          0
          <v-tooltip activator="parent" location="bottom" :disabled="submitted"
            >전혀 기억이 안남</v-tooltip
          >
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue';
import type { Card } from '@/types/interfaces';
import { useDisplay } from 'vuetify';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md: MarkdownIt = new MarkdownIt({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs">${
          hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`;
      } catch (__) {
        console.log('markdownit error');
      }
    }

    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(code) + '</code></pre>'
    );
  },
});

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

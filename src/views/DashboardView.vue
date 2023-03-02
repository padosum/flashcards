<template>
  <v-container class="container mb-10 text-white">
    <div class="d-flex flex-column fill-height justify-center align-center">
      <h1 class="text-h4 font-weight-black mb-4">FlashMD</h1>
      <h4 class="subheading">
        Markdown으로 작성된 파일로 flash card를 만들어 학습해 보세요!
      </h4>
    </div>
  </v-container>
  <div class="d-flex flex-column align-center pa-4">
    <p class="font-h5 font-weight-thin mt-6 mb-4">
      아래 버튼을 클릭해 카드 뭉치를 추가하거나 목록에서 카드 뭉치를 선택해
      학습을 시작하세요.
    </p>
    <div class="d-flex justify-space-around align-center mb-4">
      <BaseButton
        prepend-icon="mdi-file-plus"
        text="카드 뭉치 추가하기"
        class="mr-4"
        @click="importLearnset"
      />
      <AddLearnsetModal
        :learnset-title="mdFile.name"
        title="카드 뭉치 추가하기"
        ref="modal"
        @add-learnset="addLearnset"
      />
      <BaseButton
        prepend-icon="mdi-eye"
        text="예시 파일 확인하기"
        @click="showSample = !showSample"
      />
    </div>
    <template v-if="showSample">
      <v-sheet class="text-body-2 mx-auto">
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <v-textarea
                label="파일 내용"
                variant="outlined"
                class="mb-2"
                rows="10"
                v-model="sampleText"
              ></v-textarea>
            </v-col>

            <v-col cols="6">
              <h5 class="text-h6 font-weight-bold">작성 방법</h5>
              <p class="markdown-body mb-4 pa-0">
                카드의 앞면(질문)은 <code>h2(##)</code> 으로 작성합니다.<br />
                다음 질문이 나오기 전까지 내용이 해당 질문의 뒷면(답변)이
                됩니다.
              </p>

              <BaseButton
                text="파일 다운로드"
                @click="downloadSample"
                color="primary"
              ></BaseButton>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </template>
    <v-divider></v-divider>
    <v-container>
      <v-sheet class="pa-6 mx-auto" max-width="1000px">
        <LearnsetChart v-if="learnsets.length" />
        <LearnsetList v-if="learnsets" :learnsets="learnsets" />
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { File } from '@/types/interfaces';

import BaseButton from '@/components/BaseButton.vue';
import AddLearnsetModal from '@/components/AddLearnsetModal.vue';
import LearnsetList from '@/components/LearnsetList.vue';
import LearnsetChart from '@/components/LearnsetChart.vue';

import { ref, reactive, watch } from 'vue';

import { getLearnsetFromTokens } from '@/utils/learnset';

import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutations';
import { useMarkdownIt } from '@/plugins/markdownit';

import { useFileDialog } from '@vueuse/core';

import { SAMPLE_TEXT } from '@/constants';

import { useRouter } from 'vue-router';
import type { MyStore } from '@/store/types';

const store: MyStore = useStore();

const learnsets = store.state.learnsets;

const md = useMarkdownIt();

const mdFile: File = reactive({
  name: '',
  contents: '',
});

const modal = ref<InstanceType<typeof AddLearnsetModal> | null>(null);

const { files, open } = useFileDialog({
  multiple: false,
  accept: '.md,.markdown',
});

const importLearnset = () => {
  open();
};

watch(files, async () => {
  if (files.value) {
    mdFile.name = files.value[0].name.replace(/\.[^/.]+$/, '');
    mdFile.contents = await files.value[0].text();
    modal.value?.toggleModal();
  }
});

const router = useRouter();

const addLearnset = (name: string) => {
  const tokens = md.parse(mdFile.contents as string, {});
  const { cards, id, created } = getLearnsetFromTokens(tokens);

  router.push(`/learnset/${id}`);
  store.commit(MutationTypes.ADD_LEARNSET, { cards, id, created, name });
};

const showSample = ref(false);
const sampleText = ref(SAMPLE_TEXT);

const downloadSample = () => {
  const link = document.createElement('a');
  const content = sampleText.value;
  const file = new Blob([content], { type: 'text/plain' });

  link.href = URL.createObjectURL(file);

  link.download = 'sample.md';

  link.click();
  URL.revokeObjectURL(link.href);
};
</script>

<style scoped>
.container {
  height: 300px;
  background-color: var(--bg-color-dark);
}
</style>

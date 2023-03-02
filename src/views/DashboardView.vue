<template>
  <v-container class="container mb-10">
    <div class="d-flex flex-column fill-height justify-center align-center">
      <h1 class="text-h4 font-weight-black mb-4">FlashMD</h1>
      <h4 class="subheading">
        Markdown으로 작성된 파일로 flash card를 만들어 학습해 보세요!
      </h4>
    </div>
  </v-container>
  <div class="d-flex flex-column w-100 align-center">
    <p class="font-h5 font-weight-thin mt-6 mb-4">
      아래 버튼을 클릭해 카드 뭉치를 추가하거나 목록에서 카드 뭉치를 선택해
      학습을 시작하세요.
    </p>
    <BaseButton text="카드 뭉치 추가하기" @click="importLearnset" />
    <AddLearnsetModal
      :learnset-title="mdFile.name"
      title="카드 뭉치 추가하기"
      ref="modal"
      @add-learnset="addLearnset"
    />

    <v-divider></v-divider>
    <v-container>
      <v-sheet class="pa-6 mx-auto" max-width="1000">
        <LearnsetChart />
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

const { files, open, reset } = useFileDialog({
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
</script>

<style scoped>
.container {
  height: 300px;
  background-color: var(--bg-color);
}
</style>

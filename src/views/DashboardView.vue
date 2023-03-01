<template>
  <div class="d-flex">
    <div class="pa-10">
      <BaseButton text="카드 뭉치 추가하기" @click="importLearnset" />
      <AddLearnsetModal
        :learnset-title="mdFile.name"
        title="카드 뭉치 추가하기"
        ref="modal"
        @add-learnset="addLearnset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import fileDialog from 'file-dialog';
import type { File } from '@/types/interfaces';

import BaseButton from '@/components/BaseButton.vue';
import AddLearnsetModal from '@/components/AddLearnsetModal.vue';

import { ref, reactive } from 'vue';

import { getLearnsetFromTokens } from '@/utils/learnset';

import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutations';
import { useMarkdownIt } from '@/plugins/markdownit';

import { useRouter } from 'vue-router';

const store = useStore();

const md = useMarkdownIt();

const mdFile: File = reactive({
  name: '',
  contents: '',
});

const modal = ref<InstanceType<typeof AddLearnsetModal> | null>(null);

const importLearnset = async () => {
  const { name, contents } = await openDialog();
  mdFile.name = name;
  mdFile.contents = contents;

  modal.value?.toggleModal();
};

const openDialog = async (): Promise<File> => {
  const [file] = await fileDialog({ accept: '.md,.markdown' });

  return new Promise((resolve, reject) => {
    if (!file) reject(new Error('No file selected'));
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () =>
      resolve({
        name: file.name.replace(/\.[^/.]+$/, ''),
        contents: reader.result?.toString(),
      });
    reader.onerror = () => reject(new Error('No file selected'));
  });
};

const router = useRouter();

const addLearnset = (name: string) => {
  const tokens = md.parse(mdFile.contents as string, {});
  const { cards, id, created } = getLearnsetFromTokens(tokens);

  router.push(`/learnset/${id}`);
  store.commit(MutationTypes.ADD_LEARNSET, { cards, id, created, name });
};
</script>

<style scoped></style>

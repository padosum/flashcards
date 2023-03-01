<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <NavigationDrawer />
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div data-testid="toolbar-title">{{ pageTitle }}</div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <teamplte v-if="route.name === 'LearnsetView'">
        <BaseButton
          text=""
          icon
          data-testid="edit"
          variant="default"
          @click="toggleModal"
        >
          <v-icon>mdi-pencil</v-icon>
        </BaseButton>

        <BaseButton
          text=""
          icon
          data-testid="delete"
          variant="default"
          @click="deleteLearnset"
        >
          <v-icon>mdi-delete</v-icon>
        </BaseButton>
        <EditLearnsetModal
          :learnset-title="pageTitle"
          title="카드 뭉치 이름 수정하기"
          ref="modal"
          @edit-learnset="editLearnset"
          @reset-learnset="resetLearnset"
        />
      </teamplte>
    </v-app-bar>
    <v-main>
      <router-view :key="route.path" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import BaseButton from '@/components/BaseButton.vue';
import EditLearnsetModal from '@/components/EditLearnsetModal.vue';

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useStore } from 'vuex';
import type { MyStore } from '@/store/types';
import { MutationTypes } from '@/store/mutations';

const drawer = ref(true);

const route = useRoute();
const router = useRouter();

const store: MyStore = useStore();

const learnset = computed(() => {
  const learnset = store.state.learnsets.find(
    ({ id }) => id === route.params.id
  );

  return learnset;
});

const pageTitle = computed(() => {
  return learnset.value ? learnset.value.name : 'Dashboard';
});

const deleteLearnset = () => {
  const deleteLearnset = confirm(
    `"${pageTitle.value}" 카드 뭉치를 삭제하시겠습니까?`
  );

  if (deleteLearnset) {
    router.push('/');
    store.commit(MutationTypes.DELETE_LEARNSET, learnset.value);
  }
  return;
};

const modal = ref<InstanceType<typeof EditLearnsetModal> | null>(null);

const toggleModal = () => {
  modal.value?.toggleModal();
};

const editLearnset = (newTitle: string) => {
  if (learnset.value) {
    learnset.value.name = newTitle;
    store.commit(MutationTypes.UPDATE_LEARNSET, learnset.value);
  }
};

const resetLearnset = () => {
  if (learnset.value) {
    store.commit(MutationTypes.RESET_LEARNSET, learnset.value.id);
  }
};
</script>

<style scoped></style>

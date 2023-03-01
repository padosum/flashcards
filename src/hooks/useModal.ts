import { ref } from 'vue';
export default function useModal() {
  const open = ref(false);
  const toggleModal = () => {
    open.value = !open.value;
  };

  return {
    open,
    toggleModal,
  };
}

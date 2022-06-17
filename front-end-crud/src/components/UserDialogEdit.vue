<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserFormEdit from './UserFormEdit.vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const openDialog = ref(false);
    function closeDialog() {
      openDialog.value = false;
    }
    return {
      openDialog,
      closeDialog,
    };
  },
  components: { UserFormEdit },
});
</script>

<template>
  <div>
    <q-btn
      icon="edit"
      color="secondary"
      flat
      round
      dense
      @click="openDialog = true"
    />
    <q-dialog v-model="openDialog">
      <UserFormEdit @closeDialog="closeDialog" :id="id" />
    </q-dialog>
  </div>
</template>

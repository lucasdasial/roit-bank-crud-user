<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseUserForm from './BaseUserForm.vue';

export default defineComponent({
  props: {
    actionTypeButton: {
      type: String,
      required: true,
    },
    labelButton: {
      type: String,
      required: true,
    },
    labelForm: {
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
  components: { BaseUserForm },
});
</script>

<template>
  <div>
    <q-btn
      v-if="actionTypeButton == 'edit'"
      icon="edit"
      color="secondary"
      flat
      round
      dense
      @click="openDialog = true"
    />
    <q-btn
      v-if="actionTypeButton == 'create'"
      label="Cadastrar"
      color="primary"
      @click="openDialog = true"
    />
    <q-dialog v-model="openDialog" persistent>
      <BaseUserForm
        :label-button="labelButton"
        :label-form="labelForm"
        @closeDialog="closeDialog"
      />
    </q-dialog>
  </div>
</template>

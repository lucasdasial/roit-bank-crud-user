<script lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar';
import { apiCrudPatchResponse, updateUserDto } from 'src/@types/app';
import { viacepResponse } from 'src/@types/viacep';
import { useTableStore } from 'src/stores/datatableStore';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['CloseDialog'],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, emits) {
    const q = useQuasar();
    const tableStore = useTableStore();
    const list = tableStore.getRows;
    const userId = ref('');
    let user = ref<updateUserDto>({});
    list.forEach((record) => {
      if (record.id == props.id) {
        userId.value = record.id;
        user.value = record;
        return;
      }
    });
    function getAddress(cep: string) {
      const url = `http://viacep.com.br/ws/${cep}/json/`;

      void axios.get<viacepResponse>(url).then((res) => {
        const { uf, localidade, bairro, logradouro, erro } = res.data;
        if (erro) {
          q.notify({
            message: 'CEP não encontrado',
            type: 'negative',
            position: 'top',
          });
          return;
        }
        user.value.addressUF = uf;
        user.value.addressCity = localidade;
        user.value.addressDistrict = bairro;
        user.value.addressStreet = logradouro;
      });
    }

    async function updateAndSaveUser(userFromForm: updateUserDto) {
      const res = await axios.patch<apiCrudPatchResponse>(
        `http://localhost:3000/users/${userId.value}`,
        {
          ...userFromForm,
        }
      );
      if (res.data.message == 'doc updated') {
        q.notify({
          message: 'Atualizado',
          type: 'positive',
          position: 'top',
          timeout: 2000,
        });
        emits.emit('CloseDialog');
      }
    }
    return {
      user,
      updateAndSaveUser,
      getAddress,
    };
  },
});
</script>

<template>
  <q-card class="card q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <p class="text-h6 q-ma-none">Editar</p>
      <q-btn
        icon="close"
        color="grey-5"
        round
        dense
        size="xs"
        @click="$emit('CloseDialog')"
      />
    </div>
    <q-form @submit="updateAndSaveUser(user)">
      <div class="q-col-gutter-md row col-12">
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="user.id"
          disable
          outlined
          type="number"
          label="Digite um ID"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-8"
          color="secondary"
          v-model="user.name"
          outlined
          label="Digite um nome "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="user.age"
          outlined
          type="number"
          label="Idade "
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Por favor digite sua idade',
            (val) =>
              (val > 0 && val < 100) || 'Por favor digite sua real idade',
          ]"
        />
        <q-input
          class="col-12 col-sm-8"
          color="secondary"
          v-model="user.ghub"
          outlined
          label="Usuário do github"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="user.cep"
          @focusout="getAddress(user.cep)"
          outlined
          label="CEP "
          lazy-rules
          :mask="'########'"
          :rules="[
            (val) => (val && val.length > 0) || 'Campo obrigatório',
            (val) => val.length > 7 || 'Cep inválido',
          ]"
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="user.addressUF"
          outlined
          label="Estado "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="user.addressCity"
          outlined
          label="Cidade "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="user.addressDistrict"
          outlined
          label="Bairro "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-5"
          color="secondary"
          v-model="user.addressStreet"
          outlined
          label="Rua "
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="user.addresNumber"
          outlined
          label="Numero "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          :hint="'Caso não possuir digite \'s/n\''"
        />
        <q-input
          class="col-12 col-sm-5"
          color="secondary"
          v-model="user.addressComplement"
          outlined
          label="Complemento "
          lazy-rules
        />
      </div>
      <section class="q-py-md row justify-end">
        <div class="row q-gutter-md">
          <q-btn color="primary" outline @click="$emit('CloseDialog')"
            >Cancelar</q-btn
          >
          <q-btn color="primary" type="submit">Salvar</q-btn>
        </div>
      </section>
    </q-form>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 900px;
}
</style>

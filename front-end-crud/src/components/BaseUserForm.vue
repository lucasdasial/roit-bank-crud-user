<script lang="ts">
import axios from 'axios';
import { viacepResponse } from 'src/@types/viacep';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
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
    const id = ref();
    const name = ref('');
    const age = ref();
    const githubProfile = ref('');

    const cep = ref();
    let state = ref();
    let city = ref();
    let district = ref();
    let street = ref();
    let addressNumber = ref();
    const complement = ref();
    let timer: string | number | NodeJS.Timeout | undefined;

    function saveUser(labelForm: string): void {
      alert(labelForm);
    }

    function getAddress(cep: string) {
      const url = `http://viacep.com.br/ws/${cep}/json/`;
      clearTimeout(timer);
      timer = setTimeout(() => {
        void axios.get<viacepResponse>(url).then((res) => {
          const { uf, localidade, bairro, logradouro } = res.data;
          state.value = uf;
          city.value = localidade;
          district.value = bairro;
          street.value = logradouro;
        });
      }, 300);
    }

    return {
      id,
      name,
      age,
      githubProfile,
      cep,
      state,
      city,
      district,
      street,
      addressNumber,
      complement,
      saveUser,
      getAddress,
    };
  },
});
</script>

<template>
  <q-card class="card q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <p class="text-h6 q-ma-none">{{ labelForm }}</p>
      <q-btn
        icon="close"
        color="grey-5"
        round
        dense
        size="xs"
        @click="$emit('CloseDialog')"
      />
    </div>
    <q-form @submit="saveUser(labelForm)">
      <div class="q-col-gutter-md row col-12">
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="id"
          outlined
          type="number"
          label="Digite um ID"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-8"
          color="secondary"
          v-model="name"
          outlined
          label="Digite um nome "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="age"
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
          v-model="githubProfile"
          outlined
          label="Usuário do github"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="cep"
          @focusout="getAddress(cep)"
          outlined
          label="CEP "
          lazy-rules
          :mask="'########'"
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="state"
          outlined
          label="Estado "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="city"
          outlined
          label="Cidade "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="district"
          outlined
          label="Bairro "
          lazy-rules
        />
        <q-input
          class="col-12 col-sm-5"
          color="secondary"
          v-model="street"
          outlined
          label="Rua "
        />
        <q-input
          class="col-12 col-sm-2"
          color="secondary"
          v-model="addressNumber"
          outlined
          label="Numero "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          :hint="'Caso não possuir digite \'s/n\''"
        />
        <q-input
          class="col-12 col-sm-5"
          color="secondary"
          v-model="complement"
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
          <q-btn color="primary" type="submit">{{ labelButton }}</q-btn>
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

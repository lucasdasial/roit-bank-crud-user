<script lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar';
import { apiCrudPostResponse, createUserDto } from 'src/@types/app';
import { ghubApiResponse } from 'src/@types/ghubApi';
import { viacepResponse } from 'src/@types/viacep';
import { useTableStore } from 'src/stores/datatableStore';
import { defineComponent, reactive } from 'vue';

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
  emits: ['CloseDialog'],
  setup(props, emits) {
    const q = useQuasar();
    const tableStore = useTableStore();

    const user = reactive<createUserDto>({
      id: '',
      name: '',
      email: '',
      age: null,
      ghub: '',
      ghub_url_profile: '',
      ghub_url_repo: '',
      cep: '',
      addressUF: '',
      addressCity: '',
      addressDistrict: '',
      addressStreet: '',
      addresNumber: '',
      addressComplement: null,
    });

    async function saveUser(user: createUserDto): Promise<void> {
      q.loading.show();
      const res = await axios.post<apiCrudPostResponse>(
        'http://localhost:3000/users',
        {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          ghub: user.ghub,
          ghub_url_profile: user.ghub_url_profile,
          ghub_url_repo: user.ghub_url_repo,
          cep: user.cep,
          addressUF: user.addressUF,
          addressCity: user.addressCity,
          addressDistrict: user.addressDistrict,
          addressStreet: user.addressStreet,
          addresNumber: user.addresNumber,
          addressComplement: user.addressComplement,
        }
      );
      if (res.data.tag == 0) {
        q.loading.hide();
        q.notify({
          message: 'Usuário já existe',
          type: 'info',
          position: 'top',
        });
        return;
      }

      tableStore.setRecordAtTable(user);
      emits.emit('CloseDialog');
      q.loading.hide();
      q.notify({
        message: 'Conta criada',
        type: 'positive',
        position: 'top',
      });
    }

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
        user.addressUF = uf;
        user.addressCity = localidade;
        user.addressDistrict = bairro;
        user.addressStreet = logradouro;
      });
    }

    async function verificationGhub(username: string) {
      const url = `https://api.github.com/search/users?q=${username}`;
      const res = await axios.get<ghubApiResponse>(url);
      if (res.data.items.length < 1) {
        q.notify({
          message: 'Usuário não existe',
          type: 'negative',
          position: 'top',
        });

        return;
      }

      res.data.items.forEach((item) => {
        if (item.login == username) {
          user.ghub_url_profile = item.html_url;
          user.ghub_url_repo = item.repos_url;
        }
      });
    }

    return {
      user,
      saveUser,
      getAddress,
      verificationGhub,
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
    <q-form @submit="saveUser(user)">
      <div class="q-col-gutter-md row col-12">
        <q-input
          class="col-12"
          color="secondary"
          v-model="user.email"
          type="email"
          outlined
          label="Digite um email "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
        <q-input
          class="col-12 col-sm-4"
          color="secondary"
          v-model="user.id"
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
          @focusout="verificationGhub(user.ghub)"
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

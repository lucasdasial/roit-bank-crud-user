 <p align="center">CRUD de usuários  desenvolvido com: </p>
<p align="center">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" style="width:80px" />

 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" style="width:80px" />
 
 <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" style="width:80px"/>

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" style="width:80px" />
</p>

 <ul align="center">
  <a href="https://nestjs.com/" target="_blank">Nestejs</a> + <a href="https://vuejs.org/" target="_blank">Vuejs</a> + <a href="https://quasar.dev/"  target="_blank">Quasar</a> + <a href="https://firebase.google.com/" target="_blank">Firebase</a>
 </ul>

## Instruções 
  - Esse repositorio possui duas aplicações distintas. É nescessario rodar as duas simultaneamente para o CRUD funcionar corretamente.

- Na pasta backend-crud é nescessario fazer uma copia do arquivo **.env.example** e renomear para **.env** passando as credencias do firebase.
- Disponibilizei credencias de teste no arquivo **key.txt**
- A aplicação ira rodar por padrão na porta **:3000**, dê preferencia a ela, caso contrário terá que mudar as chamadas para api com a porta desejada.

## Instalação & Start app

- instale as dependencias em ambas aplicações
```bash
$ npm install
```

- Start backend-crud 
```bash
$ npm run start:dev
```
- Start frontend-crud 
```bash
$ npx quasar dev
```
- Mais opções podem ser consultadas no package.json de cada aplicação.

### Observações:

#### Backend-crud
- A api possui documentção com swagger e pode ser acessada atras da url "http://localhost:3000"

- Nas rotas de post e patch foi implementado criptografia para o campo email, utilizando a biblioteca <a href="https://www.npmjs.com/package/bcrypt" target="_blank">bcrypt</a>

#### frontend-crud

Alem da api desenvolvida com nest a aplicação consome outas duas apis externas.
- ##### Api do viacep para:
  - fazer o autocomplete dos campos de endereço a partir do cep
  - verificar se o cep é válido

- ##### Api do github para:
  - verificar se usuário do github existe na plataforma
  - salvar o link do perfil 
  - salvar o link dos repositorios do usuario 


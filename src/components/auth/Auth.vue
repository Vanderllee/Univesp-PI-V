<template>
  <div class="auth-content">
      <div class="auth-modal">
          <img src="@/assets/article.jpg"  width="200" alt="Logo">

          <hr>

          <div class="auth-title">
              {{showSignup ? 'Cadastro' : 'Login'}}
          </div>

          <input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome">
          <input type="text" v-model="user.email" name="email" placeholder="Email">
          <input type="password" v-model="user.password" name="password" placeholder="Senha">
          <input type="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirmar de senha">
          
          <button v-if="showSignup" @click="signup">Registrar</button>
          <button v-else @click="signin">Entrar</button>

          <a href @click.prevent="showSignup = !showSignup">
              <span v-if="showSignin">Já tem cadastro? Acesse o login</span>
              <span v-else>Não tem cadastro ? Registre-se aqui!</span>
          </a>

      </div>
  </div>
</template>

<script>

import {baseApiUrl, showError, userKey} from '@/global';
import axios from 'axios';

export default {
    name:'Auth',
    data: function () {
        return {
            showSignup:false,
            user: {}
        }
    },

    methods: {
        signin() {
            axios
                .post(`${baseApiUrl}/signin`, this.user)
                .then(resp => {
                    this.$store.commit('setUser', resp.data)

                    localStorage.setItem(userKey, JSON.stringify(resp.data))

                    this.$router.push({path:'/'})
                })
                .catch(showError)
        },

        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2em;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: solid 1px #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #fff;

        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;

    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0)
        );
    }
</style>
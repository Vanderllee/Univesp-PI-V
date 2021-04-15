<template>
      <div class="user-dropDown">
          <div class="user-button">
              <span d-none d-sm-block>{{user.name}}</span>
              <div class="user-dropDown-img">
                  <Gravatar :size="40" :email="user.email" alt="User"/>
              </div>
              <i class="fa fa-angle-down"></i>
          </div>
          <div class="user-dropdown-content">
              <router-link to="/admin" v-if="user.admin">
                <i class="fa fa-cogs"></i>Administração
              </router-link>
              
              <a href @click.prevent="logout">
                  <i class="fa fa-sign-out"></i>Sair
            </a>
          </div>
      </div>
</template>

<script>
import {userKey} from '@/global';
import {mapState} from 'vuex';
import Gravatar from 'vue-gravatar';

export default {
    name: 'UserDropdown',
    components: {Gravatar},
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({name:'auth'})
        }
    }
}
</script>

<style>
    .user-dropDown {
        position:relative;
        height: 100%;

    }
    .user-dropDown:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    
    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        height: 100%;
        padding:20px;
    }

    .user-dropDown-img > img {
        margin: 20px;
        border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0, 0.2);
        padding: 10px;
        z-index: 1;
        min-width: 187px;
        

        display:flex;   
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
        
    }

    .user-dropDown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    div .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 5px;
    }

    div .user-dropdown-content a:hover {
        background-color: #efefef;
    }

    div .user-dropdown-content a i {
        padding: 0px 10px;
    }


</style>
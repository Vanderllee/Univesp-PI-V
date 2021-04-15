<template>
  <div class="home">
        <PageTitle 
        title="Dashboard" 
        subTitle="Base de Conhecimento" 
        icon="fa fa-home"/>

        <div class="stats">
          <Stat 
            title="Categorias" 
            :value="stat.categories" 
            icon="fa fa-folder"
            color="#d54d50"/>
          
          <Stat 
            title="Artigos" 
            :value="stat.articles" 
            icon="fa fa-file"
            color="#3bc480"/>
          
          <Stat 
            title="Usuários" 
            :value="stat.users" 
            icon="fa fa-user"
            color="#3282cd"/>

        </div> 
  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle';
import Stat from './Stat';
import axios from 'axios';
import {baseApiUrl} from '@/global';

export default {
    name: 'Home',
    components: {PageTitle, Stat},

    data: function() {
      return { stat: {} }
    },

    methods: {
      getStats() {
        axios.get(`${baseApiUrl}/stats`).then(resp => this.stat = resp.data)
      }
    },

    mounted() {
      this.getStats()
    }
}
</script>

<style>
  div.stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
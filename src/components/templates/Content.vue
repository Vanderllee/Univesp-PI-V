<template>
  <div class="content">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:'Conteúdo'
}
</script>

<style>
    .content {
        grid-area: content;
        background: #efefef;
        padding: 25px;
    }
</style>
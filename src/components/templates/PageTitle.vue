<template>
  <div class="page-title">
      <h1 v-if="icon" :class="icon"><span>{{title}}</span></h1>
      <h2>{{subTitle}}</h2>
      <hr>
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['title', 'subTitle', 'icon']
}
</script>

<style>
    .page-title h1 {
        margin: 0px;
    }
    .page-title h1 span {
        padding: 5px;
    }

    .page-title h2 {
        color: #777;
        margin-top:5px;
        font-size: 1.3em;
    }
</style>
<template>
  <div class="admin-pages">
      <PageTitle 
      title="Administração do sistema" 
      subTitle="Cadastro  Cia" 
      icon="fa fa-cogs"
      />

      <div class="admin-pages-tabs">
        <b-card no-body>
            <b-tabs card>
              <b-tab title="Artigos" active>
                <ArticleAdmin />
              </b-tab>

              <b-tab title="Categorias">
                <CategoryAdmin />
              </b-tab>
              
              <b-tab title="Usuários">
                <UserAdmin />
              </b-tab>
            </b-tabs>
        </b-card>
      </div>



  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle';
import UserAdmin from  './UserAdmin';
import CategoryAdmin from  './CategoryAdmin';
import ArticleAdmin from  './ArticleAdmin';

export default {
    name: 'AdminPages',
    components: {PageTitle, UserAdmin, CategoryAdmin, ArticleAdmin}
}
</script>
<style>
  
</style>